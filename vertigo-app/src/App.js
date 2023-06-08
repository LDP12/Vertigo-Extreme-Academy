import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationComponent from "./Components/RegistrationComponent";
import HomeComponent from "./Components/HomeComponent";
import AboutComponent from "./Components/AboutComponent";
import ProjectsComponent from "./Components/ProjectsComponent";
import PhotoComponent from "./Components/PhotoComponent";
import GetInvComponent from "./Components/GetInvComponent";
import LoginComponent from "./Components/LoginComponent";
import ContactComponent from "./Components/ContactComponent";
import Unsubscribe from "./Components/Unsubscribe";

function App() {

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LoginComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/home" element={<HomeComponent />} />
                    <Route path="/registration" element={<RegistrationComponent />} />
                    <Route path="/about-us" element={<AboutComponent />} />
                    <Route path="/our-work" element={<ProjectsComponent />} />
                    <Route path="/photo-gallery" element={<PhotoComponent />} />
                    <Route path="/get-involved" element={<GetInvComponent />} />
                    <Route path="/contact-us" element={<ContactComponent />} />
                    <Route path="/unsubscribe" element={<Unsubscribe />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;