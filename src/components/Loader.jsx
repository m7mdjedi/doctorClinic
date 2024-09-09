import { RotatingLines } from "react-loader-spinner";

function Loader(props) {
  return (
    <RotatingLines
      strokeColor={props.color}
      strokeWidth="5"
      animationDuration="0.75"
      width={props.width}
      visible={true}
    />
  );
}
export default Loader;
