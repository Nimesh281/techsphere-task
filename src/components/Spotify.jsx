import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";
import "../components/css/Spotify.css";
import Songs from "./Songs";
import Player from "./Player";

export default function Spotify() {
  const [currentsong, setcurrentsong] = useState();
  const [songdata, setsongdata] = useState([]);

  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    console.log(songdata, "a");
    setcurrentsong(songdata[0]);
  }, [songdata]);
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  useEffect(() => {
    console.log(currentsong, "123");
    // console.log(currentsong.track.name)
  }, [currentsong]);

  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="maincontainer">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="songslist">
          <Songs
            setcurrentsong={setcurrentsong}
            songdata={songdata}
            setsongdata={setsongdata}
          />
        </div>
        <div className="player">
          <Player
            setcurrentsong={setcurrentsong}
            currentsong={currentsong}
            songdata={songdata}
            setsongdata={setsongdata}
          />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div``;
