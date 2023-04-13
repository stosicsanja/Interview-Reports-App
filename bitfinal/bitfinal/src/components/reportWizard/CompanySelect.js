import { useState, useEffect } from "react";
import Loading from "../servicePages/Loading";
import ErrorPage from "../servicePages/ErrorPage";
import NoData from "../servicePages/NoData";
import CreateCompanyCard from "../servicePages/CreateCompanyCard";
import Button from "../servicePages/Button";
import SearchBar from "../searchBar/SearchBar";

import styles from "./css/CompanySelect.module.css";

const CompanySelect = ({ handleAfterCompanies }) => {
  const API_URL = "http://localhost:3333/api/companies";
  const [companies, setCompanies] = useState([]);
  const [filterCompanies, setFilterCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selected, setSelected] = useState(false);

  async function fetchCompany() {
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
      setIsLoading(false);
      setCompanies(data);
      setFilterCompanies(data);
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  }

  function userSelected(company) {
    setSelected(company);
  }

  function renderCompanies() {
    if (filterCompanies.length === 0) {
      return <NoData />;
    }
    const clearSelection = () => {
      setFilterCompanies((prev) =>
        prev.map((company) => ({ ...company, isSelected: false }))
      );
    };

    return (
      <>
        {filterCompanies.map((company) => {
          return (
            <div key={company.id} className={styles.renderHolder}>
              <CreateCompanyCard
                name={company.name}
                onClick={() => userSelected(company)}
                isSelected={selected && selected.id === company.id}
                clearSelection={clearSelection}
              />
            </div>
          );
        })}
        <div className={styles.buttonHolder}>
          <br />
          <br />
          <Button
            disabled={selected}
            onClick={() => handleAfterCompanies(selected)}
          >
            Next
          </Button>
        </div>
      </>
    );
  }
  useEffect(() => {
    fetchCompany();
  }, []);

  const handleSearch = (query) => {
    const filtered = companies.filter((company) => {
      const name = `${company.name}`.toLowerCase();
      return name.includes(query.toLowerCase());
    });
    setFilterCompanies(filtered);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.selectCompany}>
      <h2>Select Company</h2>
      <SearchBar onSearch={handleSearch} />
      {renderCompanies()}
    </div>
  );
};

export default CompanySelect;
