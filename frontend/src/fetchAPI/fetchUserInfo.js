async function fetchUserInfo(){
    const apiUrl =process.env.REACT_APP_API_URL+'user/';
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            credentials: "include",
        });
  
        if (!response.ok) {
            alert('Fetch User Info Failed')
        }
        const responseData = await response.json();
        const songList = responseData['songs'];
        return songList;
    }
    catch (error){
        console.error(error)
    }
}

export default fetchUserInfo;