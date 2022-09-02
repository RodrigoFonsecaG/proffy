import React from 'react';
import logoImg from '../../assets/images/logo.svg';
import './styles.css';

import background from '../../assets/images/login-background.svg';

interface LoginContentProps {
  children: any;
}

const LoginContent: React.FC<LoginContentProps> = ({ children }) => {
  return (
      <div id="main-content">
      <div className="side-logo-container" style={{ backgroundImage: `url(${background})` }}>
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>

        {children}
      </div>
    
  );
};

export default LoginContent;
