import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/Appcontext';
import firebase from "../../firebase"
import TwitchApi from "../Shared/twitchLib"
import {Link} from "react-router-dom"
import "./Users.css"
import { useEffectOnce } from 'react-use';

const Api = new TwitchApi({
    clientId: process.env.REACT_APP_TWITCH_CLIENT_ID,
    authorizationKey: process.env.REACT_APP_TWITCH_ACCESS_TOKEN
})

const ChannelItem = props => {
    return (
        <div className="channel-item">
            <div className="channel-profile-pic">
                <img src={props["profile_image_url"] || props.profilePicture} alt=""/>
            </div>
            <div className="channel-info">
                <span className="channel-name">{props.display_name || props.name}</span>
                <button disabled={!props.isMember} className="to-dashboard">{props.isMember ? <Link to={`/dashboard/${(props.login || props.name).toLowerCase()}`} >{!props.moderator ? "Go To Dashboard" : "Go To ModView"}</Link> : <>This channel doesn't use DisTwitchChat</>}</button>
            </div>
        </div>
    )
}

const Channels = () => {

    const {currentUser} = useContext(AppContext)
    const [myChannel, setMyChannel] = useState()
    const [modChannels, setModChannels] = useState([])

    useEffectOnce(() => {
        setMyChannel({ name: currentUser.name, isMember: true, profilePicture: currentUser.profilePicture })
    })

    useEffectOnce(() => {
        (async () => {
            const users = (await (await firebase.db.collection("Streamers").doc("registered").get()).data()).names
            const modApiUrl = `https://modlookup.3v.fi/api/user-v3/${currentUser.name}`
            const response = await fetch(modApiUrl)
            const json = await response.json()
            const channels = json.channels
            const channelsInfo = await Promise.all(channels.map(async channel => Api.getUserInfo(channel.name)))
            setModChannels(channelsInfo.map(channel => {return {...channel, modPlatform: "twitch", isMember: true}}))
        })()
    })

    return (
        <div className="my-channels">
            <h1>Your Channel</h1>
            <ChannelItem {...myChannel}/>
            <hr/>
            <h1>Channels you moderate</h1>
            {modChannels.map(channel => (
                <ChannelItem {...channel} moderator/>
            ))}
        </div>
    );
}

export default Channels;