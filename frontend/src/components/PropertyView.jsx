import { PropertyList } from "../data/PropertyList";

export const PropertyView = () => {
    

    return <>
        <ul id="propertyList">
            {
                PropertyList.map((property, index) => 
                    <li key={index} className="propertyListing">
                        <p id="address">{property.address}</p>
                        <p className="mt-5">Monthly Rent: {property.monthlyRent}</p>
                        <p>Square Feet: {property.sqft}</p>
                        <p>Capacity: {property.capacity}</p>
                        <p>Rating: {property.rating}</p>
                        <p>Allows Pets: {property.allowsPets === true ? <span>Yes</span> : <span>No</span>}</p>
                        <p>Allows Smoking: {property.allowsSmoking === true ? <span>Yes</span> : <span>No</span>}</p>
                        <p>Distance: {property.distance}</p>
                    </li>)
            }
            </ul>
    </>;
};