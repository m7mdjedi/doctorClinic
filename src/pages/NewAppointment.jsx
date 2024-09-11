import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import classes from "../styles/newAppointment.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

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

const NewAppointment = () => {
  const [loading, setLoading] = useState("successed");
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
      setLoading("loading");
      try {
        await addDoc(collection(db, "appointments"), {
          id: new Date().getTime().toString(),
          patientFirstName: fName,
          patientLastName: lName,
          status: status,
          date: date,
          time: time,
        });
        setLoading("successed");
        navigate("/");
      } catch (e) {
        setLoading("failed");
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
    <div className={`container ${classes.newAppointment}`}>
      <PageTitle
        pageTitle="New Appointment"
        pageDescription="Add a new Appointment to your database"
      />

      <form onSubmit={newAppSubmitHandler}>
        <h2>New Appointment</h2>
        <div> 
        <input ref={fNameRef} type="text" placeholder="Patient's first name" />
        {fNameErr.length != 0 && <p className="text-red-400">{fNameErr}</p>}
        </div>
        <div> 
        <input ref={lNameRef} type="text" placeholder="Patient's last name" />
        {lNameErr.length != 0 && <p className="text-red-400">{lNameErr}</p>}
        </div>
        <div> 
        <select ref={statusRef} name="Patient  Status">
          <option value="">Patient Status</option>
          <option value="Urgent">Urgent</option>
          <option value="Previous">Previous</option>
          <option value="normal">Normal</option>
        </select>
        {statusErr.length != 0 && <p className="text-red-400">{statusErr}</p>}
        </div>

        <div> 
        <p >
          {"Appointment's date:"}
        </p>
        <input
          ref={dateRef}
          onClick={dateFocusHandler}
          type="date"
          min="2024-10-09"
        />
        {dateErr.length != 0 && <p className="text-red-400">{dateErr}</p>}  
        </div> 

        <div> 
        <p >
          {"Appointment's time:"}
        </p>
        <input
          ref={timeRef}
          onClick={timeFocusHandler}
          type="time"
          min="08:00:00"
          max="20:00:00"
        />
        {timeErr.length != 0 && <p className="text-red-400">{timeErr}</p>}       
        </div>
      
        <button>
          {loading == "successed" ? (
            "add Appointment"
          ) : (
            <Loader color={"#fff"} width={25} />
          )}
        </button>
      </form>
    </div>
  );
};

export default NewAppointment;
