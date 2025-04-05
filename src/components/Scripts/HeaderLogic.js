import { mapGetters } from 'vuex';

export const headerLogic = {
    data() {
        return {
            showProfileDropdown: false
        };
    },
    computed: {
        ...mapGetters(['totalPrice', 'cartItems', 'totalItems']),
    },
    methods: {
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
        }
    },
    mounted() {
        $('#bur-menu').on('click', () => {
            $('#alt-menu').toggle();
            $('#page').hide();
            $('header').hide();
            $('footer').hide();
        });
        
        $('#close_cross').on('click', () => {
            this.closeAltMenu();
        });
        
        $('#alt-menu').on('click', 'a', () => {
            this.closeAltMenu();
        });
        
        $(document).on('click', (e) => {
            if (!$(e.target).closest('.profile').length && this.showProfileDropdown) {
                this.closeProfileMenu();
            }
        });
    },
    beforeDestroy() {
        $(document).off('click');
    }
}