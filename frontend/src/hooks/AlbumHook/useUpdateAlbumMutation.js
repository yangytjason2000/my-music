import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateAlbumMutation = (handleClose,queryClient) => {
    const mutation = useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'PUT',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            return res;
        }
        else{
            throw new Error("can't update the album");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries('albums');
            queryClient.invalidateQueries(['album_image',Number(variables.get('id'))])
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to update the album: ',error);
        }
    }
);
    const wrappedMutation = async(formData) => {
    toast.promise(
        mutation.mutateAsync(formData),
        {
            loading: "Updating the album...",
            success: "Successfully updated the album!",
            error: "Failed to updated the album", 
        }
    );
    }
    return wrappedMutation;
};

export default useUpdateAlbumMutation;