import styled from "styled-components";

export const RegisterContainer = styled.div`
    background-color: rgb(219, 219, 219);
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10%;

    @media screen and (max-width: 800px) {
        width: 90vw;
    }
`;

export const RegisterTitle = styled.h2`
    padding-top: 2%;
`;

export const RegisterSubtitle = styled.span`
    padding: 0 5%;
    padding-bottom: 5%;
`;

export const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 20%;
`;

export const RegisterFormInput = styled.input`
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

export const RegisterFormButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    button {
        background-color: rgb(235, 233, 233);

        &:hover {
            background-color: rgb(240, 240, 240);
            cursor: pointer;
        }
    }
`;

export const RegisterButton = styled.button`
    width: 50%;
    margin: 3%;
    padding: 2%;
    border: none;
`;

export const ContinueWithGoogleButton = styled.button`
    width: 50%;
    margin: 3%;
    padding: 2%;
    border: none;
`;

export const AlreadyHaveAnAccountMessage = styled.span`
    margin-bottom: 5%;
    margin-top: 2%;
`;

export const LoginHereContainer = styled.span`
    text-decoration: underline;
    font-weight: bolder;
    cursor: pointer;
    padding: 0 5px;
`;
