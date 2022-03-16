import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: rgb(228, 228, 228);
        font-family: 'Open Sans', sans-serif;
    }
  
    a {
        text-decoration: none;
        color: black;
    }
    
    * {
        box-sizing: border-box;
    }
`;
