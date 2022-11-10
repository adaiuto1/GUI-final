import { properties } from './Directory';
function PropertyResult(props) {
    let property = props.property;
    return (
        <div className="searchResult flex-box">
                <img src={property.headerImg}></img>
                <h3 id="propertyName">{property.address}</h3>
                <ul className="horizontalList">
                    {property.tags.map((x) =>
                        <li>{x}</li>
                    )}
                </ul>
                <h3>Rent: {property.monthlyRent}</h3>
                <div className="resultOptions">
                    <button id="viewProperty">View</button>
                    <br></br>
                    <button id="contact">Contact</button>
                </div>

        </div>

    )
}
export default PropertyResult;