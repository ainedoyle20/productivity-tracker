import styled from "styled-components";

export const RegisterAndLoginPageContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BackToSetupLinkContainer = styled.div`
    position: absolute;
    top: 2vh;
    left: 0;
    padding: 15px;
    display: flex;
    font-size: 19px;

    img {
        width: 20px;
        margin-right: 5px;
    }

    &:hover {
        font-size: 20px;
    }
`;