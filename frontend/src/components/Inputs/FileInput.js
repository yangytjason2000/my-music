import { forwardRef } from "react";

const FileInput = forwardRef(({id,name, type,onChange,imagePreview},ref) => {

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
            <div className="flex flex-row justify-start items-center">
                <input id = {id} 
                    ref = {ref}
                    onChange={onChange}
                    accept="image/*"
                    className={`
                        text-white
                        mt-2 
                        mb-4 
                        rounded-lg
                        w-[60%]
                    `} 
                    type={type}
                />
                {imagePreview && <img className='w-[80px]' src={imagePreview} alt="fileImage"/>}
            </div>
        </div>
    );
})
export default FileInput;