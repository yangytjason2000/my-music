import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateUserMutation = (queryClient) => {
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
            toast.success('Update Successed!');
            console.log(res);
            return res;
        }
        else{
            toast.error('Update Failed!')
            console.error("can't update a song");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user_info');
            queryClient.refetchQueries('user_info');
        },
        onError: (error) => {
            console.error('Failed to update user info: ',error);
        }
    }
);
};
export default useUpdateUserMutation;