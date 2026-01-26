import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import servicesReducer from "./servicesSlice";
import absencesReducer from "./absencesSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    services: servicesReducer,
    absences: absencesReducer,
  },
});
