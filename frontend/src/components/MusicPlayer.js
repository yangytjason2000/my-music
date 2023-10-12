import { useCallback, useEffect, useState } from "react"; 
import { Howl } from 'howler';// for handling the sound
import { AiFillPlayCircle, AiFillPauseCircle} from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { GoTriangleRight} from "react-icons/go"
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";

const MusicPlayer = () =>{
    const songList = useSelector((state)=>state.songList.songList); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const [currentIndex, setCurrIndex] = useState(0);
    const [shrink,setShrink] = useState(false);
    const [expand,setExpand] = useState(false);
    const [time, setTime] = useState({
        min: "0",
        sec: "00"
    });

    const [currTime,setCurrTime] = useState({
        min: "0",
        sec: "00",
    });

    const [seconds,setSeconds] = useState(0);
    // load the song into sound
    const playSong = useCallback((src) => {
        if (sound) {
            sound.stop()
        }

        const howlSound = new Howl({
            src: [src],
            onPlay: () => setIsPlaying(true),
            onend: () => setIsPlaying(false),
            onload: () => {
                setTime({
                    min: Math.floor(howlSound.duration() / 60),
                    sec: formatTime(Math.floor(howlSound.duration() % 60)),
                })
            }
        });
        setSound(howlSound);
    },[sound])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=>{
        if (songList.length>0) {
            playSong(songList[currentIndex].source)
        }
        return () => {
            if (sound) {
                sound.stop();
            }
        };
    },[songList, currentIndex])
    /* eslint-disable react-hooks/exhaustive-deps */

    function formatTime(value) {
        return String(value).padStart(2, '0');
    }
    // update the current time
    useEffect(() => {
        const interval = setInterval(() => {
          if (sound && isPlaying) {
            const currentTime = sound.seek();
            setSeconds(currentTime); // setting the seconds state with the current state
            setCurrTime({
              min: Math.floor(currentTime / 60),
              sec: formatTime(Math.floor(currentTime % 60)),
            });
          }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound, isPlaying]);

    const playingButton = () =>{
        if (sound){
            if (isPlaying){
                sound.pause();
                setIsPlaying(false);
            }
            else {
                sound.play();
                setIsPlaying(true);
            }
        }
    }

    const handleShrink  = () => {
        setShrink(shrink=>!shrink);
    }

    const handleExpand = () => {
        setExpand(expand=>!expand);
    }
    const nextSong = () => {
        const nextIndex = (currentIndex + 1) % songList.length;
        if (nextIndex!==currentIndex){
            setCurrTime({
                min: "0",
                sec: "00",
            });
        }
        setCurrIndex(nextIndex);
    };
    
    const lastSong = () => {
        const prevIndex = (currentIndex - 1 + songList.length) % songList.length;
        if (prevIndex!==currentIndex){
            setCurrTime({
                min: "0",
                sec: "00",
            });
        }
        setCurrIndex(prevIndex);
    };
    return (
        <div>
            <div className={`
                ${expand ? 
                    'w-[50%] h-[95vh] fixed bottom-0 left-1/2 transform -translate-x-1/2' : 
                    'w-[80%] h-[60px] fixed bottom-0 left-1/2 transform -translate-x-1/2'}
                ${shrink ? 'translate-y-20' : ''}
                duration-300
                rounded-lg
                flex
                justify-between
                items-center 
                px-4 
                mb-4
                bg-gray-800
                text-white`
                }>
                <div className="w-1/4 flex justify-center items-center">
                    <h2 className="font-bold text-xl cursor-pointer hover:border-b-2" 
                        onClick={handleExpand}>
                            {songList.length ? songList[currentIndex].name : ''}
                    </h2>
                </div>

                <div className="w-[50%]"> 
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
                        max={time? 0 : time.min * 60 + parseInt(time.sec, 10)}
                        default="0"
                        value={seconds}
                        onChange={(e) => {
                            if (sound) {
                                sound.seek([e.target.value]);
                            }
                        }}
                    />
                </div>
                <div className="items-center flex">
                    <button onClick={lastSong}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipPrevious />
                        </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                    <button onClick={playingButton}>
                        <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                    ) : (
                    <button onClick={playingButton}>
                        <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
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
                <div>
                    <button className={`
                        ${expand ? 'hidden' : 'flex'}
                        hover:rotate-90 
                        duration-300`} onClick={handleShrink}>
                        <IconContext.Provider value={{size:"2em",color: "white"}}>
                            <GoTriangleRight/>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
            {/* smaller music player */}
            <div className={`
                flex 
                fixed 
                top-[35%] 
                right-0 
                ${!shrink ? 'translate-x-20' : ''}
                duration-300`}>
                <div className={`
                w-[160px] 
                h-[60px] 
                flex 
                justify-between 
                items-center 
                mr-[-100px]
                hover:mr-[-10px]
                duration-300
                bg-gray-800
                rounded-lg`}>
                    <div className='flex justify-between items-center w-full text-white'>
                        {!isPlaying ? (
                        <button className="pl-2" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>
                        ) : (
                        <button className="pl-2" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                        )}
                        <button className="pr-4" onClick={handleShrink}>
                            <IconContext.Provider value={{ size: "2.5em", color: "white" }}>
                                <GoTriangleRight />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;