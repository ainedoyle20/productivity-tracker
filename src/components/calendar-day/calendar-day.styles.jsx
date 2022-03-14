import styled from "styled-components";

export const CalendarDayContainer = styled.div`
    width: 100px;
    padding: 10px;
    height: 100px;
    cursor: ${props => props.padding ? 'default' : 'pointer'};
    box-sizing: border-box;
    // background-color: ${props => props.isCurrentDay ? '#deeef7' : 'white'};
    background-color: ${props => props.isCurrentDay ? '#deeef7' : props.padding ? 'rgb(228, 228, 228)' : 'white'};
    margin: 5px;
    box-shadow: ${props => props.padding ? 'none' : '0px 0px 3px #CBD4C2'};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
        background-color: ${props => props.padding ? 'rgb(228, 228, 228)' : '#e8faed'};
    }
`;



// .padding {
//     cursor: default !important;
//     background-color: rgb(228, 228, 228) !important;
//     box-shadow: none !important;
// }