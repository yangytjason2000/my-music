import { useMutation } from "react-query";

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
            console.log(res);
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
            console.error('Failed to add new album: ',error);
        }
    }
);
};

export default useAddAlbumMutation;