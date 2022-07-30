import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        const item = state.find((item) => item.id === action.payload);
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      /*state.map((item) => {
        item.id === action.payload
        producto = JSON.stringify(item)
        carrito.push(JSON.parse(producto))
        console.log(Object.values(carrito))
        localStorage.setItem('cart', JSON.stringify(carrito));
      })*/
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      console.log(state)
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex((item) => item.id === action.payload);
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
    addToCache: (state, action) => {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  addToCache,
} = cartSlice.actions;