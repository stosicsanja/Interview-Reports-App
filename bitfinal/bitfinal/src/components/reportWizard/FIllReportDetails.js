import { useState } from "react";
import Button from "../servicePages/Button";

import styles from './css/FillReportDetails.module.css';

const FillReportDetails = ({ handleReportSubmit }) => {
  const [report, setReport] = useState({
    date: "",
    phase: "",
    status: "",
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleReportSubmit(report);
  };

  return (
    <div className={styles.formHolder}>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <label htmlFor="start">Interview date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={report.date}
          min="2021-01-01"
          max={new Date().toISOString().slice(0, 10)}
          onChange={handleInputChange}
          required
        ></input>
        <br />
        <label htmlFor="phase">Phase</label>
        <select
          name="phase"
          value={report.phase || "CV"}
          onChange={handleInputChange}
          required
        >
          <option value="CV">CV</option>
          <option value="HR">HR</option>
          <option value="Tech">Tech</option>
          <option value="Final">Final</option>
        </select>
        <br />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={report.status || "Passed"}
          onChange={handleInputChange}
          required
        >
          <option value="Passed">Passed</option>
          <option value="Declined">Declined</option>
        </select>
        <br />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          rows="5"
          cols="33"
          placeholder="Note..."
          onChange={handleInputChange}
          required
        ></textarea>

        <Button type="submit" disabled="false">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FillReportDetails;
