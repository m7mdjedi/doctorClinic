import classes from "../styles/header.module.css";
import { FaFileAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import notification from "../assets/notification2.json";
import Lottie from "lottie-react";

import image from "../assets/avatar.png";
const notificationsAr = [
  {
    id: 1,
    title: "New User",
    message: "User created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 2,
    title: "New Order",
    message: "Order created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 3,
    title: "New User",
    message: "User created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 4,
    title: "New Order",
    message: "Order created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 5,
    title: "New User",
    message: "User created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 6,
    title: "New Order",
    message: "Order created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 7,
    title: "New User",
    message: "User created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
  {
    id: 8,
    title: "New Order",
    message: "Order created successfully",
    time: "10:00 PM",
    date: "9 / 10 / 2024",
  },
];
const Header = (props) => {
  const navigate = useNavigate();
  const addPatientHandler = () => {
    navigate("/newPatient");
  };
  const makeAppointment = () => {
    navigate("/newAppointment");
  };
  return (
    <div className={classes.header}>
      {/* logo */}
      <div>
        <FaUserDoctor className={classes.toothIcon} />
      </div>
      <div>
        <div>
          {/* burgMenu */}
          <div onClick={props.menuClickedHandler}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          {/* iconsPart */}
          <div>
            <div onClick={addPatientHandler}>
              {/* icon  */}

              <FaCalendarCheck className={classes.firstIcon} />
              <p> Add new patient </p>
            </div>
            <div onClick={makeAppointment}>
              {/* icon  */}
              <FaFileAlt className={classes.secondIcon} />
              <p> Make an appointment </p>
            </div>
          </div>
        </div>
        <div>
          {/* profile notification  */}

          <div>
            {/* icon   */}

            <Lottie
              style={{ width: "35px", height: "35px" }}
              animationData={notification}
            />

            <div className={classes.notification}>
              <div>
                <h3>Notifications</h3>
              </div>
              <div>
                {notificationsAr.map((notification) => {
                  return (
                    <div key={notification.id}>
                      <div>
                        <img src={image} />
                      </div>
                      <div>
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                        <div>
                          <p>{notification.date}</p>-<p>{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* profile image   */}

          <div>
            <div>
              <p>Dr Mohammed</p>
              <p>admin</p>
            </div>
            <div>
              <img src={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
