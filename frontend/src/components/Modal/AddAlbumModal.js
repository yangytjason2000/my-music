import { useEffect, useRef, useState } from "react";
import Input from "../Inputs/Input";
import ReactSwitch from 'react-switch';
import SelectInput from "../Inputs/SelectInput";
import ImageInput from "../Inputs/ImageInput";
import { useQueryClient} from "react-query";
import useAddAlbumMutation from "../../hooks/useAddAlbumMutation";
import useDeleteAlbumMutation from "../../hooks/useDeleteAlbumMutation";
import useUpdateAlbumMutation from "../../hooks/useUpdateAlbumMutation";
import AddButton from "../Buttons/AddButton";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import handleImageSubmit from "../Actions/HandleImageSubmit";

const AddAlbumModal = ({visible,onClose, album, isAdd}) => {
    const fileRef = useRef();
    const queryClient = useQueryClient();
    const [name,setName] = useState('');
    const [isPublic,setIsPublic] = useState(false);
    const [selectedList, setSelectedList] = useState([]);

    const [image,setImage] = useState(null);
    const [imagePreview,setImagePreview] = useState('');
    const [imageChanged, setImageChanged] = useState(false);

    const [initialState,setInitialState] = useState(album);
    const [updateDisabled,setUpdateDisabled] = useState(true);
    const {isSignedIn} = useAuth();

    useEffect(()=>{
        if (isAdd) {
            setInitialState(null);
            setName('');
            setIsPublic(false);
            setSelectedList([]);
            setImage(null);
            setImagePreview(null);
        }
        else if (album && !isAdd) {
            setInitialState({
                name: album?.name || '',
                isPublic: album?.isPublic || false,
                collaborators: album?.collaborators || [],
                image: album?.image || null,
            })
            setName(album?.name || '');
            setIsPublic(album?.isPublic || false);
            setSelectedList(album?.collaborators || []);
            setImage(album?.image || null);
            setImagePreview(album?.image || null);
        }
    },[album,isAdd,visible]);

    useEffect(() => {
        const checkIfFormChanged = () => {
            if (isAdd || !initialState){
                return
            }
            if (
                initialState.name !== name ||
                initialState.isPublic !== isPublic ||
                initialState.image !== image ||
                JSON.stringify(initialState.collaborators) !== JSON.stringify(selectedList)
            ) {
                setUpdateDisabled(false);
            } else {
                setUpdateDisabled(true);
            }
        };
        if (!isAdd){
            checkIfFormChanged();
        }
    }, [name, isPublic, selectedList, image, initialState, isAdd]);

    const handleClose = () => {
        setIsPublic(false);
        setName('');
        setImage(null);
        setSelectedList([]);
        setImagePreview(null);
        fileRef.current.value = "";
        onClose();
    }
    
    const addAlbumMutation = useAddAlbumMutation(handleClose,queryClient);
    const deleteAlbumMutation = useDeleteAlbumMutation(handleClose,queryClient);
    const updateAlbumMutation = useUpdateAlbumMutation(handleClose,queryClient);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isSignedIn) {
            toast.error('You must sign in to add an album!');
            onClose();
            return;
        }
        const formData = new FormData();
        if (!isAdd){
            formData.append('id',album.id);
            formData.append('change_image',imageChanged);
        }
        formData.append('name',name);
        const collaboratorsList = JSON.stringify(selectedList.map(user => user.value));
        formData.append('collaborators', collaboratorsList);
        formData.append('isPublic',isPublic);
        formData.append('image',image);
        if (!isAdd){
            updateAlbumMutation.mutate(formData);
        }
        else {
            addAlbumMutation.mutate(formData);
        }
    }
    const handleDelete = async () => {
        const formData = new FormData();
        formData.append('id',album.id);
        deleteAlbumMutation.mutate(formData);
    }

    return (
        <div className={`
            fixed 
            inset-0 
            flex 
            items-center justify-center 
            z-50 
            bg-black 
            bg-opacity-50
            duration-300
            ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-gray-700 p-8 rounded-lg overflow-auto w-[500px] ${visible? 'scale-100' : 'scale-0'} duration-300`}>
                <div className="pb-6">
                    <h2 className="text-2xl font-bold text-white inline">
                        {isAdd ? 'Create your album' : 'Modify your album'}
                    </h2>
                    <Input 
                        id={isAdd ? 'newAlbumName' : 'albumName'}
                        name='Album Name' 
                        type='text' 
                        autoComplete="on" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}/>
                    <ImageInput 
                        ref = {fileRef}
                        id={isAdd ? 'newAlbumImage' : 'albumImage'}
                        name='Album Cover'
                        type='file'
                        onChange={(e)=>handleImageSubmit(
                            e,
                            isSignedIn,
                            setImagePreview,
                            setImage,
                            setImageChanged,
                            fileRef
                        )}
                        imagePreview={imagePreview}
                    />
                    <SelectInput name='Collaborators' selectedList={selectedList} setSelectedList={setSelectedList}/>
                    <h4 className="block
                        font-serif
                        font-bold
                        pt-2
                        text-white
                    ">Public Album</h4>
                    <ReactSwitch checked={isPublic} onChange={()=>setIsPublic(!isPublic)}/>
                </div>
                <div className="flex justify-end items-end gap-2">
                    {isAdd ?
                    <AddButton disabled={name===''} text="Add" handleSubmit={handleSubmit}/>
                        :
                    <AddButton disabled={updateDisabled} text="Update" handleSubmit={handleSubmit}/>
                    }
                    {!isAdd && <button className=
                        {`rounded-md 
                        w-[80px]
                        px-2 
                        border-2 
                        border-red-500 
                        bg-red-500 
                        hover:border-red-600
                        hover:bg-red-600
                        text-white 
                        text-center`} 
                        onClick={handleDelete}>
                        Delete
                    </button>}
                    <button className=
                        {`rounded-md 
                        w-[60px]
                        px-2 
                        border-2 
                        border-red-500 
                        bg-red-500 
                        hover:border-red-600
                        hover:bg-red-600
                        text-white 
                        text-center`} 
                        onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAlbumModal;