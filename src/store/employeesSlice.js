import { createSlice } from "@reduxjs/toolkit";
import employeesData from "../datas/employees.js";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: employeesData,
  },
  reducers: {
    addEmployee(state, action) {
      state.list.push(action.payload);
    },
    removeEmployee(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    updateEmployee(state, action) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      // findIndex préferable à map car ne passe pas sur la totalité du tableau
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addEmployee, removeEmployee, updateEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
