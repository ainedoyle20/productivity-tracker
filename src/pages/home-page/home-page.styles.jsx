import styled from "styled-components";

export const HomePageContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TodaysScheduleContainer = styled.div`
    background-color: rgb(219, 219, 219);
    border-radius: 10%;
    width: 60vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    overflow-x: hidden;
`;

export const TodaysTodosHeader = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
`;

export const CreateTodoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
`;

export const CreateTodoInput = styled.input`
    height: 40%;
    border: none;
    border-bottom: 1px solid black;
    padding: 0 10px;
    margin-right: 10px;

    &:focus {
        outline: none;
    }
`;

export const CreateTodaysTodoButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 100%;
    width: 40px;
    height: 40px;

    &:hover {
        cursor: pointer;
    }

    & .plus-icon {
        height: 20px;
        width: auto;
    }
`;

export const TodaysTodosListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
`;

export const TodosListTitleContainer = styled.div`
    width: 100%;
    height: 30px;
    font-size: 20px;
    text-decoration: underline;
    margin-bottom: 0;
    padding: 0 20px;
`;

export const TodaysTodosList = styled.ul`
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
