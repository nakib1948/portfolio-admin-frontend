import { createSlice } from "@reduxjs/toolkit";

// Initial state with the modal data set to null initially
const initialState = {
  data: null,
};

// Create the slice for managing modal data
const modalDataSlice = createSlice({
  name: 'modalData', // Descriptive name for the slice
  initialState,
  reducers: {
    // Action to set the modal data in the state
    setData: (state, action) => {
      state.data = action.payload; // Directly assign the payload to state.data
    },
  }
});

// Export the action to set the modal data
export const { setData } = modalDataSlice.actions;

// Export the reducer to be added to the store
export default modalDataSlice.reducer;

// Selector function to get the current modal data from the store
export const useCurrentModalData = (state) => state.modalData?.data;
