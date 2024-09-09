import PageTitle from "../components/PageTitle";
import { FaEye } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import classes from "../styles/waitingPatients.module.css";
import { useEffect } from "react";
const waitingPatientsAr = [
  {
    id: 1,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 2,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 3,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 4,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 5,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 6,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 7,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },

  {
    id: 8,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 9,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
  {
    id: 10,
    "first Name": "Rami",
    "last Name": "Amr",
    "phone Number": "0982993834",
    "Blood Group": "A+",
  },
];

const WaitingPatients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`container ${classes.waitingPatients}`}>
      <PageTitle
        pageTitle="Waiting Patients"
        pageDescription="Here are all our Waiting Patients"
      />
      <div>
        <div>
          <h2> Waiting Patients</h2>
          <button>New Patient</button>
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
              {waitingPatientsAr.map((ele) => (
                <tr key={ele.id}>
                  <td>{ele["first Name"]}</td>
                  <td>{ele["last Name"]}</td>
                  <td>{ele["phone Number"]}</td>
                  <td>{ele["Blood Group"]}</td>
                  <td>
                    <button>
                      <FaEye />
                    </button>
                    <button>
                      <FaUserEdit />
                    </button>
                    <button>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaitingPatients;
