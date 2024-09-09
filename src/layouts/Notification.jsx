import classes from "../styles/notification.module.css";
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
const Notification = () => {
  return (
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
  );
};

export default Notification;
