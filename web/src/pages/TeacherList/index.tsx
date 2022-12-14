import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, { Teacher} from '../../components/TeacherItem';
import api from '../../services/api';

/* Arquivo de estilização */
import './styles.css';


function TeacherList(){

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const[teachers, setTeachers] = useState([]);

  /* Consultar a api (banco de dados) para buscar 
  * professor de acordo com a materia, dia e horário
  */
  async function searchTeachers(e: FormEvent){
    e.preventDefault();
    
    const response = await api.get('classes', {params: {
      subject,
      week_day,
      time
    }});

    setTeachers(response.data);
  }

  return(
    <div id="page-teacher-list" className="container">
      {/* Componente PageHeader (Header da página) 
      *** title (props)
      */}
      <PageHeader title="Estes são os proffys disponíveis.">

        {/*Passando o formulário como props.children(
          <PageHeader>FORMULÁRIO</PageHeader>
          ) para o componente PageHeader*/}
        <form id="search-teachers" onSubmit={searchTeachers}>
          
          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={(e)=>{setSubject(e.target.value)}}
            options={[
              {value: 'Artes', label: 'Artes'},
              {value: 'Biologia', label: 'Biologia'},
              {value: 'Ciência', label: 'Ciência'},
              {value: 'Educação Física', label: 'Educação Física'},
              {value: 'Física', label: 'Física'},
              {value: 'Geografia', label: 'Geografia'},
              {value: 'História', label: 'História'},
              {value: 'Matemática', label: 'Matemática'},
              {value: 'Português', label: 'Português'},
              {value: 'Química', label: 'Química'},
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana"
            value={week_day}
            onChange={(e)=>{setWeekDay(e.target.value)}}
            options={[
              {value: '0', label: 'Domingo'},
              {value: '1', label: 'Segunda-feira'},
              {value: '2', label: 'Terça-feira'},
              {value: '3 ', label: 'Quarta-feira'},
              {value: '4', label: 'Quinta-feira'},
              {value: '5', label: 'Sexta-feira'},
              {value: '6', label: 'Sábado'},
            ]}
          />

          {/* Utilizando componente Input, para representar os inputs do formulário*/}
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={(e)=>{setTime(e.target.value)}}
          />
          {/* Adicionando botão para o submit do formulário */}
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      
      {/* Listagem dos proffys */}
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>;
        })}
      </main>
    </div>
  )
}

export default TeacherList;