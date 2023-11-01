import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateSongMutation = (handleClose,queryClient) => {
    const mutation = useMutation(async (songData) => {
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
            return res;
        }
        else{
            throw new Error('Failed to update');
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to update a song: ',error);
        }
    }
);

    const wrappedMutation = async(data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "Updating the song...",
                success: "Successfully updated the song!",
                error: "Failed to update the song", 
            }
        );
    }
    return wrappedMutation;
};
export default useUpdateSongMutation;