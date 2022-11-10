export const PropertiesList = ({properties}) => {
    return <>
        <ul>
            {
                properties.map((property, index) => {
                    return (<li key={index}>
                        <span id="address">{property.address}</span>
                        <span id="edit"><button>Edit</button></span>
                        <span id="remove"><button>Remove</button></span>
                        <span id="promote"><button>Promote</button></span>
                    </li>)}
                )
            }
        </ul>
    </>;
}