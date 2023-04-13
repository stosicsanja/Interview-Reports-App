import { useState, useEffect } from "react";
import Loading from "../servicePages/Loading";
import ErrorPage from "../servicePages/ErrorPage";
import NoData from "../servicePages/NoData";
import SearchBar from "../searchBar/SearchBar";
import Button from "../servicePages/Button";
import CreateReportCard from "../servicePages/CreateReportCard";

import styles from "./css/CandidateSelect.module.css";

const CandidateSelect = ({ handleNext }) => {
  const API_URL = "http://localhost:3333/api/candidates";
  const [candidates, setCandidates] = useState([]);
  const [filterCandidates, setFilterCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selected, setSelected] = useState(false);

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

  function userSelected(candidate) {
    setSelected(candidate);
  }

  function renderCandidates() {
    if (filterCandidates.length === 0) {
      return <NoData />;
    }
    const clearSelection = () => {
      setFilterCandidates((prev) =>
        prev.map((candidate) => ({ ...candidate, isSelected: false }))
      );
    };

    if (filterCandidates.length > 0) {
      return (
        <div className={styles.holder}>
          <h1>Select Candidate</h1>
          {filterCandidates.map((candidate) => {
            return (
              <div key={candidate.id}>
                <CreateReportCard
                  name={candidate.name}
                  email={candidate.email}
                  avatar={candidate.avatar}
                  onClick={() => userSelected(candidate)}
                  isSelected={selected && selected.id === candidate.id}
                  clearSelection={clearSelection}
                />
              </div>
            );
          })}
          <div className={styles.buttonHolder}>
            <Button
              className={styles.button}
              disabled={selected}
              onClick={() => handleNext(selected)}
            >
              Next
            </Button>
          </div>
        </div>
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
    <>
      <SearchBar onSearch={handleSearch} />
      {renderCandidates()}
    </>
  );
};

export default CandidateSelect;
