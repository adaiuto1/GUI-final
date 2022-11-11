import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { ProfileList } from './data/ProfileList';
import TrueFalseLabel from './common/TrueFalseLabel';
function EditButton(props) {
    if (props.isMyAcct) {
        return (
            <button id="editProfileBtn">Edit Profile</button>
        )
    }
}

function ProfileView() {
    let id = useParams().id;
    //REPLACE WITH API CALL
    let currProfile = ProfileList.find((x) =>
        x.accountId == id
    )
    return (
        <>
            <div className="p-3 border rounded bg-light">
                <header className="text-center">
                    <h1>{currProfile.firstName + ' ' + currProfile.lastName}</h1>
                </header>
            </div>
            <div>
                <div className="rounded-5 w-25 m-3 bg-dark d-flex justify-content-center float-start">
                    <img className="rounded-circle w-100 m-5"
                        src="https://cdn.discordapp.com/attachments/747682640118808697/1040685789652201553/unknown.png" />
                </div>
                <div className="rounded border w-25 m-3 float-start">
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-3">Bio</h4>
                    </span>
                    <div className="p-2"
                        style={{ 'max-height': '500px', 'overflow': 'scroll' }}>
                        <p>{currProfile.bio}</p>
                    </div>
                </div>
                <div className='float-start m-3'>
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-3">Habits</h4>
                    </span>
                    <div className="mx-3">
                        <div>
                            <h5  className="float-start ">Smoker: </h5>
                            <div className="float-end">
                                <TrueFalseLabel isTrue={currProfile.smoker} height="1.5em" />
                            </div>
                        </div>
                        <div>
                            <h5 className="float-start">Pet Friendly: </h5>
                            <div className="float-end">
                                <TrueFalseLabel isTrue={currProfile.petFriendly} height="1.5em" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileView;