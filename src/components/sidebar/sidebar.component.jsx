import React, { useState } from "react";

import { auth, signOut } from "../../firebase/firebase.utils";

import Menu from '../../assets/menu.svg';
import Home from '../../assets/home-svg.svg';
import Calendar from '../../assets/calendar-svg.svg';
import Logout from '../../assets/logout.svg';
import Progress from '../../assets/graph.svg';
import Setup from '../../assets/setup.svg';

import {
    SidbarContainer,
    Slickbar,
    Item,
    Text,
    Button,
    BottomItemsContainer,
} from './sidebar.styles';

const Sidebar = () => {
    const [ clickStatus, setClickStatus ] = useState(false);
    const handleClick = () => setClickStatus(!clickStatus);

    return (
        <SidbarContainer>
            <Button clicked={clickStatus} onClick={handleClick}>
                <img src={Menu} alt="Menu" />
            </Button>
            <Slickbar clicked={clickStatus}>
                <Item
                    className="item"
                    onClick={() => setClickStatus(false)}
                    activeclassname="active"
                    to="/main/home"
                >
                    <img src={Home} alt='Home' />
                    <Text clicked={clickStatus}>Home</Text>
                </Item>
                <Item
                    className="item"
                    onClick={() => setClickStatus(false)}
                    activeclassname="active"
                    to="/main/schedule"
                >
                    <img src={Calendar} alt='Calendar' />
                    <Text clicked={clickStatus}>Calendar</Text>
                </Item>
                <Item
                    className="item"
                    onClick={() => setClickStatus(false)}
                    activeclassname="active"
                    to="/main/progress"
                >
                    <img src={Progress} alt='Progress' />
                    <Text clicked={clickStatus}>Progress</Text>
                </Item>
                <BottomItemsContainer>
                    <Item
                        className="item bottom-item"
                        activeclassname="active"
                        to="/"
                    >
                        <img src={Setup} alt='Setup' />
                        <Text clicked={clickStatus}>Set Up</Text>
                    </Item>
                    <Item
                        to="/"
                        className="item bottom-item"
                        onClick={() => {
                            signOut(auth);
                        }}
                        activeclassname="active"
                    >
                        <img src={Logout} alt='Logout' />
                        <Text clicked={clickStatus}>Logout</Text>
                    </Item>
                </BottomItemsContainer>
            </Slickbar>
        </SidbarContainer>
    );
}

export default Sidebar;
