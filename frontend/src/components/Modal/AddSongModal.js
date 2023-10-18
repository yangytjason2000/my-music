import { useState } from "react";
import Input from "../Inputs/Input";

const AddSongModal = ({visible,onClose}) => {
    const [name,setName] = useState('');
    const handleClose = () => {
        setName('');
        onClose();
    }
    const handleSubmit = () => {
        console.log('addList');
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
                        Create your song
                    </h2>
                    <Input 
                        id='name' 
                        name='Song name' 
                        type='text' 
                        autoComplete="on" 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="flex justify-end items-end gap-2">
                    <button className=
                        {`rounded-md 
                        w-[60px]
                        px-2 
                        border-2 
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

export default AddSongModal;