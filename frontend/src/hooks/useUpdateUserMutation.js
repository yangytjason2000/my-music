import { useMutation } from "react-query";

const useUpdateUserMutation = (handleClose,queryClient) => {
    return useMutation(async (userInfo) => {
        const apiUrl =process.env.REACT_APP_API_URL+'user/';
        const response = await fetch(apiUrl,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            console.log(res);
            return res;
        }
        else{
            console.error("can't update a song");
        }
    }, {
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries(['user_info']);
            queryClient.refetchQueries(['user_info']);
            handleClose();
        },
        onError: (error) => {
            console.error('Failed to update user info: ',error);
        }
    }
);
};
export default useUpdateUserMutation;