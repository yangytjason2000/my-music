import { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import useAddSongMutation from "../../hooks/useAddSongMutation";
import { useQueryClient } from "react-query";
import AddButton from "../Buttons/AddButton";
import useDeleteSongMutation from "../../hooks/useDeleteSongMutation";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import useUpdateSongMutation from "../../hooks/useUpdateSongMutation";

const AddSongModal = ({visible,onClose,id,song,isAdd}) => {
    const queryClient = useQueryClient();
    const [name,setName] = useState('');
    const [initialState,setInitialState] = useState(song);
    const [updateDisabled,setUpdateDisabled] = useState(true);
    const {isSignedIn} = useAuth();

    useEffect(()=>{
        if (!visible){
            return;
        }
        if (isAdd){
            setInitialState(null);
            setName('');
        }
        if (song && !isAdd){
            setInitialState({
                name: song.name || ''
            })
            setName(song.name || '');
        }
    },[visible,isAdd,song]);

    useEffect(() => {
        const checkIfFormChanged = () => {
            if (isAdd || !initialState){
                return
            }
            if (
                initialState.name !== name
            ) {
                setUpdateDisabled(false);
            } else {
                setUpdateDisabled(true);
            }
        };
        if (!isAdd){
            checkIfFormChanged();
        }
    }, [name, initialState, isAdd]);

    const handleClose = () => {
        setInitialState(null);
        setName('');
        onClose();
    }
    const addSongMutation = useAddSongMutation(handleClose,queryClient);
    const deleteSongMutation = useDeleteSongMutation(handleClose,queryClient);
    const updateSongMutation = useUpdateSongMutation(handleClose,queryClient);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isSignedIn){
            toast.error('You must sign in to add a new song!');
            onClose();
            return;
        }
        const requestBody = isAdd ? {
            name: name,
            album_id: id,
        } : {
            id: song.id,
            name: name,
            artists: [],
            album_id: id,
        };
        if (isAdd){
            addSongMutation.mutate(requestBody);
        }
        else {
            updateSongMutation.mutate(requestBody);
        }
    }

    const handleDelete = async () => {
        const requestBody = {
            id: song.id,
            album_id: id,
        }
        deleteSongMutation.mutate(requestBody);
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
                        {isAdd ? 'Create your song' : 'Modify your song'}
                    </h2>
                    <Input 
                        id={isAdd ? 'newsongname' : 'songname'} 
                        name='Song name' 
                        type='text' 
                        autoComplete="on" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="flex justify-end items-end gap-2">
                    {isAdd ?
                    <AddButton disabled={name===''} text="Add" handleSubmit={handleSubmit}/>
                        :
                    <AddButton disabled={updateDisabled} text="Update" handleSubmit={handleSubmit}/>
                    }
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

export default AddSongModal;