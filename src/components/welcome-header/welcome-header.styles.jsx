import styled from "styled-components";
import { Link } from "react-router-dom";

export const WelcomeHeaderContainer = styled.div`
    width: 100%;
    height: 10%;
    padding-top: 20px;
    display: flex;
    align-items: center;
`;

export const WelcomeHeaderLink = styled(Link)`
    padding-right: 30px;
    padding-left: 5px;
    font-size: 19px;
    cursor: pointer;

    &:hover {
        font-size: 20px;
    }
`;

export const BackToHomeLinkContainer = styled.div`
    width: 50%;
    padding-left: 30px;
    display: flex;
`;

export const BackToHomeArrow = styled.img`
    width: 20px;
`;

export const WelcomeHeaderLinksContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
`;
