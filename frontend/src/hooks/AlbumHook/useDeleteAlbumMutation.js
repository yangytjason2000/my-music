import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useDeleteAlbumMutation = (handleClose,queryClient) => {
    const mutation = useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'DELETE',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            return res;
        }
        else{
            throw new Error("Can't delete the album");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');    
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to delete the album: ',error);
        }
    }
);

    const wrappedMutation = async(formData) => {
        toast.promise(
            mutation.mutateAsync(formData),
            {
            loading: "Deleting the album...",
            success: "Successfully deleted the album!",
            error: "Failed to delte the album", 
            }
        );
    }
    return wrappedMutation;
};

export default useDeleteAlbumMutation;