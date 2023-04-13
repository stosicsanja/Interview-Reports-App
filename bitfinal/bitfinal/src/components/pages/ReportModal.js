import { useEffect, useRef } from "react";
import styles from "./css/ReportModal.module.css";
import Button from "../servicePages/Button";

const ReportModal = (props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, props]);

  const formatDate = (someDate) => {
    let date = new Date(someDate);
    let month = date.toLocaleString("en-US", { month: "2-digit" });
    let day = date.toLocaleString("en-US", { day: "2-digit" });
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.popup}>
        <h1>{props.modalReport.candidateName}</h1>
        <div className={styles.main}>
          <h3>{props.modalReport.companyName}</h3>
          <p>Interview Date: {formatDate(props.modalReport.interviewDate)}</p>
          <p>Phase: {props.modalReport.phase}</p>
          <p>Status: {props.modalReport.status}</p>
        </div>
        <div className={styles.note}>
          <p>Note: {props.modalReport.note}</p>
          <Button onClick={props.onClose} disabled="false">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
