import PageTitle from "../components/PageTitle";
import classes from "../styles/appointments.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments, setCurrentAppointment } from "../store/patientSlice";
import Loader from "../components/Loader";
const Appointments = () => {
  const [loading , setLoading] = useState("successed");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let appointmentsAr = useSelector((state) => state.patient.appointments);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const dataSlice = appointmentsAr.slice(firstIndex, lastIndex);
  const npage = Math.ceil(appointmentsAr.length / productsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const cancelHandler = async (id) => {
    setLoading("loading"); 
    try {
      await deleteDoc(doc(db, "appointments", id.toString()));
      appointmentsAr = appointmentsAr.filter(
        (appointment) => appointment.id !== id
      );
      setLoading("successed"); 
      dispatch(setAppointments(appointmentsAr));
    } catch (error) {
      setLoading("failed"); 
    }
  };

  const startHandler = async (id) => {
    try {
      let currentAppointment = appointmentsAr.filter(
        (appointment) => appointment.id === id
      )[0];
      dispatch(setCurrentAppointment(currentAppointment));

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const newAppointmentHandler = () => {
    navigate("/newAppointment");
  };

  return (
    <div className={`container ${classes.appointments}`}>
      <PageTitle
        pageTitle="All Appointments"
        pageDescription="Here are all our Appointments"
      />
      <div>
        <div>
          <h2>All Appointments</h2>
          <button onClick={newAppointmentHandler}>New Appointment</button>
        </div>

        <div>
          <table cellSpacing="1" cellPadding="1">
            <thead>
              <tr>
                <th>Time</th>
                <th>Date</th>
                <th>Patient</th>

                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataSlice.length > 0 &&
                dataSlice.map((ele) => (
                  <tr key={ele.id}>
                    <td>{ele.time}</td>
                    <td>{ele.date}</td>
                    <td>{ele.patientFirstName + " " + ele.patientLastName}</td>
                    <td>{ele.status}</td>
                    <td>
                      <button onClick={cancelHandler.bind(null, ele.id)}>
                       { 
                        loading==="successed" ? "cancel"  : <Loader color="#fff" width={25}/> 
                       }
                      </button>
                      <button onClick={startHandler.bind(null, ele.id)}>
                        start
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <div className={classes.changePageContainer}>
                <span >
                  There are {dataSlice.length} of {appointmentsAr.length}
                </span>
                <ul className={classes.pagination}>
                  <li
                    className={`${classes.page_item} ${
                      currentPage === 1 ? classes.non_active : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={`${classes.page_link}`}
                      onClick={prePage}
                    >
                      Prev
                    </a>
                  </li>
                  {currentPage - 4 > 1 && (
                    <li className={classes.page_item}>
                      <a
                        href="#"
                        className={classes.page_link}
                        onClick={() => changePage(1)}
                      >
                        {1}
                      </a>{" "}
                      ....
                    </li>
                  )}

                  {numbers.map(
                    (n, i) =>
                      Math.abs(currentPage - n) <= 2 && (
                        <li
                          className={`${classes.page_item} `}
                          key={i}
                        >
                          <a
                            href="#"
                            className={`${classes.page_link} ${
                              currentPage === n ? classes.active : ""
                            }`}
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </a>
                        </li>
                      )
                  )}
                  {currentPage + 4 < npage && (
                    <li className={classes.page_item}>
                      ....{" "}
                      <a
                        href="#"
                        className={classes.page_link}
                        onClick={() => changePage(npage)}
                      >
                        {npage}
                      </a>
                    </li>
                  )}

                  <li
                    className={`${classes.page_item} ${
                      currentPage === npage ? classes.non_active : ""
                    }`}
                  >
                    <a
                      href="#"
                      className={classes.page_link}
                      onClick={nextPage}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
