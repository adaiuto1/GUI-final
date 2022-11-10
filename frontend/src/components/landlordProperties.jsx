import { useState, useEffect } from "react";
import { PropertiesList } from "./propertiesList";
import { PropertyList } from "../models/propertyList";
import { LandlordProperty } from "../models/landlordProperty";

export const LandlordProperties = () => {
    const temp = [
        //new PropertyList
    ];
    
    const [ propertyList, setPropertyList ] = useState(undefined);

    const addProperty = delta => setPropertyList({ ...propertyList, ...delta});
    
    return <>
        sdas
        <PropertiesList properties={propertyList.properties} />
    </>;
}