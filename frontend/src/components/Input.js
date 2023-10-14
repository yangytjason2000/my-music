const Input = ({id,name,type}) => {
    return (
        <div> 
            <label
                className="
                    block
                    text-sm
                    font-medium
                    pt-2
                    text-white
                    "
                    htmlFor={id}
                >
                    {name}
                </label>
            <input id = {id} 
                className={`
                    text-black 
                    p-2 
                    mt-2 
                    mb-4 
                    rounded-md 
                    w-full
                `} 
                type={type}/>
        </div>
    )
}
export default Input;