import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateUserMutation = (queryClient) => {
    const mutation = useMutation(async (userInfo) => {
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
            return res;
        }
        else{
            throw new Error('Update failed')
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user_info');
        },
        onError: (error) => {
            console.error('Failed to update user info: ',error);
        }
    }
);
    const wrappedMutation = async(userData) => {
        toast.promise(
            mutation.mutateAsync(userData),
            {
                loading: "Updating user info",
                success: "Successfully updated the user info!",
                error: "Failed to update the user info", 
            }
        );
    }
    return wrappedMutation;
};
export default useUpdateUserMutation;