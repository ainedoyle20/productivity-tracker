import styled from "styled-components";

export const SchedulePageContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(228, 228, 228);
`;

export const CalendarPlatform = styled.div`
    width: 770px;

    @media screen and (max-width: 800px) {
        width: 490px;
    }

    @media screen and (max-width: 499px) {
        width: 350px;
    }
`;

export const WeekdaysContainer = styled.div`
    width: 100%;
    display: flex;
    color: #247BA0;

    div {
        width: 110px;
        padding: 10px;
        display: flex;
        justify-content: center;

        @media screen and (max-width: 800px) {
            width: 70px;
            font-size: 10px;
        }

        @media screen and (max-width: 499px) {
            width: 50px;
            font-size: 8px;
        }
    }
`;

