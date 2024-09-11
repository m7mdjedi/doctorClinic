import PageTitle from "../components/PageTitle";
import { FaEye } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import classes from "../styles/patients.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setPatients } from "../store/patientSlice";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  let patientsAr = useSelector((state) => state.patient.patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPatients() {
      let ar = [];
      const querySnapshot = await getDocs(collection(db, "patients"));
      querySnapshot.forEach((doc) => {
        ar.push({ ...doc.data(), id: doc.id });
      });
      dispatch(setPatients(ar));
    }
    fetchPatients();
  }, [dispatch]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const dataSlice = patientsAr.slice(firstIndex, lastIndex);
  const npage = Math.ceil(patientsAr.length / productsPerPage);
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

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      await deleteDoc(doc(db, "appointments", id));
      patientsAr = patientsAr.filter((patient) => patient.id !== id);
      dispatch(setPatients(patientsAr));
    } catch (error) {
      console.error(error);
    }
  };
  const newPatientHandler = () => {
    navigate("/newPatient");
  };
  return (
    <div className={`container ${classes.patients}`}>
      <PageTitle
        pageTitle="All Patients"
        pageDescription="Here are all our patients"
      />
      <div>
        <div>
          <h2>All Patients</h2>
          <button onClick={newPatientHandler}>New Patient</button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>

                <th>Blood Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataSlice.map((ele) => (
                <tr key={ele.id}>
                  <td>{ele["firstName"]}</td>
                  <td>{ele["lastName"]}</td>
                  <td>{ele["phoneNum"]}</td>
                  <td>{ele["bloodGroup"]}</td>
                  <td>
                    <button>
                      <FaEye />
                    </button>
                    <button>
                      <FaUserEdit />
                    </button>
                    <button onClick={deleteHandler.bind(null, ele.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <div className={classes.changePageContainer}>
                <span >
                  There are {dataSlice.length} of {patientsAr.length}
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

export default Patients;
