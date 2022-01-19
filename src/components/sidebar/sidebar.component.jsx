import React, { useState } from "react";

import Menu from '../../assets/menu.svg';
import Home from '../../assets/home.svg';
import Schedule from '../../assets/schedule.svg';
import History from '../../assets/history.svg';
import Progress from '../../assets/graph.svg';

import {
    SidbarContainer,
    Slickbar,
    Item,
    Text,
    Button
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
                    <img src={Schedule} alt='Schedule' />
                    <Text clicked={clickStatus}>Schedule</Text>
                </Item>
                <Item
                    className="item"
                    onClick={() => setClickStatus(false)}
                    activeclassname="active"
                    to="/main/history"
                >
                    <img src={History} alt='History' />
                    <Text clicked={clickStatus}>History</Text>
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
            </Slickbar>
        </SidbarContainer>
    );
}

export default Sidebar;
