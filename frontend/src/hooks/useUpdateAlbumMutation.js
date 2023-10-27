import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateAlbumMutation = (handleClose,queryClient) => {
    return useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'PUT',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            toast.success("Successfully updated!");
            console.log(res);
            return res;
        }
        else{
            toast.error("Failed to update the album");
            console.error("can't update the album");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');
            queryClient.refetchQueries('albums');
            handleClose();
        },
        onError: (error) => {
            toast.error("Failed to update the album");
            console.error('Failed to update the album: ',error);
        }
    }
);
};

export default useUpdateAlbumMutation;