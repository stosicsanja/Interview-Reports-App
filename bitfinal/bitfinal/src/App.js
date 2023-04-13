import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SingleCandidate from "./components/pages/SingleCandidate";
import "./App.css";
import ReportsHome from "./components/ReportsAdmin/ReportsHome";
import WizardCreateReport from "./components/reportWizard/WizardCreateReport";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlecandidate/:id" element={<SingleCandidate />} />
        <Route path="/reportsAdmin" element={<ReportsHome />} />
        <Route path="/reportWizard" element={<WizardCreateReport />} />
      </Routes>
    </div>
  );
}

export default App;
