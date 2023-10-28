import toast from "react-hot-toast";

async function fetchAlbumImageById({querykey}){
    const[,id] = querykey;
    const apiUrl =process.env.REACT_APP_API_URL+'album_image/?id='+id;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: "include",
        });
  
        if (!response.ok) {
            throw new Error('Fetch album image failed');
        }
        const album = await response.blob();
        const url = album.size ? URL.createObjectURL(album): null;
        return url;
    }
    catch (error){
        toast.error("Can't fetch the album image")
        console.error(error)
    }
}

export default fetchAlbumImageById;