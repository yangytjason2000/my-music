import { toast } from "react-hot-toast";
import Compressor from 'compressorjs';

const handleImageSubmit = (e, isSignedIn, setImagePreview, setImage, setImageChanged, fileRef) => {
    const file = e.target.files[0];

    if (!isSignedIn) {
        toast.error('You must sign in to upload an image!');
        if (fileRef.current) {
            fileRef.current.value = "";
        }
        return;
    }

    if (file) {
        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (validImageTypes.includes(fileType)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
            new Compressor(file, {
                quality: 0.8,
                success: (compressedResult) => {
                    setImage(compressedResult);
                },
            });
            setImageChanged(true);
        } else {
            if (fileRef.current) {
                fileRef.current.value = "";
            }
            alert("Error: Please upload a valid image file (e.g., jpg, gif, png).");
        }
    }
}

export default handleImageSubmit;