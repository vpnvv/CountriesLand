import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const res = await axios.get(
      'https://restcountries.com/v2/all?fields=name,region,flag'
    );
    return res.data;
  }
);


const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    all: [],         
    filtered: [],    
    visible: 10,       
    status: 'idle',    
    error: null,       
  },
  reducers: {
    loadMore(state) {
      state.visible += 10;
    },
    filterByRegion(state, action) {
      const region = action.payload;
      state.filtered = region === 'All'
        ? state.all
        : state.all.filter((country) => country.region === region);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { loadMore, filterByRegion } = countriesSlice.actions;
export default countriesSlice.reducer;
