import './login.css'
import { Link } from 'react-router-dom'

export const LoginForm = ({ changeView }) => {
   return <div>
        <h2>Login</h2>
        <form className="login-form">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
            <br/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <br/>
            <button type="submit">Submit</button>
        </form>
        <p>New user? <Link to='/register'>Click here</Link> to Create an account</p>
    </div>
}