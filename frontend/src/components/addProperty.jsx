import { TextField } from "./textField";
import { useState } from "react";

export const AddProperty = ( {onPropertyAdded} ) => {

    const [ address, setAddress ] = useState(0);

    return <>
        <TextField label="Address"
                    value={address}
                    setValue={setAddress}/>

        <button onClick={ () => {
            
            setAddress(''); //FIXME is this necessary?
        }}>
            Submit
        </button>
    </>;
}