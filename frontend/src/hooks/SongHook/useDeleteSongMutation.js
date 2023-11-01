import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useDeleteSongMutation = (handleClose,queryClient) => {
    const mutation = useMutation(async (songData) => {
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
            return res;
        }
        else{
            throw new Error('Fail to delete');
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to delete a song: ',error);
        }
    }
);

    const wrappedMutation = async(data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "Deleting the song...",
                success: "Successfully deleted the song!",
                error: "Failed to delete the song", 
            }
        );
    }
    return wrappedMutation;
};
export default useDeleteSongMutation;