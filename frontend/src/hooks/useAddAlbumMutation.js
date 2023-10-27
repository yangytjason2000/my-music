import { useMutation } from "react-query";
import toast from "react-hot-toast";

const useAddAlbumMutation = (handleClose,queryClient) => {
    return useMutation(async (formData) => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const response = await fetch(apiUrl,{
            method: 'POST',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            toast.success('Succesfully added an album!');
            console.log(res);
            return res;
        }
        else{
            toast.error("Failed to add a new album");
            console.error("can't add new album");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');
            queryClient.refetchQueries('albums');
            handleClose();
        },
        onError: (error) => {
            toast.error("Failed to add a new album");
            console.error('Failed to add new album: ',error);
        }
    }
);
};

export default useAddAlbumMutation;