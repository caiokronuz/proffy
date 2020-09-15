import React from 'react';

import backgroundImg from '../../assets/images/success-background.svg';
import logoImg from '../../assets/images/logo.svg';

function LoginPage(){
    return(
        <div id="login-page">
            <div id="login-page-header">    
                <img src={logoImg} alt="Proffy"/>
                <h2>Sua plataforma de estudos online.</h2>
            </div>
        </div>
    );
}

export default LoginPage;