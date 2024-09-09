import classes from "../styles/pageTitle.module.css";
const PageTitle = (props) => {
  return (
    <div className={classes.pageTitle}>
      <h2>{props.pageTitle}</h2>
      <p>{props.pageDescription}</p>
    </div>
  );
};

export default PageTitle;
