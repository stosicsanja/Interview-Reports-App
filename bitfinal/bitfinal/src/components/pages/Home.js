import Header from "./Header";
import Footer from "./Footer";
import CandidateReports from "./CandidateReports";
import styles from "./css/Home.module.css";

function Home() {
  return (
    <>
      <Header />
        <div className={styles.homepageContent}>
            <CandidateReports />
        </div>
      <Footer />
    </>
  );
}

export default Home;
