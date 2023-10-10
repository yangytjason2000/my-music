import { useEffect, useState } from "react"; 
import useSound from "use-sound"; // for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons"; 
import data from "../data/data";

const MusicPlayer = () =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [play,{pause,duration,sound}] = useSound(data[0].source);
    const [currentIndex, setCurrIndex] = useState(0);

    const [time, setTime] = useState({
        min: "",
        sec: ""
    });

    const [currTime,setCurrTime] = useState({
        min: "",
        sec: "",
    });

    const [seconds,setSeconds] = useState(0);

    function formatTime(value) {
        return String(value).padStart(2, '0');
    }

    useEffect(() => {
        if (duration) {
          const sec = duration / 1000;
          const min = Math.floor(sec / 60);
          const secRemain = Math.floor(sec % 60);
          setTime({
            min: min,
            sec: formatTime(secRemain),
          });
        }
      }, [duration]);

    useEffect(() => {
        const interval = setInterval(() => {
          if (sound) {
            setSeconds(sound.seek([])); // setting the seconds state with the current state
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
              min: min,
              sec: formatTime(sec),
            });
          }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () =>{
        if (isPlaying){
            pause();
            setIsPlaying(false);
        }
        else {
            play();
            setIsPlaying(true);
        }
    }

    const nextSong = () => {
        if (currentIndex+1<data.length-1){
            setCurrIndex(index=>index+1);
        }
        else {
            setCurrIndex(0);
        }
    }

    const lastSong = () => {
        if (currentIndex-1<0){
            setCurrIndex(index=>index-1);
        }
        else {
            setCurrIndex(0);
        }
    }
    return (
        <div className={`
            fixed 
            bottom-0
            rounded-xl
            w-[500px] 
            h-[80px] 
            flex
            justify-between
            left-1/2 transform -translate-x-1/2
            items-center 
            px-4 
            mb-4
            bg-black 
            text-white`
            }>
            <div className="w-1/4 flex justify-center items-center">
                <h2 className="font-bold text-xl">{data[currentIndex].name}</h2>
            </div>

            <div className="w-1/3"> 
                <div className="flex justify-between">
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>
                <input
                className="w-full"
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                onChange={(e) => {
                    sound.seek([e.target.value]);
                }}
                />
            </div>
            <div>
                <button onClick={lastSong}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                <button onClick={playingButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <AiFillPlayCircle />
                    </IconContext.Provider>
                </button>
                ) : (
                <button onClick={playingButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <AiFillPauseCircle />
                    </IconContext.Provider>
                </button>
                )}
                <button onClick={nextSong}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default MusicPlayer;