import RenderReportsPage from "./RenderReportsPage";
import Header from "../pages/Header";
import Footer from "../pages/Footer";


import classes from './css/ReportsHome.module.css';

function RepotsHome() {
    return ( 
        <>
        <Header />
        <div className={classes.main}>
            <RenderReportsPage />
        </div>
        <Footer />
        </>
     );
}

export default RepotsHome;