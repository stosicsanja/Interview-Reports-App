import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./css/StartWizard.module.css";

function StartWizard() {
  return (
    <div className={styles.plusContainer}>
      <Link to="/reportWizard">
        <FontAwesomeIcon
          className={styles.plusSign}
          icon={faPlus}
          role="button"
        />
      </Link>
    </div>
  );
}

export default StartWizard;
