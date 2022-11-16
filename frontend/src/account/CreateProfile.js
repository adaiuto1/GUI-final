import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { AccountList } from '../data/AccountList';
import { ProfileList } from '../data/ProfileList';
function CreateProfile() {

    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    let [tag1, setTag1] = useState(false);
    let [tag2, setTag2] = useState(false);
    let [tag3, setTag3] = useState(false);
    let [tag4, setTag4] = useState(false);
    let [tag5, setTag5] = useState(false);
    let [tag6, setTag6] = useState(false);
    let [bio, setBio] = useState('');
    let [smoker, setSmoker] = useState(false);
    let [petFriendly, setPetFriendly] = useState(false);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let accountId = useParams().id;
    function handleToggle(x) {
        let idx = tags.indexOf(x.target.id) + 1;
        eval('setTag' + idx)(x.target.checked);
    }
    function submitProfile() {
        let newProfile = {
            firstName: firstName,
            lastName: lastName,
            accountId: accountId,
            smoker: smoker,
            petFriendly: petFriendly,
            bio: bio,
            tag1: tag1,
            tag2: tag2,
            tag3: tag3,
            tag4: tag4,
            tag5: tag5,
            tag6: tag6
        }
        console.log(newProfile);
        ProfileList.push(newProfile);
    }
    return (
        <>
            <div className="p-3 border bg-light">
                <header className="text-center">
                    <h1>Create Profile</h1>
                </header>
            </div>
            <div className="row">
                <div className="mx-auto px-0 border rounded w-25">
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-1 px-3">
                            Name </h4>
                    </span>
                    <div className="p-2">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control w-75 mb border border-dark"
                            type="text"
                            id="firstName"
                            onChange={event => setFirstName(event.target.value)}></input>
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control w-75 mb border border-dark"
                            type="text"
                            id="lastName"
                            onChange={event => setLastName(event.target.value)}></input>
                    </div>
                </div>
            </div>
            <div className="d-flex flex">
                <div className="border rounded w-50">
                    <div>
                        <span>
                            <h4 className="rounded-top bg-dark text-light p-3">I am a...</h4>
                        </span>
                    </div>
                    <div className="d-flex flex-wrap m-3">
                        {tags.map(x => {
                            return (
                                <div key={x} className="p-2">
                                    <input className="btn-check"
                                        type="checkbox"
                                        id={x}
                                        onChange={event =>
                                            handleToggle(event)
                                        } />
                                    <label className="btn btn-outline-info" htmlFor={x}>
                                        <h5>{x}</h5>
                                    </label>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className="border w-50 ">
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-3">Create a bio</h4>
                    </span>
                    <div className="p-3">
                        <textarea className="form-control mb border border-2 border-dark"
                            type="text"
                            id="bio"
                            rows="5"
                            onChange={event => setBio(event.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className="border border-dark rounded mx-5 px-3 float-end">
                <div className="form-check form-switch">
                    <input className="form-check-input"
                        type="checkbox" id="smoker"
                        onChange={event => setSmoker(event.target.checked)} />
                    <label className="form-check-label" htmlFor="smoker">I Smoke</label>
                    <br></br>
                    <input className="form-check-input"
                        type="checkbox" id="petFriendly"
                        onChange={event => setPetFriendly(event.target.checked)} />
                    <label className="form-check-label" htmlFor="petFriendly">I am Pet Friendly</label>
                </div>
            </div>
            <div className="float-end my-2 mx-4">
                <Link to={"/profile_view/" + accountId}>
                    <button className="btn border border-dark "
                        onClick={submitProfile}
                    >Complete Profile</button>
                </Link>
            </div>
        </>
    )
}
export default CreateProfile;