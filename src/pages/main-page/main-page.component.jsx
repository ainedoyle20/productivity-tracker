import React, {Suspense} from "react";
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('../home-page/home-page.component'));
const SchedulePage = React.lazy(() => import('../schedule-page/schedule-page.component'));
const ProgressPage = React.lazy(() => import('../progress-page/progress-page.component'));
const Sidebar = React.lazy(() => import("../../components/sidebar/sidebar.component"));

const MainPage = () => {
    return (
        <div>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Sidebar />
                <Routes>
                    <Route path="home" element={<HomePage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                    <Route path="progress" element={<ProgressPage />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default MainPage;
