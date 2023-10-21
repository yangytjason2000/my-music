import { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import ReactSwitch from 'react-switch';
import SelectInput from "../Inputs/SelectInput";
import FileInput from "../Inputs/FileInput";
import { useQueryClient} from "react-query";
import useAddAlbumMutation from "../../hooks/useAddAlbumMutation";
import useDeleteAlbumMutation from "../../hooks/useDeleteAlbumMutation";
import useUpdateAlbumMutation from "../../hooks/useUpdateAlbumMutation";

const AddAlbumModal = ({visible,onClose, album}) => {
    const queryClient = useQueryClient();
    const [name,setName] = useState('');
    const [isPublic,setIsPublic] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [image,setImage] = useState(null);

    useEffect(()=>{
        if (album) {
            setName(album.name || '');
            setIsPublic(album.isPublic || false);
            setSelectedList(album.collaborators || []);
            setImage(album.image || null);
        }
    },[album]);

    const handleClose = () => {
        setIsPublic(false);
        setName('');
        setImage(null);
        setSelectedList([]);
        onClose();
    }
    const addAlbumMutation = useAddAlbumMutation(handleClose,queryClient);
    const deleteAlbumMutation = useDeleteAlbumMutation(handleClose,queryClient);
    const updateAlbumMutation = useUpdateAlbumMutation(handleClose,queryClient);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (album){
            formData.append('id',album.id);
        }
        formData.append('name',name);
        const collaboratorsList = JSON.stringify(selectedList.map(user => user.value));
        formData.append('collaborators', collaboratorsList);
        formData.append('isPublic',isPublic);
        formData.append('image',image);
        if (album){
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
            <div className={`bg-gray-700 p-8 rounded-lg w-[500px] ${visible? 'scale-100' : 'scale-0'} duration-300`}>
                <div className="pb-6">
                    <h2 className="text-2xl font-bold text-white inline">
                        Create your album
                    </h2>
                    <Input 
                        id='albumname' 
                        name='Album Name' 
                        type='text' 
                        autoComplete="on" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)}/>
                    <FileInput 
                        id='albumimage'
                        name='Album Cover'
                        type='file'
                        onChange={(e)=>setImage(e.target.files[0])}
                    />
                    <SelectInput name='Collaborators' selectedList={selectedList} setSelectedList={setSelectedList}/>
                    <h4 className="block
                        text-lg
                        font-medium
                        pt-4
                        text-white
                    ">Public Album</h4>
                    <ReactSwitch checked={isPublic} onChange={()=>setIsPublic(!isPublic)}/>
                </div>
                <div className="flex justify-end items-end gap-2">
                    <button
                        disabled={name===''} 
                        className=
                        {`rounded-md 
                        w-[80px]
                        px-2 
                        border-2 
                        ${name==='' ? 'opacity-20' : ''}
                        border-green-500 
                        bg-green-500
                        hover:border-green-600
                        hover:bg-green-600
                        text-white 
                        text-center`} 
                        onClick={handleSubmit}>
                        {album ? 'Update' : 'Add'}
                    </button>
                    <button className=
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
                    </button>
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