import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import servicesData from "../datas/services";
import getServicesApi from "../../services/services/getServicesApi";
import createServiceApi from "../../services/services/createServiceApi";
import deleteServiceApi from "../../services/services/deleteServiceApi";
import updateServiceApi from "../../services/services/updateServiceApi";

/////////////////////////////// THUNKS /////////////////////////////////
export const fetchServicesThunk = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const data = await getServicesApi();
    // console.log("DATA:", data);
    return data;
  },
);

export const createServiceThunk = createAsyncThunk(
  "services/createService",
  async (service) => {
    const data = await createServiceApi(service);
    // console.log("DATA:", data);
    return data;
  },
);

export const updateServiceThunk = createAsyncThunk(
  "services/updateService",
  async (service) => {
    const data = await updateServiceApi(service);
    // console.log(data);
    return data;
  },
);

export const deleteServiceThunk = createAsyncThunk(
  "services/deleteService",
  async (id) => {
    const data = await deleteServiceApi(id);
    // console.log(data);
    return data;
  },
);

/////////////////////////////// SLICE /////////////////////////////////
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      ///////////////////////////////////////////////////////////// FETCH
      .addCase(fetchServicesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServicesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// CREATE
      .addCase(createServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// UPDATE
      .addCase(updateServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ///////////////////////////////////////////////////////////// DELETE
      .addCase(deleteServiceThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteServiceThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;

// reducers: {
//   addService(state, action) {
//     state.list.push(action.payload);
//   },
//   removeService(state, action) {
//     state.list = state.list.filter((item) => item.id !== action.payload);
//   },
// },
//
// export const { addService, removeService } = servicesSlice.actions;
