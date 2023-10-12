import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeSongList } from '../reducers/songListReducer';
import data from '../data/data';
const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(changeSongList(data))
    },[dispatch])
    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            bg-black
            text-slate-300`}>
            <div className={`
                w-[98%]
                h-screen
                pt-[120px]
                pb-[100px]
                overflow-auto
            `}>
                <div className="bg-[#121212] h-full">
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4'>
                        {
                        
                        <div className={`
                            bg-white
                            shadow-lg 
                            container 
                            rounded-md 
                            flex 
                            mx-auto
                            justify-center 
                            items-center
                            text-center
                            h-[100px]
                            hover:scale-[102%]
                            duration-300
                            `}>
                            something
                        </div>
                        
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;