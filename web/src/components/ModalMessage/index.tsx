import React from 'react';
import './styles.css';
import { CheckSquare } from 'react-feather';
import { Link } from 'react-router-dom';
import Button from '../Button';
import background from '../../assets/images/login-background.svg';

interface modalMessageProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}

const ModalMessage: React.FC<modalMessageProps> = ({
  title,
  subtitle,
  buttonText,
  buttonHref
}) => {
  return (
    <div
      className="modal-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="modal-wrapper">
        <CheckSquare color="#04bf58" size={120} />
        <h1>{title}</h1>
        <p>{subtitle}</p>

        <Link to={buttonHref}>
          <Button text={buttonText} />
        </Link>
      </div>
    </div>
  );
};

export default ModalMessage;
