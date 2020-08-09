import React from 'react';
import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeachersItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeachersItemProps> = ({ teacher }) => {
  
  function handleCreateConnection() {
    api.post('connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a 
          href={`https://wa.me/${teacher.whatsapp}`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={handleCreateConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" /> Entrar em contato
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
