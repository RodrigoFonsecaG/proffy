import React, {SelectHTMLAttributes} from 'react';

/* Arquivo de estilização*/
import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
/* Componente para a criação do Select do formulário */
const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) =>{
  return(
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}
export default Select;