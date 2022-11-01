import {properties} from './Directory';
function PropertyResult(props){
    let property = props.property;
    console.log(property);
    return(
        <div className="flex-box searchResult">
            <img src="https://via.placeholder.com/140x100"></img>
            <h3 id="propertyName">{property.address}</h3>
            <ul>
                {property.tags.map((x) =>{
                    <li>{x}</li>
                })}
            </ul>
        </div>
    )
}
export default PropertyResult;