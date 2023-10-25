import { useMutation } from "react-query";

const useDeleteSongMutation = (handleClose,queryClient) => {
    return useMutation(async (songData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'song/';
        const response = await fetch(apiUrl,{
            method: 'DELETE',
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
            console.error("can't delete the song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            queryClient.refetchQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to delete a song: ',error);
        }
    }
);
};
export default useDeleteSongMutation;