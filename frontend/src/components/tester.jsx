import { Link } from 'react-router-dom';
export const Tester = () => {
    
    return <>
        <Link to="/tenantHomepage">
            <button>Tenant</button>
        </Link>
        <Link to="/landlordHomepage">
            <button>Landlord</button>
        </Link>
    </>;
};
