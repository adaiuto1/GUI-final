// import React, {useState} from 'react'; //FIXME remove
import './homepage.css';

export const Homepage = () => {
    // const [count, setCount] = useState(0); //FIXME remove

    // let x = 2; FIXME this is me messing around
    // if (x === 1) {
    //     return <h1>Hello there!</h1>;
    // } else {
    //     return <h1>Goodbye there!</h1>;
    // }
    // if (param) {
    //     return <h1>Hello there!</h1>;
    // } else {
    //     return <h1>Goodbye there!</h1>;
    // }

    return <>
        {/*<div id="landlord">
            <button class="inbox">Inbox</button>
            <button class="middleButtons">View Listings</button>
            <button class="middleButtons">Search</button>
            <button class="middleButtons">My Profile</button>
            <button class="logout">Logout</button>
        </div>*/}

        <div id="tenant">
            <button class="inbox">Inbox</button>
            <button class="middleButtons">My Properties</button>
            <button class="middleButtons">My Profile</button>
            <button class="logout">Logout</button>
        </div>
    </>;
};

