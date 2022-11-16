import { PropertyList } from "../data/PropertyList";
import { AccountList } from "../data/AccountList";
import { Link, useParams } from 'react-router-dom';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Rating } from '../common/rating';
import { currentUser } from "../api/getterApi";

export const PropertyView = () => {
    let id = useParams().id;
    //REPLACE WITH API CALL
    let currProfile = PropertyList.find((x) =>
        x.propertyId == id
    )

    //FIXME replace with API call
    let propertyOwner = AccountList.find((x) =>
        x.accountId == currProfile.owner
    )

    return <>
        <div className="p-3 border rounded bg-light">
            {currentUser.accountType === 1 ? 
            <Link to="/search_results">
                <button className="float-start my-2">Back</button>
            </Link>
            : 
            <Link to="/my_properties">
                <button className="float-start my-2">Back</button>
            </Link>
            }
                
                <header className="text-center">
                    <h1>{currProfile.address}</h1>
                </header>
        </div>
        <div className="bg-dark">
            <div className="w-50 mx-auto">
                <img className="w-75 mx-auto d-block"
                        src="https://fecteauhomes.com/assets/image-cache/deercreek.0d4bd2b9.311b3eb9.jpg" />
            </div>
        </div>
        <div className="text-center">
            <h1><span className="badge bg-dark">Rent: ${currProfile.monthlyRent}/month</span></h1>
            <h1><span className="badge bg-dark">Owner: {propertyOwner.email}</span></h1>
        </div>
        <div className="text-center">
            <h3 className="d-inline"><span className="badge bg-dark">{currProfile.sqft} sqft</span></h3>
            <h3 className="d-inline"><span className="badge bg-dark">Capacity: {currProfile.capacity}</span></h3>
            <h3 className="d-inline"><span className="badge bg-dark">{currProfile.distance === 1 ? <span>{currProfile.distance} mile away</span>: <span>{currProfile.distance} miles away</span>}</span></h3>
        </div>
        <div className="text-center">
            <h3 className="d-inline"><span className="badge bg-dark">Rating: {/*<Rating value={currProfile.rating} />*/} {currProfile.rating}/5</span></h3>
        </div>
        <div className="text-center">
            <h5 className="d-inline"><span className="badge bg-dark">Allows Pets:  <TrueFalseLabel isTrue={currProfile.allowsPets} height="1.5em" /></span></h5>
            <h5 className="d-inline"><span className="badge bg-dark">Allows Smoking: <TrueFalseLabel isTrue={currProfile.allowsSmoking} height="1.5em" /></span></h5>
        </div>                
    </>;
};