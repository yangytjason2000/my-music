import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { changeSongList } from '../reducers/songListReducer';
import data from '../data/data';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";

import { useExpand } from '../context/ExpandProvider';
import AlbumRow from './RowComponent/AlbumRow';
import AddaAlbumModal from './Modal/AddAlbumModal';

const Home = () => {
    const dispatch = useDispatch();
    const [albums,setAlbums] = useState([]);
    const [albumImage,setAlbumImage] = useState([]);

    useEffect(()=>{
        if (albums.length===0){
            return;
        }
        async function fetchAlbumImage(i){
            const apiUrl =process.env.REACT_APP_API_URL+'album_image/?id='+albums[i].id;
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                });
                const imageBlob = await response.blob();
                const url = URL.createObjectURL(imageBlob);
                setAlbumImage(albumImage=>[...albumImage,url]);
            }
            catch (error) {
                console.error(error);
            }
        }
        for (let i=0;i<albums.length;i++){
            fetchAlbumImage(i)
        }
    },[albums])


    useEffect(()=>{
        async function fetchAlbumList(){
            const apiUrl =process.env.REACT_APP_API_URL+'list_album/';
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: "include",
                });
          
                if (!response.ok) {
                    throw new Error('Fetch list failed');
                }
                const responseData = await response.json();
                setAlbums(responseData['ownerAlbums']);
            } 
            catch (error) {
                console.error(error);
            }
        }
        fetchAlbumList();
    },[]);


    useEffect(()=>{
        dispatch(changeSongList(data))
    },[dispatch])
    const [addAlbumVisible,setAddAlbumVisible] = useState(false);
    const {expand} = useExpand();

    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            bg-black
            text-black`}>
            <div className={`
                w-[98%]
                h-screen
                pt-[120px]
                ${expand ? 'pb-[90px]' : ''}
                duration-300
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto">
                    <div className='grid sm:grid-cols-1 md:grid-cols-4 gap-4 my-2 mx-2'>
                        {albums.map((album,index)=>{
                            return (
                                <AlbumRow key={album.id} album={album} image={albumImage[index]}/> 
                            )})
                        }
                        <AddaAlbumModal visible={addAlbumVisible} onClose={()=>setAddAlbumVisible(false)}/>
                        <div
                            className={`
                                bg-white
                                shadow-lg 
                                container 
                                rounded-md 
                                flex 
                                mx-auto
                                justify-center 
                                items-center
                                text-center
                                h-[200px]
                            `}>
                            <span onClick={()=>setAddAlbumVisible(!addAlbumVisible)} 
                                className='hover:scale-[110%] duration-300 cursor-pointer'>
                                <IconContext.Provider value={{ size: "5em", color: "gray" }}>
                                    <MdAdd />
                                </IconContext.Provider>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;