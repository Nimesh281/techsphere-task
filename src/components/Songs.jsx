import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import search from "../images/Search.png";
import listitem from "../images/listitem.png";
import a from "../images/1.png";
import burger from "../images/burger.png";
import cancel from "../images/cancel.png";
import "../components/css/Songs.css";
import "../components/css/Menu.css";

function Songs(props) {
  let key = 0;
  const [listflag, setlistflag] = useState(0);
  // const [songdata, setsongdata] = useState([]);
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      props.setsongdata(response.data.tracks.items);
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  useEffect(() => {
    console.log(props.songdata);
    props.setcurrentsong(props.songdata[0]);
  }, [props.songdata]);
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  function selected(e) {
    let audio = document.getElementById("audio");
    //  console.log(audio)
    audio.play();
  }

  let list = document.getElementById("list");

  function handlelist(e) {
    e.preventDefault();

    let burger1 = document.getElementById("burger1");

    if (listflag == 0) {
      list.style.display = "block";
      setlistflag(1);

      burger1.src = cancel;
    } else {
      list.style.display = "none";
      setlistflag(0);
      burger1.src = burger;
    }
  }

  return (
    <div>
      <div className="songs_container">
        <div className="heading">For You</div>
        <div className="hamburger" onClick={handlelist}>
          <img src={burger} id="burger1" alt="" srcset="" />
        </div>
        <div className="search">
          <img src={search} alt="search" />
        </div>
        <div className="tracks">
          <div id="list" className="list">
            {props.songdata &&
              props.songdata.map((song) => {
                key = key + 1;
                return (
                  <div id={key} className="active" onClick={selected}>
                    <div
                      onClick={() => props.setcurrentsong(song)}
                      className="track_container"
                    >
                      <div className="img-cont">
                        <img
                          src={song.track.album.images[0].url}
                          alt="search"
                        />
                      </div>
                      <div className="song_details">
                        <div className="track_details">
                          <p id="head">{song.track.name}</p>
                          <p id="writer">{song.track.artists[0].name}</p>
                        </div>
                        <div className="duration">
                          {msToMinutesAndSeconds(song.track.duration_ms)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Songs;
