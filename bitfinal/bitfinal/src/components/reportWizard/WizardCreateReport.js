import { useState } from "react";

import Footer from "../pages/Footer";
import Header from "../pages/Header";
import CandidateSelect from "./CandidateSelect";
import CompanySelect from "./CompanySelect";
import FillReportDetails from "./FIllReportDetails";

import styles from "./css/WizardCreateReport.module.css";

const WizardCreateReport = () => {
  const [candidateDone, setCandidateDone] = useState(false);
  const [companiesDone, setCompaniesDone] = useState(false);
  const [fillReportDone, setfillReportDone] = useState(false);
  const [firstPageData, setFirstPageData] = useState("");
  const [secondPageData, setSecondPageData] = useState("");
  const [thirdPageData, setThirdPageData] = useState("");

  function sendData() {
    const data = {
      candidateId: firstPageData.id,
      candidateName: firstPageData.name,
      companyId: secondPageData.id,
      companyName: secondPageData.name,
      interviewDate: thirdPageData.date,
      phase: thirdPageData.phase || "CV",
      status: thirdPageData.status || "passed",
      note: thirdPageData.notes,
    };
    let print = JSON.stringify(data);
    alert(print);
    window.location.href = "/";
  }

  function handleNext(data) {
    setCandidateDone(true);
    setFirstPageData(data);
  }

  function handleAfterCompanies(data) {
    setCompaniesDone(true);
    setSecondPageData(data);
  }
  function handleReportSubmit(data) {
    setfillReportDone(true);
    setThirdPageData(data);
  }

  if (firstPageData && secondPageData && thirdPageData) {
    sendData();
  }

  function renderWizard() {
    if (firstPageData === "") {
      return !candidateDone && <CandidateSelect handleNext={handleNext} />;
    }
    if (secondPageData === "") {
      return (
        !companiesDone && (
          <CompanySelect handleAfterCompanies={handleAfterCompanies} />
        )
      );
    }
    if (thirdPageData === "") {
      return (
        !fillReportDone && (
          <FillReportDetails handleReportSubmit={handleReportSubmit} />
        )
      );
    }
  }

  return (
    <div>
      <Header />
      <h1>Create Report wizard</h1> <br />
      <div className={styles.holder}>
        <div className={styles.leftSide}>
          <div className={styles.static}>
            <ul className={styles.ListHolder}>
              <li className={styles.present}>
                {firstPageData ? firstPageData.name : "Select Candidate"}
              </li>
              <li className={styles.present}>
                {secondPageData ? secondPageData.name : "Select Company"}
              </li>
              <li className={styles.present}>
                {thirdPageData ? thirdPageData.id : "Select details"}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rightSide}>{renderWizard()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default WizardCreateReport;
