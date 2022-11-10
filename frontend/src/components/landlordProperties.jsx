import { useState, useEffect } from "react";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import { PropertiesList } from "./propertiesList";
import { Landlord } from "../models/landlord";
import { LandlordProperty } from "../models/landlordProperty";
import { LandlordHomepage } from "./landlordHomepage";
import { AddProperty } from "./addProperty";

export const LandlordProperties = ({landlord}) => {
    const temp1 = [
        new LandlordProperty("6120 Bishop Blvd"),
        new LandlordProperty("6121 Bishop Blvd"),
        new LandlordProperty("6122 Bishop Blvd")
    ];
    
    const temp2 = new Landlord(0, temp1); //FIXME temporary
    
    const [ propertyList, setPropertyList ] = useState(undefined);

    const addProperty = delta => setPropertyList({ ...propertyList, ...delta});
    
    //FIXME eventually need to change temp2 to the "landlord" prop
    return <>
        <Link to="/landlordHomepage"><button id="back">Back</button></Link>

        <PropertiesList properties={temp2.properties} />

        <Link to="/addProperty"><button id="addPropertyButton">Add Property</button></Link>

    </>;
}