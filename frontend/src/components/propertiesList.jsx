//Should I still import the css file here??
export const PropertiesList = ({ properties }) => {
    console.log(properties);
        return <>
            <ul id="propertyList">
            {
                properties.map((property, index) => 
                    <li key={index} className="propertyListing">
                        <span id="address">{property.address}</span>
                        <button id="edit" className="propertyButtons">Edit</button>
                        <button id="remove" className="propertyButtons">Remove</button>
                        <button id="promote" className="propertyButtons">Promote</button>
                    </li>)
            }
            </ul>
        </>;
};
        