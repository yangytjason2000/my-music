const Input = ({id,name,type, autoComplete, value, onChange}) => {
    return (
        <div> 
            <label
                className="
                    block
                    font-serif
                    font-bold
                    pt-2
                    text-white
                    "
                    htmlFor={id}
                >
                    {name}
                </label>
            <input id = {id} 
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
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