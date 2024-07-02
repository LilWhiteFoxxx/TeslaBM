import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TeslaLogo from '../../Assets/images/TeslaLogo';
import Footer from '../../components/Footer';
import ButtonAuth from '../../components/auth/ButtonAuth';
import { emailRegex } from '../../helpers';
import { forgotPassword } from '../../apis/user';

import './Login.scss';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email address';
        }
        if (email.trim() === '') {
            newErrors.email = 'Email is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(email);
            const res = await forgotPassword(email);
            if (res.metadata) {
                // console.log(res.metadata);
                toast.success('Success');
                navigate('/groupproject/verify');
            } else {
                toast.error(res.message);
                console.log(res.message);
            }
        }
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
                    <h1 className="sign-in-form__title">VERIFY INDENTITY</h1>
                    <div className='text-[14px] mb-4 text-[#5c5e62]'>Enter your email address linked your app account</div>
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
                            value={email}
                            id="email"
                            className="sign-in-form__input"
                            placeholder="Enter your email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="error">{errors.email}</div>
                        )}
                    </form>

                    <ButtonAuth
                        title={'SUBMIT'}
                        type={'submit'}
                        className={'sign-in-form__button'}
                        onClick={handleSubmit}
                    />
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
}
export default ForgotPassword;
