import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    return await response.json();
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (newProduct) => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    return await response.json();
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (updatedProduct) => {
    const response = await fetch(`https://dummyjson.com/products/${updatedProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    return await response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId) => {
    await fetch(`https://dummyjson.com/products/${productId}`, {
      method: 'DELETE',
    });
    return productId;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.items.push(action.payload); 
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload; 
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); 
    });
  },
});

export default productSlice.reducer;
