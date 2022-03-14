import styled from "styled-components";

export const TodoContainer = styled.li`
    margin: 1% 0;
    width: 60%;
    display: flex;
    justify-content: space-between;
`;

export const TodoDescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    cursor: none;
`;

export const TodoStarIcon = styled.img`
    height: 12px;
    width: auto;
`;

export const TodoDescription = styled.p`
    padding-left: 5%;
    padding-right: 10%;
`;

export const TodoIconsContainer = styled.div`
    display: flex;
    width: 30%;
    justify-content: flex-end;
    align-items: center;
`;

export const TodoActionIcon = styled.img`
    margin: 0 8px;
    cursor: pointer;
    height: 20px;
    width: auto;
`;
