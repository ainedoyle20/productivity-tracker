import styled from "styled-components";

export const ProgressPageContainer = styled.div`
    margin: auto;
    margin-top: 10vh;
    padding-top: 6vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ProgressPageTitleContainer = styled.div`
    width: 50vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 800px) {
        width: 60vw;
        font-size: 12px;
    }
`;

export const ProgressPageButton = styled.button`
    background-color: rgb(170, 150, 192);
    margin-right: 2.5px;
    margin-left: 2.5px;
    padding: 5px;
    width: 75px;
    cursor: pointer;
    box-shadow: 0px 0px 2px gray;
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
`;

export const NoChartDataMessageContainer = styled.div`
    position: absolute;
    top: 45vh;
    display: ${props => props.chartData ? 'none' : 'flex'};
`;
