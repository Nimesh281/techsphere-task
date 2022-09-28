import React from "react";
import a from "../images/1.png";
import { useEffect } from "react";
import "../components/css/Player.css";
import b from "../images/Cover.png";
import more from "../images/more.png";
import prev from "../images/prev.png";
import play1 from "../images/play.png";
import pause from "../images/pause.png";
import next from "../images/next.png";
import volume from "../images/volume.png";
import muted from "../images/muted.png";
import progress from "../images/progress.png";

function Player(props) {
  let flag = 0;
  let flag2 = 0;
  useEffect(() => {
    console.log(props.currentsong, "player");
  }, [props.currentsong]);

  function handleplay() {
    let play = document.getElementById("audio");
    let imgchange = document.getElementById("play");
    if (flag == 0) {
      play.play();
      flag = 1;
      imgchange.src = pause;
    } else {
      play.pause();
      flag = 0;
      imgchange.src = play1;
    }

    console.log("play");
  }
  function handlemute() {
    let mute = document.getElementById("audio");
    let imgchange2 = document.getElementById("mute");
    if (flag2 == 0) {
      mute.muted = true;
      flag2 = 1;
      imgchange2.src = muted;
    } else {
      mute.muted = false;
      flag2 = 0;
      imgchange2.src = volume;
    }

    console.log("mute");
  }
  return (
    <div>
      {props.currentsong ? (
        <div className="player_container">
          <div className="backgroundimg">
            <img src={props.currentsong.track.album.images[0].url} alt="" />
          </div>
          <audio
            src={props.currentsong.track.preview_url}
            controls
            id="audio"
            loop="loop"
          ></audio>
          <div className="tracks_details">
            <p id="title">{props.currentsong.track.name} </p>

            <p id="artist">{props.currentsong.track.artists[0].name}</p>
          </div>
          <div className="song_image">
            <img src={props.currentsong.track.album.images[0].url} alt="" />
          </div>
          <div className="progressbar">
            <img src={progress} alt="progress" />
          </div>
          <div className="controls">
            <div className="more">
              <img src={more} alt="more" />
            </div>
            <div className="buttons">
              <img id="prev" src={prev} alt="prev" />
              <img id="play" src={play1} onClick={handleplay} alt="play" />
              <img id="next" src={next} alt="next" />
            </div>
            <div className="volume">
              <img id="mute" src={volume} onClick={handlemute} alt="volume" />
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}

export default Player;
