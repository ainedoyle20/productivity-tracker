import React from "react";
import { Routes, Route } from 'react-router-dom';

import HomePage from '../home-page/home-page.component';
import SchedulePage from '../schedule-page/schedule-page.component';
import ProgressPage from '../progress-page/progress-page.component';
import Sidebar from "../../components/sidebar/sidebar.component";
// import NavBar from "../../components/navbar/navbar.component";

const MainPage = () => {
    return (
        <div>
            <Sidebar />
            {/* <NavBar /> */}
            <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="progress" element={<ProgressPage />} />
            </Routes>
        </div>
    );
}

export default MainPage;
