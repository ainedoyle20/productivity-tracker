import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidbarContainer = styled.div`
    background-color: black;
    width: 3.5rem;
    height: 80vh;
    margin-top: 1rem;
    border-radius: 0 30px 30px 0;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0;
`;

export const Slickbar = styled.div`
    color: white;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    padding: 2rem 0;
    position: absolute;
    top: 10rem;
    left: 0;
    width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
    transition: all 0.5s ease;
    border-radius: 0 30px 30px 0; 

    .active {
        border-right: 6px solid white;
        img {
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
            brightness(103%) contrast(103%);
        }
    }
`;

export const Item = styled(NavLink)`
    text-decoration: none;
    color: white;
    width: 100%;
    padding: 2rem 0;
    cursor: pointer;
    display: flex;
    // padding-left: 1rem;

    &:hover {
        border-right: 6px solid white;
        img {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
            brightness(103%) contrast(103%);
        }
    }

    img {
        padding-left: 1rem;
        width: 1.2rem;
        height: auto;
        filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
            brightness(78%) contrast(85%);
    }    
`;

export const Text = styled.span`
    width: ${(props) => (props.clicked ? "100%" : "0")};
    overflow: hidden;
    margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
    transition: all 0.3s ease;
`;

export const Button = styled.button`
    background-color: black;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    // margin: 0.5rem 0 0 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
        width: 1.9rem;
        height: auto;
        filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
            brightness(78%) contrast(85%);
    } 
`;