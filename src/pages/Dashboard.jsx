import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import classes from "../styles/dashboard.module.css";
import { FaClipboardUser } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import AreaChartComponent from "../components/AreaChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import LineChartComponent from "../components/LineChartComponent";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { setAppointments, setPatients } from "../store/patientSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("loading");
  const currentAppointment = useSelector(
    (state) => state.patient.currentAppointment
  );
  const appointmentsNum = useSelector(
    (state) => state.patient.appointments.length
  );
  const patientsNum = useSelector((state) => state.patient.patients.length);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading("loading");
    async function fetchAppointments() {
      let ar = [];

      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        querySnapshot.forEach((doc) => {
          ar.push({ ...doc.data() });
        });
        dispatch(setAppointments(ar));
        setLoading("successed");
      } catch (error) {
        setLoading("faild");
      }
    }

    async function fetchPatients() {
      let ar = [];
      const querySnapshot = await getDocs(collection(db, "patients"));
      querySnapshot.forEach((doc) => {
        ar.push({ ...doc.data() });
      });
      dispatch(setPatients(ar));
    }
    fetchPatients();
    fetchAppointments();
  }, [dispatch]);

  const patientInfoHandler = () => {
    if (currentAppointment.id) {
      navigate(`/appointmentInfo/${currentAppointment.id}`);
    }
  };
  const appointmentsHandler = () => {
    navigate("/appointments");
  };
  const patientsHandler = () => {
    navigate("/patients");
  };
  const waitingPatientsHandler = () => {
    navigate("/waitingPatients");
  };
  return (
    <div className={`container ${classes.dashboard}`}>
      <PageTitle
        pageTitle="Home"
        pageDescription="All about today's patients"
      />
      <div>
        <div onClick={patientInfoHandler}>
          <div>
            <FaClipboardUser className={classes.patientIcon} />
          </div>
          <div>
            <h3>Current Patient</h3>
            <p>
              {loading == "successed" ? (
                currentAppointment.patientFirstName +
                " " +
                currentAppointment.patientLastName
              ) : (
                <Loader color={"#fff"} width={50} />
              )}
            </p>
          </div>
        </div>
        <div onClick={appointmentsHandler}>
          <div>
            <MdDateRange className={classes.patientIcon} />
          </div>
          <div>
            <h3>All Appointments</h3>
            <p>
              {loading == "successed" ? (
                appointmentsNum
              ) : (
                <Loader color={"#fff"} width={50} />
              )}
            </p>
          </div>
        </div>
        <div onClick={patientsHandler}>
          <div>
            <FaUsers className={classes.patientIcon} />
          </div>
          <div>
            <h3>All Patients</h3>
            <p>
              {loading == "successed" ? (
                patientsNum
              ) : (
                <Loader color={"#fff"} width={50} />
              )}
            </p>
          </div>
        </div>
        <div onClick={waitingPatientsHandler}>
          <div>
            <FaListCheck className={classes.patientIcon} />
          </div>
          <div>
            <h3>Waiting Patients</h3>
            <p>
              {loading == "successed" ? (
                Math.floor((patientsNum + 1) / 2)
              ) : (
                <Loader color={"#fff"} width={50} />
              )}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Card title="Activity">
          <AreaChartComponent />
        </Card>
        <Card title="Activity">
          <BarChartComponent />
        </Card>
      </div>
      <Card title="Paitents && Appointments per month">
        <LineChartComponent />
      </Card>
    </div>
  );
};

export default Dashboard;
