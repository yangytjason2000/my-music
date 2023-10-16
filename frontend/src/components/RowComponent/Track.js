import TrackLabel from "../TrackLabel"
const Track = ({track}) => {
    return (
        <div
            key = {track.id}
            className={`
            bg-white
            shadow-lg 
            container 
            rounded-md 
            flex 
            justify-start
            items-center
            text-center
            h-[100px]
            hover:scale-[102%]
            duration-300
            cursor-pointer
            gap-2
        `}>
            <TrackLabel track={track}/>
        </div> 
    )
}

export default Track;