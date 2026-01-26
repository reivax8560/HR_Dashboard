import { createSlice } from "@reduxjs/toolkit";
import servicesData from "../datas/services";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: servicesData,
  },
  reducers: {
    addService(state, action) {
      state.list.push(action.payload);
    },
    removeService(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addService, removeService } = servicesSlice.actions;
export default servicesSlice.reducer;
