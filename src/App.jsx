import { useState } from "react";
import AsideBar from "./components/AsideBar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import NewPatient from "./pages/NewPatient";
import Footer from "./components/Footer";
import NewAppointment from "./pages/NewAppointment";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import WaitingPatients from "./pages/WaitingPatients";
import AppointmentInfo from "./pages/AppointmentsInfo";

function App() {
  const [menuClicked, setMenuClicked] = useState(false);
  const menuClickedHandler = () => {
    setMenuClicked(!menuClicked);
  };

  return (
    <>
      <Header menuClickedHandler={menuClickedHandler} />
      <AsideBar showAsideBar={menuClicked} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/newPatient" element={<NewPatient />} />
        <Route path="/newAppointment" element={<NewAppointment />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/waitingPatients" element={<WaitingPatients />} />
        <Route path="/appointmentInfo/:id" element={<AppointmentInfo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
