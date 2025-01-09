import { mapGetters } from 'vuex';

export const headerLogic = { // Логика работы скриптов головы сайта
    computed: {
    ...mapGetters(['totalPrice', 'cartItems', 'totalItems']),
    },
    mounted() {
    // Обработчик для открытия/закрытия меню
    $('#bur-menu').on('click', () => {
        $('#alt-menu').toggle();
        $('#page').hide();
        $('header').hide();
        $('footer').hide();
    });
    // Обработчик для закрытия меню при клике на close_cross
    $('#close_cross').on('click', () => {
        this.closeAltMenu();
    });
    // Обработчик для закрытия меню при клике на любую из ссылок
    $('#alt-menu').on('click', 'a', () => {
        this.closeAltMenu();
    });
    },
    methods: {
    // Метод для закрытия меню и показа остальных элементов
    closeAltMenu() {
        $('#alt-menu').hide();
        $('#page').show();
        $('header').show();
        $('footer').show();
    }
    }
}