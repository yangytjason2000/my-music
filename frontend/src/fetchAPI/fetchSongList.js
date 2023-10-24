async function fetchSongList({ queryKey }){
    const [,id] = queryKey;
    const apiUrl =process.env.REACT_APP_API_URL+'song/?album_id='+id;
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: "include",
        });
  
        if (!response.ok) {
            throw new Error('Fetch list failed');
        }
        const responseData = await response.json();
        const songList = responseData['songs'];
        return songList;
    }
    catch (error){
        console.error(error)
    }
}

export default fetchSongList;