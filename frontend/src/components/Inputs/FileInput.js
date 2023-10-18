const FileInput = ({id,name,type,onChange}) => {
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
                title="No image chosens"
                onChange={onChange}
                className={`
                    text-white
                    p-2 
                    mt-2 
                    mb-4 
                    rounded-md
                `} 
                type={type}/>
        </div>
    )
}
export default FileInput;