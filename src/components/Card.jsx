import classes from "../styles/card.module.css";

const Card = (props) => {
  return (
    <div className={classes.card}>
      <h3>{props.title}</h3>
      <div>{props.children}</div>
    </div>
  );
};

export default Card;
