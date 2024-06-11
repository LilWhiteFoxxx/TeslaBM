import { useState } from 'react';
import TeslaLogo from '../Assets/images/TeslaLogo';
import Footer from '../components/Footer';
import './Login.scss';

function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    return (
        <>
            <div className="login-container">
                <div className="navLogo">
                    <TeslaLogo />
                </div>
                <div className="sign-in-form">
                    <h1 className="sign-in-form__title">SIGN IN</h1>
                    <form>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="sign-in-form__input"
                            placeholder="Enter your email address"
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="sign-in-form__input"
                            placeholder="Enter your password"
                        />
                        <button type="submit" className="sign-in-form__button">
                            submit
                        </button>
                    </form>
                    <div className="sign-in-form__link">
                        <a href="/#">FORGOT EMAIL?</a> |{' '}
                        <a href="/#">FORGOT PASSWORD?</a>
                    </div>
                    <div className="sign-in-form__link">OR</div>
                    <button type="submit" className="sign-in-form__button">
                        Create account
                    </button>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}
export default Login;
