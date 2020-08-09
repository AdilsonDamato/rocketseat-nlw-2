import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface ScheduleProps {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleProps[]>([{
    week_day: 0, from: '', to: ''
  }]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItem);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    }).then(response => {
      alert('Cadastro realizado com sucesso.');

      history.push('/');
    }).catch(() => {
      alert('Erro no cadastro');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              label="Nome completo" 
              name="name" 
              value={name} 
              onChange={(event) => setName(event.target.value)} 
            />

            <Input 
              label="Avatar" 
              name="avatar" 
              value={avatar} 
              onChange={(event) => setAvatar(event.target.value)}
            />

            <Input 
              label="WhatsApp" 
              name="whatsapp" 
              value={whatsapp} 
              onChange={(event) => setWhatsapp(event.target.value)}
            />

            <Textarea 
              label="Biografia" 
              name="bio"
              value={bio} 
              onChange={(event) => setBio(event.target.value)} 
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              label="Matéria" 
              name="subject" 
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Física', label: 'Física' },
                { value: 'Matemática', label: 'Matemática' },
              ]}
            />

            <Input 
              label="Custo da sua hora por aula" 
              name="cost" 
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select 
                    label="Dia da semana" 
                    name="week_day" 
                    value={scheduleItem.week_day}
                    onChange={event => {
                      setScheduleItemValue(
                        index, 
                        'week_day', 
                        event.target.value
                      )
                    }}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />

                  <Input 
                    label="Das" 
                    name="from" 
                    type="time" 
                    value={scheduleItem.from}
                    onChange={event => {
                      setScheduleItemValue(
                        index, 
                        'from', 
                        event.target.value
                      )
                    }}
                  />

                  <Input 
                    label="Até" 
                    name="to" 
                    type="time" 
                    value={scheduleItem.to}
                    onChange={event => {
                      setScheduleItemValue(
                        index, 
                        'to', 
                        event.target.value
                      )
                    }}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>

          <button type="submit">
            Salvar cadastro
          </button>
        </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
