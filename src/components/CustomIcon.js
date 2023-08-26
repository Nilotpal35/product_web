import * as icon from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/fontawesome-svg-core";

export default function CustomIcon({ btnHandler }) {
  return (
    <button
      onClick={btnHandler}
      style={{ backgroundColor: "transparent", borderStyle: "none" ,}}
    >
      {/* <p>Close</p> */}
      <FontAwesomeIcon
        icon={icon.faTrash}
        size="1x"
        //spin
        style={{
          //backgroundColor: "red",
          color: "white",
        }}
        enableBackground
      />
    </button>
  );
}
