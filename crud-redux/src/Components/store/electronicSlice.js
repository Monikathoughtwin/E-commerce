import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProduct = createAsyncThunk('fetchProduct', async () => {
  const response = await fetch(
    'https://fakestoreapi.com/products/category/electronics'
  )
  return response.json()
})

const electronicSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log('Error', action.payload)
      state.isError = true
    })
  },
})

export default electronicSlice.reducer
