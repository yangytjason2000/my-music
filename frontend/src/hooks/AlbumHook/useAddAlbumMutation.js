import { useMutation } from "react-query";
import toast from "react-hot-toast";

const useAddAlbumMutation = (handleClose,queryClient) => {
    const mutation =  useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'POST',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            return res;
        }
        else{
            throw new Error("Can't add a new album!");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to add new album: ',error);
        }
    }
);
    const wrappedMutation = async(formData) => {
        toast.promise(
            mutation.mutateAsync(formData),
            {
            loading: "Adding a new album...",
            success: "Successfully added a new album!",
            error: "Failed to add a new album", 
            }
        );
    }
    return wrappedMutation;
};

export default useAddAlbumMutation;