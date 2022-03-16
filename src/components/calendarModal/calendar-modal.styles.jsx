import styled from "styled-components";

export const CalendarModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 35vw;
    z-index: 10;
    width: 400px;
    min-height: 400px;
    background-color: white;
    border: 2px solid black;
    border-radius: 10%;

    @media screen and (max-width: 800px) {
        width: 250px;
        min-height: 350px;
        left: 25vw;
    }
`;

export const CalendarModalHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CalendarModalInput = styled.input`
    padding: 15px;
    height: 15px;
`;

export const CalendarModalCreateTodoButton = styled.button`
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: rgb(228, 228, 228);

    img {
        height: 15px;
    }
`;

export const CalendarModalTodosList = styled.ul`
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 100%;
    overflow: scroll;
`;

export const CalendarModalTodoContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;

    img {
        height: 16px;
        cursor: pointer;
    }
`;

export const CloseModalButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
`;

export const CloseModalButton = styled.button`
    color: grey;
`;
