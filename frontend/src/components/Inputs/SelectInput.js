import ReactSelect from "react-select";
import { useState,useEffect } from "react";
const SelectInput = ({name,selectedList,setSelectedList}) => {
    const [options,setOptions] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [query,setQuery] = useState('');

    useEffect(()=>{
        if (query===''){
            setOptions([]);
            return;
        }
        async function fetchUserList(){
            setIsLoading(true);
            try {
                const apiUrl =process.env.REACT_APP_API_URL+'user_list/?username='+query;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: "include",
                });
                const data = await response.json();
        
                if (response.ok) {
                    setOptions(data['user_list']);
                    console.log(data['user_list']);
                } else {
                    console.error('Failed to fetch options');
                }
            } 
            catch (error) {
                console.error('Error fetching options:', error);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchUserList();
    },[query])
    
    const handleOptionSelect = (selectedOption) => {
        setSelectedList(selectedOption);
    }
    return (
        <div className="z-[100]"> 
            <label
                className="
                    block
                    text-sm
                    font-medium
                    pt-2
                    text-white
                    "
                >
                    {name}
            </label>
            <div className="mt-2">
                <ReactSelect
                    value={selectedList}
                    onInputChange={(value)=>setQuery(value)}
                    onChange={handleOptionSelect}
                    isMulti
                    options={options}
                    menuPortalTarget={document.body}
                    styles={{
                        menuPortal: (base) => ({
                        ...base,
                        zIndex:9999
                        })
                    }}
                    classNames={{
                        control: () => "text-md"
                    }}
                    filterOption={()=>true}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
export default SelectInput;