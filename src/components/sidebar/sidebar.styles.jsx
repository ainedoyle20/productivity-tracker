import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidbarContainer = styled.div`
    background-color: rgb(219, 219, 219);

    width: 3.5rem;
    height: 80vh;
    // margin-top: 1rem;
    margin-top: 8vh;
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
    background-color: rgb(219, 219, 219);

    // padding: 0rem 0;
    position: absolute;
    top: 25%;
    left: 0;
    width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
    transition: all 0.5s ease;
    border-radius: 0 30px 30px 0; 

    .active {
        font-weight: bolder;
        font-size: 20px;
        img {
            height: 20px;
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
            brightness(0%) contrast(103%);
        }
    }
`;

export const Item = styled(NavLink)`
    text-decoration: none;
    color: black;

    width: 100%;
    padding: 1.5rem 0;
    cursor: pointer;
    display: flex;
    // padding-left: 1rem;

    &:hover {
        img {
            height: 20px;
            filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
            brightness(20%) contrast(85%);
        }
        font-weight: bolder;
        font-size: 20px;
    }

    img {
        padding-left: 1rem;
        height: 18px;
        filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
            brightness(78%) contrast(85%);
        filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
        brightness(20%) contrast(85%);
    }    
`;

export const BottomItemsContainer = styled.div`
    width: 100%;
    margin-top: 8vh;
    diplay: flex;
    justify-content: flex-start;
`;

export const Text = styled.span`
    width: ${(props) => (props.clicked ? "100%" : "0")};
    overflow: hidden;
    margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
    transition: all 0.3s ease;
    font-size: 18px;
`;

export const Button = styled.button`
    background-color: rgb(219, 219, 219);   
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
            brightness(0%) contrast(85%);
    } 
`;