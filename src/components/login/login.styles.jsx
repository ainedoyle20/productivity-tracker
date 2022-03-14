import styled from "styled-components";

export const LoginContainer = styled.div`
    background-color: rgb(219, 219, 219);
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10%;
`;

export const LoginTitle = styled.h2`
    padding-top: 2%;
`;

export const LoginSubtitle = styled.span`
    padding: 0 5%;
    padding-bottom: 5%;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 20%;
`;

export const LoginFormInput = styled.input`
    background: none;
    background-color: rgb(219, 219, 219);
    width: 100%;
    height: 100%;
    margin: 10px 0;
    padding: 18px 10px;
    border: none;
    border-bottom: 1px solid black;

    &:focus {
        outline: none;
    }
`;

export const LoginButton = styled.button`
    background-color: rgb(235, 233, 233);
    width: 50%;
    margin: 20px 0;
    padding: 10px;
    border: none;

    &:hover {
        background-color: rgb(240, 240, 240);
        cursor: pointer;
    }
`;

export const NoAccountYetMessage = styled.span`
    margin-bottom: 5%;
`;

export const RegisterHere = styled.span`
    text-decoration: underline;
    font-weight: bolder;
    cursor: pointer;
    padding-left: 5px;
`;
