import { useMutation } from "react-query";
import toast from "react-hot-toast";

const useAddSongMutation = (handleClose,queryClient) => {
    const mutation = useMutation(async (songData) => {
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
            return res;
        }
        else{
            throw new Error('Fail to add a new song')
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['songs',variables.album_id+'']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to add a new song: ',error);
        }
    }
);
    const wrappedMutation = async(data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: "Adding a new song...",
                success: "Successfully added a new song!",
                error: "Failed to add a new song", 
            }
        );
    }
    return wrappedMutation;
};
export default useAddSongMutation;