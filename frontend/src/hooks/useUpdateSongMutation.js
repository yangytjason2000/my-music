import { useMutation } from "react-query";

const useUpdateSongMutation = (handleClose,queryClient) => {
    return useMutation(async (songData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'song/';
        const response = await fetch(apiUrl,{
            method: 'PUT',
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
            console.error("can't update a song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            queryClient.refetchQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to update a song: ',error);
        }
    }
);
};
export default useUpdateSongMutation;