import { useMutation } from "react-query";

const useAddSongMutation = (handleClose,queryClient) => {
    return useMutation(async (songData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'song/';
        const response = await fetch(apiUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(songData),
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            console.log(res);
            return res;
        }
        else{
            console.error("can't add new song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            queryClient.refetchQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to add new song: ',error);
        }
    }
);
};
export default useAddSongMutation;