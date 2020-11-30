import "./VoiceMessagePlayer.css";
import React, { useRef, useState } from "react";
import { IconButton, LinearProgress } from "@material-ui/core";
import {
  PauseCircleFilledRounded,
  PlayCircleFilledWhiteRounded,
} from "@material-ui/icons";

export default function VoiceMessagePlayer({ src }) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const handlePlayButtonClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const handleTimeUpdate = () => {
    let playPercent =
      100 * (audioRef.current.currentTime / audioRef.current.duration);
    setProgress(playPercent);
  };

  return (
    <div className="player-container">
      <audio
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          setIsLoading(false);
          console.log(audioRef.current.duration);
        }}
        onCanPlay={() => console.log(audioRef.current.duration)}
        ref={audioRef}
        src={src}
      />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <IconButton onClick={handlePlayButtonClick}>
            {isPlaying ? (
              <PauseCircleFilledRounded />
            ) : (
              <PlayCircleFilledWhiteRounded />
            )}
          </IconButton>
          <LinearProgress variant="determinate" value={progress} />
        </>
      )}
    </div>
  );
}
