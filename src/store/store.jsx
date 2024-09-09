import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "../store/patientSlice";

export const store = configureStore({
  reducer: { patient: patientReducer },
});
