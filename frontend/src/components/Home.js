import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { changeSongList } from '../reducers/songListReducer';
import data from '../data/data';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";

import { useExpand } from '../context/ExpandProvider';
import AlbumRow from './RowComponent/AlbumRow';
import AddAlbumModal from './Modal/AddAlbumModal';
import { useQuery} from 'react-query';

const Home = () => {
    const dispatch = useDispatch();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const {data: albums = []} = useQuery('albums',fetchAlbumList);
    useEffect(()=>{
        dispatch(changeSongList(data))
    },[dispatch])
    const [addAlbumVisible,setAddAlbumVisible] = useState(false);
    const [changeAlbumVisible,setChangeAlbumVisible] = useState(false);
    const {expand} = useExpand();

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
            const ownerAlbums = responseData['ownerAlbums'];
            
            const albumImagesPromises = ownerAlbums.map(async(album)=>{
                const fetch_image_url = process.env.REACT_APP_API_URL + 'album_image/?id=' + album.id;
                try {
                    const imageResponse = await fetch(fetch_image_url,{
                        method: 'GET',
                        credentials: 'include'
                    });
                    const imageBlob = await imageResponse.blob();
                    const url = imageBlob.size ? URL.createObjectURL(imageBlob) : null;
                    return { ...album, image: url };
                } catch (error) {
                    console.error(error);
                    return album;
                }
            })
            const albumWithImages = await Promise.all(albumImagesPromises);
            return albumWithImages;
        }
        catch (error){
            console.error(error)
        }
    }
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
                                <AlbumRow 
                                    key={index} 
                                    album={album} 
                                    setAlbumDetailsVisible={setChangeAlbumVisible}
                                    setSelectedAlbum={setSelectedAlbum}/> 
                            )})
                        }
                        {changeAlbumVisible && 
                            <AddAlbumModal visible={changeAlbumVisible} onClose={()=>setChangeAlbumVisible(false)} album={selectedAlbum}/>
                        }
                        {addAlbumVisible && <AddAlbumModal visible={addAlbumVisible} onClose={()=>setAddAlbumVisible(false)}/>}

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