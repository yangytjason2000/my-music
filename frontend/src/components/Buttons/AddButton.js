const AddButton = ({disabled, text, handleSubmit}) => {
    return (
        <button 
            disabled={disabled}
            className=
            {`rounded-md 
            w-[80px]
            px-2 
            border-2 
            ${(disabled) ? 'opacity-20' : ''}
            border-green-500 
            bg-green-500
            hover:border-green-600
            hover:bg-green-600
            text-white 
            text-center`} 
            onClick={handleSubmit}>
            {text}
        </button>
    )
}

export default AddButton;