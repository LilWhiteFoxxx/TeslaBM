import { useNavigate } from 'react-router-dom';
import TeslaLogo from '../Assets/images/TeslaLogo';
import Footer from '../components/Footer';
import './SignUp.scss';
import { useState } from 'react';


function SignUp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = () => {
        console.log(form);
        navigate('/groupproject');
    };

    return (
        <div className="sign-up-container">
            <div className="navLogo" onClick={() => navigate('/groupproject')}>
                <TeslaLogo />
            </div>
            <div className="sign-up-form">
                <h1 className="title-form">SIGN UP</h1>
                <form>
                    <div style={{ display: 'flex' }}>
                        <label>EMAIL</label>
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#a2a3a5"
                            stroke="#a2a3a5"
                            width= '24px'
                            height= '24px'
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
                        className="input-form"
                        value={form.email}
                        type="email"
                        placeholder="Enter your email address"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <label>USERNAME</label>
                    <input
                        className="input-form"
                        value={form.username}
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                    />
                    <label>PASSWORD</label>
                    <input
                        className="input-form"
                        value={form.password}
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />
                    <label>CONFIRM PASSWORD</label>
                    <input
                        className="input-form"
                        value={form.confirmPassword}
                        type="password"
                        placeholder="Enter password again"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </form>
                <button
                    type="submit"
                    className="btn-sign-up"
                    onClick={handleSubmit}
                >
                    SIGN UP
                </button>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                        marginBottom: '10px',
                        fontSize: '12  px',
                    }}
                >
                    OR
                </div>
                <button
                    type="submit"
                    className="btn-sign-up"
                    onClick={() => {
                        navigate('/groupproject/login');
                    }}
                >
                    BACK LOGIN
                </button>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default SignUp;
