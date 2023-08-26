import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/fontawesome-svg-core";

export default function Icons({ btnHandler }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        right: "0",
        fontSize: "2rem",
        margin : "1rem"
      }}
    >
      <button onClick={btnHandler} style={{borderStyle : "none", backgroundColor: "transparent"}}>
        {/* <p>Close</p> */}
        <FontAwesomeIcon
          icon={faXmark}
          size="2x"
          //spin
          style={{ color: "white" }}
        />
      </button>
    </div>
  );
}
