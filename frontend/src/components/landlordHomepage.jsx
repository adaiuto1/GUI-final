import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const LandlordHomepage = () => {
    
    return <>
        <div>
            <Link to="/inbox"><button class="inbox">Inbox</button></Link>
            <Link to="/properties"><button class="middleButtons">My Properties</button></Link>
            <Link to="/profile"><button class="middleButtons">My Profile</button></Link>
            <Link to="/"><button class="logout">Logout</button></Link>
        </div>
    </>;
};

