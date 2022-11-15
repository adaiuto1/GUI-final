import { Link } from "react-router-dom"
import { useState } from "react";
import { createUser } from "../api/userApi";

export const RegisterForm = ({ changeView }) => {
    const [name, setName] = useState('Your Name');
    const [birthday, setBirthday] = useState('00/00/0000');
    const [username, setUsername] = useState('username');
    const [password, setPassword] = useState('password');

    return <div>
        <h2>Register</h2>
        <form className="register">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name"  onChange={ event => setName(event.target.value) }/>
            <label htmlFor="birthday">Date of Birth</label>
            <input type="date" id="birthday" name="birthday" onChange={ event => setBirthday(event.target.value) }/>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={ event => setUsername(event.target.value) }/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={ event => setPassword(event.target.value) } />
            <label htmlFor="password-confirmation">Confirm Password</label>
            <input type="password" id="password-confirmation" name="password-confirmation" />
            <button type="button" className="btn btn-primary" onClick={ () => {
                createUser({ name: name, birthday: birthday, username: username, password: password })
            } } >Submit</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
}