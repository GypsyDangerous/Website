import React from 'react';
import "./Home.css"

import {Link} from "react-router-dom"
import { useContext } from 'react';
import { AppContext } from '../../contexts/Appcontext';

const Home = () => {

    const {dropDownOpen} = useContext(AppContext)

    return (
        <>
            <div className="header-area">
                <h1 className="body-header">Integrate your Discord server with Twitch</h1>
                <h3 className="body-subheader">Chat, QnAs, Polls, Games and much more easily Integrated with Twitch and Discord!</h3>
            </div>
            <div className="buttons">
                <Link to="/invite" target="_blank" rel="noreferrer noopener" className="discord-button"><img src={`${process.env.PUBLIC_URL}/discord.png`} alt="custom discord logo"></img>Add To Discord</Link>
                <Link to="/about" className="about-button">See How It Works</Link>
            </div>
        </>
    );
}

export default Home;