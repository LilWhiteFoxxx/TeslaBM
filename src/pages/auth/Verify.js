import { useNavigate } from 'react-router-dom';

import TeslaLogo from '../../Assets/images/TeslaLogo';
import Footer from '../../components/Footer';
import ButtonAuth from '../../components/auth/ButtonAuth';

import './verify.scss';


function Verify() {
    const navigate = useNavigate();

    return (
        <div className="verify-container">
            <div className="navLogo" onClick={() => navigate('/groupproject')}>
                <TeslaLogo />
            </div>
            <div className="verify">
                <h1 className="verify-title">Verify</h1>
                <div className='verify-content'>Please check your email to complete registration
                    <div>Thanks you!</div>
                </div>
                
                <ButtonAuth
                    title={'BACK LOGIN'}
                    className={'btn'}
                    onClick={() => {
                        navigate('/groupproject/login');
                    }}
                />
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Verify;
