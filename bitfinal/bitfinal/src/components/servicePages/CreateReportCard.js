import styles from "./css/CreateReportCard.module.css";
import { useState, useEffect } from "react";

function CreateReportCard({ name, email, avatar, isSelected, onClick, clearSelection }) {
  const [selected,setSelected]= useState(isSelected);


  useEffect(()=>{
    setSelected(isSelected);
  }, [isSelected])

  const onClickHandler = ()=>{
    clearSelection()
    setSelected(!isSelected);
    onClick();
  }

  return (
    <div className={`${styles.reportCardContainer} ${selected? styles.selected : ''}`} onClick={onClickHandler}>
      <div className={styles.reportCard}>
        <img className={styles.reportAvatar} src={avatar} alt={name} />
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}


export default CreateReportCard;
