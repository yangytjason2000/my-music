const ProfileInput = ({id,name,type, autoComplete, value, onChange}) => {
    return (
        <div> 
            <label
                className="
                    block
                    pt-2
                    font-bold
                    text-white
                    font-serif
                    "
                    htmlFor={id}
                >
                    {name}
            </label>
            <input id = {id} 
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                readOnly
                className={`
                bg-[#121212]
                    border
                    border-white
                    focus:border-3
                    focus:outline-none
                    text-white 
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
export default ProfileInput;