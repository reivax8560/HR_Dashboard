import { createSlice } from "@reduxjs/toolkit";
import absencesData from "../datas/absences.js";

const absencesSlice = createSlice({
  name: "absences",
  initialState: {
    list: absencesData,
  },
  reducers: {
    addAbsence(state, action) {
      // state.list.push(action.payload);
      state.list.unshift(action.payload);
    },
    removeAbsence(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    updateAbsence(state, action) {
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

export const { addAbsence, removeAbsence, updateAbsence } =
  absencesSlice.actions;
export default absencesSlice.reducer;
