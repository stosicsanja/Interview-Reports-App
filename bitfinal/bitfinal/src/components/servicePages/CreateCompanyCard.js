import { useState, useEffect } from "react";

import styles from './css/CreateCompanyCard.module.css';

function CreateReportCard({ name, isSelected, onClick, clearSelection }) {
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
 <ul className={`${styles.companyCardContainer} ${selected? styles.selected : ''}`} onClick={onClickHandler} >
    <li>{name}</li>
 </ul>
  );
}


export default CreateReportCard;
