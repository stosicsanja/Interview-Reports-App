import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "../servicePages/Loading";
import ErrorPage from "../servicePages/ErrorPage";
import ReportModal from "./ReportModal";

import styles from "./css/SingleCandidate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function SingleCandidate() {
	const { id } = useParams();
	const [candidate, setCandidate] = useState({});
	const [reports, setReports] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalReport, setModalReport] = useState({});

	const API_URL = `http://localhost:3333/api/candidates/${id}`;

	async function fetchCandidate() {
		try {
			setIsLoading(true);
			const response = await fetch(API_URL, {
				method: "GET",
				params: {
					accessToken: "ey...Yc",
					Authorization: "Bearer",
				},
			});
			const data = await response.json();
			setCandidate(data);
			setIsLoading(false);
		} catch {
			setIsLoading(false);
			setHasError(true);
		}
	}

	async function fetchReports() {
		try {
			const response = await fetch(
				`http://localhost:3333/api/reports?candidateId=${id}`,
				{
					method: "GET",
					params: {
						accessToken: "ey...Yc",
						Authorization: "Bearer",
					},
				}
			);
			const data = await response.json();
			setReports(data);
			setIsLoading(false);
		} catch {
			setIsLoading(false);
			setHasError(true);
		}
	}

	useEffect(() => {
		fetchCandidate();
		fetchReports();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (hasError) {
		return <ErrorPage />;
	}

	function handleOpenModal(report) {
		setModalReport(report);
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
	}

	return (
		<>
			{isModalOpen && (
				<ReportModal onClose={handleCloseModal} modalReport={modalReport} />
			)}

			<Header />
			<div className={styles.container}>
				<div className={styles.candidateContainer}>
				<img src={candidate.avatar} />
					<div className={styles.candidatePrint}>
						<h2>Name : {candidate.name}</h2>
						<p>Email : {candidate.email}</p>
						<p>Education : {candidate.education}</p>
					</div>
				</div>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Company Name</th>
							<th>Interview Date</th>
							<th>Status</th>
							<th>View More</th>
						</tr>
					</thead>
					<tbody>
						{reports.map((report) => (
							<tr key={report.id}>
								<td>{report.companyName}</td>
								<td>{report.interviewDate}</td>
								<td>{report.status}</td>
								<td className={styles.eyeHolder}>
									<FontAwesomeIcon
                                        className={styles.eye}
										role="button"
										icon={faEye}
										onClick={() => {
											handleOpenModal(report);
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Footer />
		</>
	);
}

export default SingleCandidate;
