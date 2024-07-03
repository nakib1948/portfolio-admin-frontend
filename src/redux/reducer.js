import { baseApi } from "./api/baseApi";
import modalDataReducer from "./modalDataSlice"
export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  modalData: modalDataReducer,
};