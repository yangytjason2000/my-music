import { useMutation } from "react-query";
import toast from "react-hot-toast";

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
            toast.success('Successfully added a song');
            console.log(res);
            return res;
        }
        else{
            toast.error("Can't add new song")
            console.error("can't add new song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            queryClient.refetchQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            toast.error('Failed to add a new song')
            console.error('Failed to add a new song: ',error);
        }
    }
);
};
export default useAddSongMutation;