import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./features/employees/employeesSlice";
import servicesReducer from "./features/services/servicesSlice";
import absencesReducer from "./features/absences/absencesSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    services: servicesReducer,
    absences: absencesReducer,
  },
});
