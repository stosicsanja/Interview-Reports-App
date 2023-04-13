import classes from "./css/Button.module.css";

const Button = (props) => {

  return (
    <button
      className={`${classes.button} ${!props.disabled ? classes.disabled : ''}`}
      type={props.type || "button"}
      onClick={props.onClick}
      onClose={props.onClose}
    >
      {props.children}
    </button>
  );
};

export default Button;
