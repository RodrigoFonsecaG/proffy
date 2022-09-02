import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import LoginContent from '../../components/LoginContent';
import Button from '../../components/Button';
import './styles.css';
import { Checkbox } from 'pretty-checkbox-react';

import { Check, Eye, EyeOff } from 'react-feather';

const Login = () => {
  const [passwordIcon, setPasswordIcon] = useState(false);

  function togglePasswordIcon(event: any) {
    const inputPassword = event.currentTarget.previousElementSibling;
    if (passwordIcon) {
      inputPassword.type = "password"
    }
    else {
      inputPassword.type = 'text';
    }

    setPasswordIcon(!passwordIcon);
  }

  return (
    <LoginContent>
      <div id="login-content" className="container">
        <header>
          <h2>Fazer login</h2>
          <Link to="/register" className="register">
            Criar uma conta
          </Link>
        </header>

        <div className="login">
          <form action="">
            <Input name="email" placeholder="E-mail" />
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

            <div className="login-commands">
              <div className="remember-me">
                <Checkbox
                  icon={<Check className="svg" data-type="svg" />}
                  color="success"
                  shape="curve"
                  variant="fill"
                  bigger
                >
                  Lembrar-me
                </Checkbox>
              </div>

              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>

            <Button text="Entrar" disabled />
          </form>
        </div>
      </div>
    </LoginContent>
  );
};

export default Login;
