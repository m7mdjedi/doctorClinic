import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import classes from "../styles/appointmentInfo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function getTime(inputEle) {
  var timeSplit = inputEle.split(":"),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  console.log(meridian);
  return hours + ":" + minutes + " " + meridian;
}

const AppointmentInfo = () => {
  const { id } = useParams();
  const appointment = useSelector((state) => state.patient.appointments).filter(
    (ele) => {
      return ele.id.toString() == id;
    }
  )[0];
  const [fNameErr, setFNameErr] = useState("");
  const [lNameErr, setLNameErr] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [timeErr, setTimeErr] = useState("");
  const [statusErr, setStatusErr] = useState("");
  const fNameRef = useRef();
  const lNameRef = useRef();
  const statusRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const newAppSubmitHandler = async (e) => {
    let valid = true;
    e.preventDefault();
    let pat = /^[a-z]+$/;

    const fName = fNameRef.current.value.toString();
    if (fName.length == 0) {
      setFNameErr("Please! First name can not be empty.");
      valid = false;
    } else if (pat.test(fName) == false) {
      setFNameErr("Please! Only lower-case English letters are allowed.");
      valid = false;
    } else {
      setFNameErr("");
    }

    const lName = lNameRef.current.value;

    if (lName.length == 0) {
      setLNameErr("Please! Last name can not be empty.");
      valid = false;
    } else if (pat.test(lName) == false) {
      setLNameErr("Please! Only lower-case English letter are allowed.");
      valid = false;
    } else {
      setLNameErr("");
    }
    const date = dateRef.current.value;
    if (date.length == 0) {
      setDateErr("Please! Choose right date.");
      valid = false;
    } else {
      setDateErr("");
    }
    const time = getTime(timeRef.current.value);

    if (time.length == 0) {
      setTimeErr("Please! Choose right time.");
      valid = false;
    } else {
      setTimeErr("");
    }
    const status = statusRef.current.value;
    if (status.length == 0) {
      setStatusErr("Please! Choose patient's status.");
      valid = false;
    } else {
      setStatusErr("");
    }

    if (valid) {
      try {
        await addDoc(collection(db, "appointments"), {
          id: new Date().getTime().toString(),
          patientFirstName: fName,
          patientLastName: lName,
          status: status,
          date: date,
          time: time,
        });
        navigate("/");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const dateFocusHandler = () => {
    dateRef.current.showPicker();
  };
  const timeFocusHandler = () => {
    timeRef.current.showPicker();
  };
  return (
    <div className={`container ${classes.appointmentInfo}`}>
      <PageTitle
        pageTitle="Appointment Information"
        pageDescription="Here all Information about this user"
      />
      <form onSubmit={newAppSubmitHandler}>
        <h2>New Appointment</h2>

        <p className="mt-5 pl-6 text-gray-500 font-semibold">
          Paitent First Name
        </p>
        <input
          ref={fNameRef}
          type="text"
          placeholder={appointment.patientFirstName}
        />
        {fNameErr.length != 0 && <p className="text-red-400">{fNameErr}</p>}

        <p className="mt-5 pl-6 text-gray-500 font-semibold">
          Paitent Last Name
        </p>
        <input
          ref={lNameRef}
          type="text"
          placeholder={appointment.patientLastName}
        />
        {lNameErr.length != 0 && <p className="text-red-400">{lNameErr}</p>}

        <p className="mt-5 pl-6 text-gray-500 font-semibold">Paitent Status</p>
        <select ref={statusRef} name="Patient  Status">
          <option value={appointment.status}>{appointment.status}</option>
          <option value="Urgent">Urgent</option>
          <option value="Previous">Previous</option>
          <option value="normal">Normal</option>
        </select>
        {statusErr.length != 0 && <p className="text-red-400">{statusErr}</p>}

        <p className="mt-5 pl-6 text-gray-500 font-semibold">
          {"  Appointment's date:"}
        </p>
        <input
          ref={dateRef}
          onClick={dateFocusHandler}
          placeholder={appointment.date}
          type="date"
          min="2024-10-09"
        />
        {dateErr.length != 0 && <p className="text-red-400">{dateErr}</p>}

        <p className="mt-5 pl-6 text-gray-500 font-semibold">
          {"Appointment's time:"}
        </p>
        <input
          ref={timeRef}
          onClick={timeFocusHandler}
          placeholder={appointment.time}
          type="time"
          min="08:00:00"
          max="20:00:00"
        />
        {timeErr.length != 0 && <p className="text-red-400">{timeErr}</p>}

        <button>Add Appointment</button>
      </form>
      {/* <form> 
        <h2>Personal Information</h2>
        <div>
          <label>
            First Name <span>*</span>
          </label>
          <input type="text" name="firstName" placeholder={''} />
        </div>
        <div>
          <label>
            Last Name <span>*</span>
          </label>
          <input type="text" name="lastName" placeholder="sami" />
        </div>

        <div>
          <label>
            Patient Status <span>*</span>
          </label>
          <select name="Patient  Status">
            <option value="">Patient Status</option>
            <option value="Urgent">Urgetn</option>
            <option value="Previous">Previous</option>
          </select>
        </div>
        <div>
          <label>
            Date <span>*</span>
          </label>
          <input type="date" value="2024-10-09" />
        </div>

        <div>
          <button>cancel</button>
          <button>save</button>
        </div>
      </form> */}
    </div>
  );
};

export default AppointmentInfo;
