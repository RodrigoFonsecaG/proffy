import React, { useState } from 'react';

import Input from '../../components/Input';
import LoginContent from '../../components/LoginContent';
import Button from '../../components/Button';
import './styles.css';
import bcrypt from 'bcryptjs';


import {  Eye, EyeOff } from 'react-feather';
import ModalMessage from '../../components/ModalMessage';
import api from '../../services/api';


const Register = () => {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  //form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      alert('Preencha todos os campos');
    } else {

   
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      console.log(hashPassword)


      api
        .post('register', {
          name,
          email,
          password: hashPassword
        })
        .then((response) => {
          setModalVisibility(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            <form action="POST">
              <Input
                name="name"
                placeholder="Nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <Input
                name="email"
                placeholder="E-mail"
                className="email-input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {passwordIcon ? (
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon={<EyeOff color="#8257E5" onClick={togglePasswordIcon} />}
                />
              ) : (
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  placeholder="Senha"
                  type="password"
                  icon={<Eye color="#9C98A6" onClick={togglePasswordIcon} />}
                />
              )}

              <Button
                type="submit"
                text="Concluir cadastro"
                onClick={handleSubmit}
              />
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
