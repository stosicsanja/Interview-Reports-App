import { useState, useEffect } from "react";
import Card from "../servicePages/Card";
import SearchBar from "../searchBar/SearchBar";
import NoData from '../servicePages/NoData';
import Loading from '../servicePages/Loading';
import ErrorPage from '../servicePages/ErrorPage';
import styles from "./css/CandidateReports.module.css";

const CandidateReports = () => {
	const [candidates, setCandidates] = useState([]);
	const [filterCandidates, setFilterCandidates] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const API_URL = "http://localhost:3333/api/candidates";

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
			setCandidates(data.slice(0, 6));
			setFilterCandidates(data.slice(0, 6));
			setIsLoading(false);
		} catch {
			setHasError(true);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	function renderHome() {
		if (filterCandidates.length === 0) {
			return <NoData />;
		}
		if (filterCandidates.length > 0 ) {
			return (
				<>
					{filterCandidates.map((render) => {
						return (
							<Card
								key={render.id}
								id={render.id}
								name={render.name}
								email={render.email}
								avatar={render.avatar}
							/>
						);
					})}
				</>
			);
		}

	}

	const handleSearch = (query) => {
		const filtered = candidates.filter((user) => {
			const name = `${user.name}`.toLowerCase();
			return name.includes(query.toLowerCase());
		});
		setFilterCandidates(filtered);
	};


	if (isLoading) {
		return <Loading />;
	}
	if (hasError) {
		return <ErrorPage />;
	}


	return (
		<div className={styles.presentCandidates}>
			<SearchBar onSearch={handleSearch} /> {renderHome()}
		</div>
	);
};

export default CandidateReports;
