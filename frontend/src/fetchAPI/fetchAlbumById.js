import toast from "react-hot-toast";

async function fetchAlbumById(id){
    const apiUrl =process.env.REACT_APP_API_URL+'album/?id='+id;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: "include",
        });
  
        if (!response.ok) {
            throw new Error('Fetch album failed');
        }
        const album = await response.json();
        return album;
    }
    catch (error){
        toast.error("Can't fetch the album")
        console.error(error)
    }
}

export default fetchAlbumById;