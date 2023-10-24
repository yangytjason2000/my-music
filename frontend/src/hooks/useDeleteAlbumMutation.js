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
            return res;
        }
        else{
            console.error("can't add new album");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('albums');
            queryClient.refetchQueries('albums');
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to delete a album: ',error);
        }
    }
);
};

export default useDeleteAlbumMutation;