import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  appointments: [],
  currentPatient: {
    id: "",
    patientFirstName: "No",
    patientLastName: "One",
    phoneNum: "",
    bloodGroup: "",
  },
  currentAppointment: {
    id: "",
    patientFirstName: "No",
    patientLastName: "one",
    time: "",
    date: "",
    status: "",
  },
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action) => {
      console.log(action.payload);
      state.patients = action.payload;
    },
    setAppointments: (state, action) => {
      console.log(action.payload);
      state.appointments = action.payload;
    },

    setCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
    setCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload;
    },
  },
});

export const {
  setPatients,
  setCurrentAppointment,
  setAppointments,
  setCurrentPatient,
} = patientSlice.actions;

export default patientSlice.reducer;
