import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import classes from "../styles/newPatient.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const NewPatient = () => {
  const [loading, setLoading] = useState("successed");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [fNameErr, setFNameErr] = useState("");
  const [lNameErr, setLNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [bloodGroupErr, setStatusErr] = useState("");
  const fNameRef = useRef();
  const lNameRef = useRef();
  const bloodGroupRef = useRef();
  const phoneNumRef = useRef();

  const newAppSubmitHandler = async (e) => {
    e.preventDefault();
    let valid = true;
    let pat = /^[a-z]+$/;
    let pat2 = /^(09)\d{8}$/;
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
      setLNameErr("Please! Only lower-case English letters are allowed.");
      valid = false;
    } else {
      setLNameErr("");
    }
    const phoneNum = phoneNumRef.current.value;
    if (pat2.test(phoneNum) == false) {
      setPhoneNumErr("Please! Enter valid paitent's number.");
      valid = false;
    } else {
      setPhoneNumErr("");
    }

    const bloodGroup = bloodGroupRef.current.value;
    if (bloodGroup.length == 0) {
      setStatusErr("Please! Choose patient's status.");
      valid = false;
    } else {
      setStatusErr("");
    }
    if (valid) {
      setLoading("loading");
      try {
        await addDoc(collection(db, "patients"), {
          id: new Date().getTime().toString(),
          firstName: fName,
          lastName: lName,
          phoneNum: phoneNum,
          bloodGroup: bloodGroup,
        });
        setLoading("successed");
        navigate("/");
      } catch (e) {
        setLoading("failed");
      }
    }
  };
  return (
    <div className={`container ${classes.newPatient}`}>
      <PageTitle
        pageTitle="New Patient"
        pageDescription="Add a new patient to your database"
      />
      <form onSubmit={newAppSubmitHandler}>
        <h2>Personal Information</h2>
        <input ref={fNameRef} type="text" placeholder="Patient's first name" />
        {fNameErr.length != 0 && <p className="text-red-400">{fNameErr}</p>}
        <input ref={lNameRef} type="text" placeholder="Patient's last name" />
        {lNameErr.length != 0 && <p className="text-red-400">{lNameErr}</p>}
        <input ref={phoneNumRef} type="text" placeholder="Phone Number" />
        {phoneNumErr.length != 0 && (
          <p className="text-red-400">{phoneNumErr}</p>
        )}
        <select ref={bloodGroupRef} name="Patient  Status">
          <option value="">Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        {bloodGroupErr.length != 0 && (
          <p className="text-red-400">{bloodGroupErr}</p>
        )}
        <button>
          {loading == "successed" ? (
            "add patient"
          ) : (
            <Loader color={"#fff"} width={25} />
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPatient;
