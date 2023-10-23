import data from "../../data/trackicons";
import { IconContext } from "react-icons";

const TrackLabel = ({track}) => {
    const TrackIcon = data[track.type];
    return (
        <div className='flex flex-row justify-center items-center'>
            <span>
                <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
                    <TrackIcon />
                </IconContext.Provider>
            </span>
            <div className="pl-2">
            <h2 className='text-black font-serif font-bold text-md'>
                {track.name}
            </h2>
            </div>
        </div>
    );
}

export default TrackLabel;