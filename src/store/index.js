import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(p => p.id === product.id);
      if (existingProduct) {
        // Проверка на превышение новым количеством доступных товаров
        if (existingProduct.quantity < product.remain) {
          existingProduct.quantity += 1;
        } else {
          alert('Достигнуто максимальное количество товара');
        }
      } else {
        // Если товара нет - добавить
        if (product.remain > 0) {
            state.cart.push({ ...product, quantity: 1, main_pic: product.main_pic });
        } else {
          alert('Товар отсутствует на складе');
        }
      }
    },
    increaseQuantity(state, productId) {
      const product = state.cart.find(p => p.id === productId);
      if (product) {
        if (product.quantity < product.remain) {
          product.quantity += 1;
        } else {
          alert('Достигнуто максимальное количество товара');
        }
      }
    },
    decreaseQuantity(state, productId) {
      const product = state.cart.find(p => p.id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart = state.cart.filter(p => p.id !== productId);
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(p => p.id !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },
    increaseQuantity({ commit }, productId) {
      commit('increaseQuantity', productId);
    },
    decreaseQuantity({ commit }, productId) {
      commit('decreaseQuantity', productId);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    totalPrice(state) {
      return state.cart.reduce((total, product) => total + Number(product.price) * product.quantity, 0);
    },
    cartItems(state) {
      return state.cart;
    },
    totalItems(state) {
        return state.cart.reduce((total, product) => total + product.quantity, 0);
      },
  },
});