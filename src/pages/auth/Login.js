import { useState } from 'react';
import TeslaLogo from '../../Assets/images/TeslaLogo';
import Footer from '../../components/Footer';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import InputAuth from '../../components/auth/InputAuth';
import ButtonAuth from '../../components/auth/ButtonAuth';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        console.log(form);
        navigate('/groupproject');
    };

    return (
        <>
            <div className="login-container">
                <div
                    className="navLogo"
                    onClick={() => navigate('/groupproject')}
                >
                    <TeslaLogo />
                </div>
                <div className="sign-in-form">
                    <h1 className="sign-in-form__title">SIGN IN</h1>
                    <form>
                        <div style={{ display: 'flex' }}>
                            <label>EMAIL</label>
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#a2a3a5"
                                stroke="#a2a3a5"
                                width="24px"
                                height="24px"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {' '}
                                    <title></title>{' '}
                                    <g id="Complete">
                                        {' '}
                                        <g id="info-circle">
                                            {' '}
                                            <g>
                                                {' '}
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    data-name="--Circle"
                                                    fill="none"
                                                    id="_--Circle"
                                                    r="10"
                                                    stroke="#000000\"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                ></circle>{' '}
                                                <line
                                                    fill="none"
                                                    stroke="#000000\"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    x1="12"
                                                    x2="12"
                                                    y1="12"
                                                    y2="16"
                                                ></line>{' '}
                                                <line
                                                    fill="none"
                                                    stroke="#000000\"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    x1="12"
                                                    x2="12"
                                                    y1="8"
                                                    y2="8"
                                                ></line>{' '}
                                            </g>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </div>

                        <input
                            type="email"
                            value={form.email}
                            id="email"
                            className="sign-in-form__input"
                            placeholder="Enter your email address"
                            onChange={(e) => {
                                setForm({ ...form, email: e.target.value });
                            }}
                        />
                        <InputAuth
                            title={'PASSWORD'}
                            type={'password'}
                            placehoder={'Enter your password'}
                            className={'sign-in-form__input'}
                            value={form.password}
                            onChange={(e) => {
                                setForm({ ...form, password: e.target.value });
                            }}
                        />
                        <ButtonAuth
                            title={'SUBMIT'}
                            type={'submit'}
                            className={'sign-in-form__button'}
                            onClick={handleSubmit}
                        />
                    </form>
                    <div className="sign-in-form__link">
                        <a href="/#">FORGOT EMAIL?</a> |{'  '}
                        <a href="/#">FORGOT PASSWORD?</a>
                    </div>
                    <div className="sign-in-form__link">OR</div>
                    <ButtonAuth
                        title={'CREATE ACCOUNT'}
                        type={'submit'}
                        className={'sign-in-form__button'}
                        onClick={() => {
                            navigate('/groupproject/signup');
                        }}
                    />
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}
export default Login;
