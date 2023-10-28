async function fetchUserImage(){
    const apiUrl =process.env.REACT_APP_API_URL+'user_image/';
    try {
        const imageResponse = await fetch(apiUrl, {
            method: 'GET',
            credentials: "include",
        });
  
        if (!imageResponse.ok) {
            alert('Fetch User Image Failed');
        }
        const imageBlob = await imageResponse.blob();
        const url = imageBlob.size ? URL.createObjectURL(imageBlob): null;
        return url;
    }
    catch (error){
        console.error(error)
    }
}

export default fetchUserImage;