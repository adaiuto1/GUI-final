import React from 'react';
import { AccountList } from './data/AccountList';
import { ProfileList } from './data/ProfileList';
import { PropertyList } from './data/PropertyList';
import { currentUser } from './getterApi';
import { Link } from 'react-router-dom';
//tag1: college town
//tag2: quiet neighbourhood
//tag3: community
//tag4: nearby entertainment
//tag5: public transportation
//tag6: kids
//tag7: low-crime
function PropertyResult(props) {
    let currProp = props.property;
    let tags = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
        'Public Transportation', 'Families', 'Low Crime'];
    let appliedTags = tags.filter(x =>
        currProp["tag" + (tags.indexOf(x) + 1)] == true);
    return (
        <>
            <div className="container border border-2 border-dark rounded-4 m-1"
                style={{ 'background-color': '#5b677a' }}>
                <div className="bg-dark rounded-top rounded-4"
                    style={{ 'max-width': 'max-content' }}>
                    
                    <h4 className="text-light py-2 px-4 pb-3">{currProp.address}</h4>
                </div>
                <div className="row">
                    <div className="col-3 pb-2">
                        <img className="rounded" src={currProp.img}></img>
                    </div>
                    <div className="col-5 d-flex h-25 flex-wrap mb-2">
                        {appliedTags.map(x => {
                            return (
                                <div className="bg-dark rounded-pill text-light m-1"
                                    style={{
                                        'width': 'max-content',
                                        'height': '2rem'
                                    }}>
                                    <h6 className="pt-1 px-2">{x}</h6>
                                </div>)
                        })}
                    </div>
                    <div className="col-3">
                        <div className="bg-dark rounded-pill text-light m-1"
                                style={{
                                        'width': 'max-content',
                                        'height': '1.5rem'
                                    }}>
                            <h6 className="px-2">Allows Smoking: {
                                currProp.allowsSmoking ? 'Yes' : 'No'
                            }</h6>
                        </div>
                        <div className="bg-dark rounded-pill text-light m-1"
                                style={{
                                        'width': 'max-content',
                                        'height': '1.5rem'
                                    }}>
                            <h6 className="px-2">Allows Pets: {
                                currProp.allowsPets ? 'Yes' : 'No'
                            }</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PropertyResult;