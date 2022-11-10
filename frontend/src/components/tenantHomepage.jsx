import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const TenantHomepage = () => {
    
    return <>
        <div id="landlord">
            <button class="inbox">Inbox</button>
            <button class="middleButtons">View Listings</button>
            <button class="middleButtons">Search</button>
            <button class="middleButtons">My Profile</button>
            <button class="logout">Logout</button>
        </div>
    </>;
};