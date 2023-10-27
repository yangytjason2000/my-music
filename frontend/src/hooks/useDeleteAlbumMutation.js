import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useDeleteAlbumMutation = (handleClose,queryClient) => {
    return useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'DELETE',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            toast.success('Successfully delete the album!');
            return res;
        }
        else{
            toast.error('Failed to delete the album');
            console.error("can't add new album");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');
            queryClient.refetchQueries('albums');
            handleClose();
        },
        onError: (error) => {
            toast.error('Failed to delete the album');
            console.error('Failed to delete a album: ',error);
        }
    }
);
};

export default useDeleteAlbumMutation;