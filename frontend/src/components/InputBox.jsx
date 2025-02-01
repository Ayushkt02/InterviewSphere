import { useState } from "react";


const InputBox = ({name, type, id, value, placeholder, icon, disable = false}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative w-[100%] mb-4">
            <input 
                name={name}
                type={type=="password" && passwordVisible? "text" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black "
                disabled={disable}
            />

            <i className={"fi " + icon}></i>

            {
                type=="password"?
                <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed":"") + " input-icon left-[auto] right-4 cursor-pointer"}
                    onClick={() => setPasswordVisible(curr => !curr)}
                ></i>
                :""
            }

        </div>
    )
}

export default InputBox;