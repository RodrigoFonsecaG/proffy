import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import LoginContent from '../../components/LoginContent';
import Button from '../../components/Button';
import './styles.css';
import { Checkbox } from 'pretty-checkbox-react';

import { Check, Eye, EyeOff } from 'react-feather';
import ModalMessage from '../../components/ModalMessage';

const Register = () => {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  function togglePasswordIcon(event: any) {
    const inputPassword = event.currentTarget.previousElementSibling;
    if (passwordIcon) {
      inputPassword.type = 'password';
    } else {
      inputPassword.type = 'text';
    }

    setPasswordIcon(!passwordIcon);
  }

  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setModalVisibility(true);
  }

  return (
    <>
      <LoginContent className="main-content-alt">
        <div id="login-content" className="container">
          <header className="register-header">
            <h2>Cadastro</h2>
            <p>Preencha os dados abaixo para começar.</p>
          </header>

          <div className="register">
            <form action="">
              <Input name="name" placeholder="Nome" />

              <Input
                name="email"
                placeholder="E-mail"
                className="email-input"
              />
              {passwordIcon ? (
                <Input
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon={<EyeOff color="#8257E5" onClick={togglePasswordIcon} />}
                />
              ) : (
                <Input
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon={<Eye color="#9C98A6" onClick={togglePasswordIcon} />}
                />
              )}

              <Button text="Concluir cadastro" onClick={handleSubmit} />
            </form>
          </div>
        </div>
      </LoginContent>

      {modalVisibility && (
        <ModalMessage
          title="Cadastro concluído"
          subtitle="Agora você faz parte da plataforma da Proffy.
            Tenha uma ótima experiência."
          buttonText="Fazer login"
          buttonHref="/"
        />
      )}
    </>
  );
};

export default Register;
