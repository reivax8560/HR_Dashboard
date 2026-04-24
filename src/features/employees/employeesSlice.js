import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import fetchEmployeesApi from "../../api/employees/fetchEmployeesApi";
// import createEmployeeApi from "../../api/employees/createEmployeeApi";
// import deleteEmployeeApi from "../../api/employees/deleteEmployeeApi";
// import updateEmployeeApi from "../../api/employees/updateEmployeeApi";
import fetchEmployeesApi from "../../services/employees/fetchEmployeesApi";
import createEmployeeApi from "../../services/employees/createEmployeeApi";
import deleteEmployeeApi from "../../services/employees/deleteEmployeeApi";
import updateEmployeeApi from "../../services/employees/updateEmployeeApi";

/////////////////////////////// THUNKS /////////////////////////////////
export const fetchEmployeesThunk = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = await fetchEmployeesApi();
    // console.log("DATA:", data);
    return data;
  },
);

export const createEmployeeThunk = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const data = await createEmployeeApi(employee);
    // console.log("DATA:", data);
    return data;
  },
);

export const updateEmployeeThunk = createAsyncThunk(
  "employees/updateEmployee",
  async (employee) => {
    const data = await updateEmployeeApi(employee);
    // console.log(data);
    return data;
  },
);

export const deleteEmployeeThunk = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    const data = await deleteEmployeeApi(id);
    // console.log(data);
    return data;
  },
);

/////////////////////////////// SLICE /////////////////////////////////
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      ///////////////////////////////////////////////////////////// FETCH
      .addCase(fetchEmployeesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployeesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// CREATE
      .addCase(createEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// UPDATE
      .addCase(updateEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// DELETE
      .addCase(deleteEmployeeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteEmployeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeesSlice.reducer;

/////////////////////////////// REDUCER /////////////////////////////////
// reducers: {
// addEmployee(state, action) {
//   state.list.push(action.payload);
// },
// removeEmployee(state, action) {
//   state.list = state.list.filter((item) => item.id !== action.payload);
// },
// updateEmployee(state, action) {
//   const index = state.list.findIndex(
//     (item) => item.id === action.payload.id,
//   );
//   if (index !== -1) {
//     state.list[index] = action.payload;
//   }
// },
// },
// export const { addEmployee, removeEmployee, updateEmployee } = employeesSlice.actions;
