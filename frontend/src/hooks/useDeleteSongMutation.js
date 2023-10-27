import toast from "react-hot-toast";
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
            toast.success('Successfully delete the song!');
            console.log(res);
            return res;
        }
        else{
            toast.error('Failed to delete the song');
            console.error("can't delete the song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            queryClient.refetchQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            toast.error('Failed to delete the song');
            console.error('Failed to delete a song: ',error);
        }
    }
);
};
export default useDeleteSongMutation;