import { mapGetters } from 'vuex';

export const headerLogic = {
    data() {
        return {
            showProfileDropdown: false,
            isAdmin: false,
            adminChecked: false
        };
    },
    computed: {
        ...mapGetters(['totalPrice', 'cartItems', 'totalItems']),
        catalogRoute() {
            return this.isAdmin ? '/admin' : '/store';
        }
    },
    methods: {
        async verifyAdminStatus() {
            if (this.adminChecked) return;
            
            try {
                const response = await fetch('/api/check_admin.php', {
                    credentials: 'include',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const { isAdmin } = await response.json();
                this.isAdmin = Boolean(isAdmin);
                this.adminChecked = true;
                
            } catch (error) {
                console.error('Admin verification failed:', error);
                this.isAdmin = false;
            }
        },
        
        handleCatalogNavigation() {
            if (!this.adminChecked) {
                this.verifyAdminStatus().then(() => {
                    this.$router.push(this.catalogRoute);
                });
            } else {
                this.$router.push(this.catalogRoute);
            }
        },
        
        toggleProfileMenu() {
            this.showProfileDropdown = !this.showProfileDropdown;
        },
        
        closeProfileMenu() {
            this.showProfileDropdown = false;
        },
        
        closeAltMenu() {
            $('#alt-menu').hide();
            $('#page').show();
            $('header').show();
            $('footer').show();
        },
        
        setupEventListeners() {
            $('#bur-menu').on('click', () => {
                $('#alt-menu').toggle();
                $('#page').hide();
                $('header').hide();
                $('footer').hide();
            });
            
            $('#close_cross').on('click', this.closeAltMenu);
            $('#alt-menu').on('click', 'a', this.closeAltMenu);
            
            $(document).on('click', (e) => {
                if (!$(e.target).closest('.profile').length && this.showProfileDropdown) {
                    this.closeProfileMenu();
                }
            });
        }
    },
    async created() {
        await this.verifyAdminStatus();
    },
    mounted() {
        this.setupEventListeners();
    },
    beforeDestroy() {
        $(document).off('click');
        $('#bur-menu, #close_cross').off('click');
    }
};