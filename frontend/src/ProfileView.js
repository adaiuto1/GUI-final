import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
function EditButton(props) {
    if (props.isMyAcct) {
        return (
            <button id="editProfileBtn">Edit Profile</button>
        )
    }
}
function ProfileView(props) {
    let currAcct = props.account;
    let isMyAcct = true;
    let traits = currAcct.tags.map((tag) => <li>{tag}</li>);
    return (
        <div>
            <header id="profileHeader">
                <Link to="/">Home</Link>
                <EditButton isMyAcct={isMyAcct}></EditButton>
            </header>
            <div id="profileContent" className="flex-box">
                <div id="nameAndPic">
                    <img id="profilePicture" src="https://f4.bcbits.com/img/a2107494950_16.jpg" />
                    <h2 id="profileNameTag">{currAcct.firstName + ' ' + currAcct.lastName}</h2>
                </div>
                <div id="bioSection">
                    <h2>Biography</h2>
                    <article>{currAcct.bio}</article>
                </div>
                <div id="tagSection">
                    <ul>{traits}</ul>
                </div>
                
            </div>
        </div>
    )
}
export default ProfileView;