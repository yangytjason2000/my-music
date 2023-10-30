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
        return ownerAlbums;
    }
    catch (error){
        console.error(error)
    }
}

export default fetchAlbumList;