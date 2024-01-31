import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://658329fe02f747c8367b303b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  if (data.lenght === 0) {
    return thunkAPI.rejectWithValue('Пиццы пустые');
  }

  return thunkAPI.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'Loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'Loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'Success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'Error';
      state.items = [];
    });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
