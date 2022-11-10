//Should I still import the css file here??
export const PropertiesList = ({ properties }) => {
    console.log(properties);
        return <>
            <ul id="propertyList">
            {
                properties.map((property, index) => 
                    <li key={index} className="propertyListing">
                        <span id="address">{property.address}</span>
                        <button className="propertyButtons">Edit</button>
                        <button className="propertyButtons">Remove</button>
                        <button className="propertyButtons">Promote</button>
                    </li>)
            }
            </ul>
        </>;
};
        