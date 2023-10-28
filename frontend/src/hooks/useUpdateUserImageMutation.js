import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateUserImageMutation = (queryClient) => {
    return useMutation(async (userImage) => {
        const apiUrl =process.env.REACT_APP_API_URL+'user_image/';
        const response = await fetch(apiUrl,{
            method: 'POST',
            body: userImage,
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
            console.error("can't update user image");
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user_image');
            queryClient.refetchQueries('user_image');
        },
        onError: (error) => {
            console.error('Failed to update user image: ',error);
        }
    }
);
};
export default useUpdateUserImageMutation;