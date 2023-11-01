import toast from "react-hot-toast";
import { useMutation } from "react-query";

const useUpdateUserImageMutation = (queryClient) => {
    const mutation = useMutation(async (userImage) => {
        const apiUrl =process.env.REACT_APP_API_URL+'user_image/';
        const response = await fetch(apiUrl,{
            method: 'POST',
            body: userImage,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            return res;
        }
        else{
            throw new Error('Update image failed');
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('user_image');
        },
        onError: (error) => {
            console.error('Failed to update user image: ',error);
        }
    }
);
    const wrappedMutation = async(formData) => {
        toast.promise(
            mutation.mutateAsync(formData),
            {
                loading: "Updating user avatar...",
                success: "Successfully updated the user avatar!",
                error: "Failed to update the user avatar", 
            }
        );
    }
    return wrappedMutation;
};
export default useUpdateUserImageMutation;