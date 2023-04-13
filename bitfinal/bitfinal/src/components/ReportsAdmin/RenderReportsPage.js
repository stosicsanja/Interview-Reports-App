import ReportModal from "../pages/ReportModal";
import { useEffect, useState } from "react";
import Loading from "../servicePages/Loading";
import ErrorPage from "../servicePages/ErrorPage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./css/RenderReportsPage.module.css";
import StartWizard from "../reportWizard/StartWizard";

function RenderReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReport, setModalReport] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:3333/api/reports";

  const [fetchReports, setFetchReports] = useState([]);
  const [hasError, setHasError] = useState(false);

  async function fetchUsers() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        params: {
          accessToken: "ey...Yc",
          Authorization: "Bearer",
        },
      });
      const data = await response.json();
      setFetchReports(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleOpenModal(report) {
    setModalReport(report);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function deleteReport(reportId) {
    try {
      await fetch(`${API_URL}/${reportId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"ey...Yc"}`,
        },
      });
      setFetchReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportId)
      );
    } catch (error) {
      console.error(error);
    }
    console.log("deleted" + reportId);
  }

  const formatDate = (someDate) => {
    let date = new Date(someDate);
    let month = date.toLocaleString("en-US", { month: "2-digit" });
    let day = date.toLocaleString("en-US", { day: "2-digit" });
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <>
      {isModalOpen && (
        <ReportModal onClose={handleCloseModal} modalReport={modalReport} />
      )}
      {fetchReports.map((render) => {
        return (
          <ul key={render.id} className={styles.ulHolder}>
            <li className={styles.firstLi+' '+ styles.li}>{render.companyName}</li>
            <li className={styles.li}>{render.candidateName}</li>
            <li className={styles.li}>{formatDate(render.interviewDate)}</li>
            <li className={styles.li}>{render.status}</li>
            <li className={styles.li}>
              <FontAwesomeIcon
                className={styles.eye}
                role="button"
                icon={faEye}
                onClick={() => {
                  handleOpenModal(render);
                }}
              />
            </li>
            <li className={styles.li}>
              <FontAwesomeIcon
                role="button"
                icon={faTrash}
                onClick={() => deleteReport(render.id)}
              />
            </li>
          </ul>
        );
      })}
      <StartWizard />
    </>
  );
}

export default RenderReportsPage;
