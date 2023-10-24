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
                const url = imageBlob.size ? URL.createObjectURL(imageBlob): null;
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

export default fetchAlbumList;