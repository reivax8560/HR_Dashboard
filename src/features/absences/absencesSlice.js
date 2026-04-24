import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import absencesData from "../datas/absences.js";
import getAbsencesApi from "../../api/absences/getAbsencesApi";
import createAbsenceApi from "../../api/absences/createAbsenceApi";
import deleteAbsenceApi from "../../api/absences/deleteAbsenceApi";
import updateAbsenceApi from "../../api/absences/updateAbsenceApi";

/////////////////////////////// THUNKS /////////////////////////////////
export const getAbsencesThunk = createAsyncThunk(
  "absences/getAbsences",
  async () => {
    const data = await getAbsencesApi();
    // console.log("DATA:", data);
    return data;
  },
);

export const createAbsenceThunk = createAsyncThunk(
  "absences/createAbsence",
  async (absence) => {
    const data = await createAbsenceApi(absence);
    // console.log("DATA:", data);
    return data;
  },
);

export const updateAbsenceThunk = createAsyncThunk(
  "absences/updateAbsence",
  async (absence) => {
    const data = await updateAbsenceApi(absence);
    // console.log(data);
    return data;
  },
);

export const deleteAbsenceThunk = createAsyncThunk(
  "absences/deleteAbsence",
  async (id) => {
    const data = await deleteAbsenceApi(id);
    // console.log(data);
    return data;
  },
);

/////////////////////////////// SLICE /////////////////////////////////
const absencesSlice = createSlice({
  name: "absences",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      ///////////////////////////////////////////////////////////// GET
      .addCase(getAbsencesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAbsencesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAbsencesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// CREATE
      .addCase(createAbsenceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAbsenceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createAbsenceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// UPDATE
      .addCase(updateAbsenceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAbsenceThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateAbsenceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// DELETE
      .addCase(deleteAbsenceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAbsenceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteAbsenceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default absencesSlice.reducer;

//   reducers: {
//     addAbsence(state, action) {
//       state.list.unshift(action.payload);
//     },
//     removeAbsence(state, action) {
//       state.list = state.list.filter((item) => item.id !== action.payload);
//     },
//     updateAbsence(state, action) {
//       const index = state.list.findIndex(
//         (item) => item.id === action.payload.id,
//       );
//       if (index !== -1) {
//         state.list[index] = action.payload;
//       }
//     },
//   },

// export const { addAbsence, removeAbsence, updateAbsence } =
//   absencesSlice.actions;
