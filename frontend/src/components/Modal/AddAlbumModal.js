import { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import ReactSwitch from 'react-switch';
import SelectInput from "../Inputs/SelectInput";
import FileInput from "../Inputs/FileInput";
import { useQueryClient,useMutation } from "react-query";

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

    const addAlbumMutation = useMutation(async (formData) => {
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
    )
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const collaboratorsList = selectedList.map((user)=>{
            return user.value;
        });
        formData.append('name',name);
        formData.append('collaborators', collaboratorsList);
        formData.append('isPublic',isPublic);
        formData.append('image',image);
        addAlbumMutation.mutate(formData);
    }
    const handleDelete = async () => {
        const apiUrl =process.env.REACT_APP_API_URL+'album/';
        const formData = new FormData();
        formData.append('id',album.id);
        const response = await fetch(apiUrl,{
            method: 'DELETE',
            body: formData,
            credentials: "include",
        });
        
        if (response.ok){
            const res = await response.json();
            console.log(res);
            return res;
        }
        else{
            console.error("can't delete album");
        }
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
                        w-[60px]
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
                        Add
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