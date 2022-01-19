import React from "react";
import { Routes, Route } from 'react-router-dom';

import HomePage from '../home-page/home-page.component';
import SchedulePage from '../schedule-page/schedule-page.component';
import HistoryPage from '../history-page/history-page.component';
import ProgressPage from '../progress-page/progress-page.component';
import Sidebar from "../../components/sidebar/sidebar.component";

const MainPage = () => {
    return (
        <div>
            <Sidebar />
            <Routes>
            <Route path="home" element={<HomePage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="progress" element={<ProgressPage />} />
            </Routes>
        </div>
    );
}

export default MainPage;
