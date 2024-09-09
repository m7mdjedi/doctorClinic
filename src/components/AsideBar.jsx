import classes from "../styles/asideBar.module.css";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaTableList } from "react-icons/fa6";
import { PiUserListFill } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
const AsideBar = (props) => {
  const currentAppointment = useSelector(
    (state) => state.patient.currentAppointment
  );

  return (
    <div
      className={`${classes.asideBar} ${
        props.showAsideBar ? classes.asideBarShow : classes.asideBarHidden
      }`}
    >
      <ul>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/"
        >
          <MdDashboard className={classes.liIcon} />
          <p>Dashboard</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/newAppointment"
        >
          <MdOutlineWatchLater className={classes.liIcon} />
          <p>New Appointment</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/appointments"
        >
          <FaTableList className={classes.liIcon} />
          <p>All Appointments</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/newPatient"
        >
          <IoPersonAddSharp className={classes.liIcon} />
          <p>New Paitent</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/patients"
        >
          <IoIosPeople className={classes.liIcon} />
          <p>All Patients</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? classes.active : "")}
          to="/waitingPatients"
        >
          <PiUserListFill className={classes.liIcon} />
          <p>Waiting Patients</p>
          <div>
            <IoIosArrowForward className={classes.arrowIcon} />
          </div>
        </NavLink>
        {/* { 
            currentPatient.id !== "" && ( 
                <NavLink
                className={({ isActive }) => (isActive ? classes.active : "")}
                to={`/patientInfo/${currentPatient.id}`}
              >
                <FaUserCheck className={classes.liIcon} />
                <p>Patient Info</p>
                <div>
                  <IoIosArrowForward className={classes.arrowIcon} />
                </div>
              </NavLink>
            )
        }  */}
        {currentAppointment.id !== "" && (
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to={`/appointmentInfo/${currentAppointment.id}`}
          >
            {" "}
            <FaRegEdit className={classes.liIcon} />
            <p>appointment Info</p>
            <div>
              <IoIosArrowForward className={classes.arrowIcon} />
            </div>
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default AsideBar;
