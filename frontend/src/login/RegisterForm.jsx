import { Link } from "react-router-dom"

export const RegisterForm = ({ changeView }) => {
    return <div>
        <h2>Register</h2>
        <form class="register">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="birthday">Date of Birth</label>
            <input type="date" id="birthday" name="birthday" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="password-confirmation">Confirm Password</label>
            <input type="password" id="password-confirmation" name="password-confirmation" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
}