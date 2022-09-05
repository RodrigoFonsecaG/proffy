import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import LoginContent from '../../components/LoginContent';
import Button from '../../components/Button';
import './styles.css';
import { Checkbox } from 'pretty-checkbox-react';

import { Check, Eye, EyeOff } from 'react-feather';
import ModalMessage from '../../components/ModalMessage';

const ForgotPassword = () => {
  const [modalVisibility, setModalVisibility] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setModalVisibility(true);
  }

  return (
    <>
      <LoginContent className="main-content-alt">
        <div id="login-content" className="container">
          <header className="register-header">
            <h2>Eita, esqueceu sua senha?</h2>
            <p>Não esquenta, vamos dar um jeito nisso.</p>
          </header>

          <div className="forgot-password">
            <form action="">
              <Input name="email" placeholder="E-mail" />

              <Button disabled text="Enviar" onClick={handleSubmit} />
            </form>
          </div>
        </div>
      </LoginContent>

      {modalVisibility && (
        <ModalMessage
          title="Redefinição enviada!"
          subtitle="Boa, agora é só checar o e-mail que foi enviado para você
redefinir sua senha e aproveitar os estudos."
          buttonText="Voltar ao login"
          buttonHref="/"
        />
      )}
    </>
  );
};

export default ForgotPassword;
