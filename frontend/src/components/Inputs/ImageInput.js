import { forwardRef } from "react";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
const ImageInput = forwardRef(({id,name, type,onChange,imagePreview},ref) => {
    const onImageClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    }
    return (
        <div> 
            <label
                className="
                    block
                    font-serif
                    font-bold
                    pt-2
                    text-white
                    pb-2
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
                        sr-only
                    `} 
                    type={type}
                />
                <div onClick={onImageClick} className="cursor-pointer">
                {imagePreview ? (
                    <img className='w-[100px]' src={imagePreview} alt="Click to choose file" />
                ) : (
                    <div className='w-[100px] h-[100px] border-2 border-dashed border-gray-500 flex justify-center items-center'>
                        <IconContext.Provider value={{ size: "2em", color: "gray" }}>
                            <MdAdd />
                        </IconContext.Provider>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
})
export default ImageInput;