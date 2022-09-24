import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { useNavigate } from 'react-router-dom';
import { GET_MY_NOTES, GET_NOTES, NEW_NOTE } from '../gql/query';

const NewNote = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    // меняем заголовок
    document.title = 'New note - Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (data) => {
      // перенаправляем на страницу заметки
      navigate(`../note/${data.newNote.id}`);
    },
  });

  return (
    <React.Fragment>
      {/* Во время загрузки мутации выдаем сообщение о загрузке */}{' '}
      {loading && <p>Loading...</p>}
      {/* В случае сбоя выдаем сообщение об ошибке*/}
      {error && <p>Error saving the note</p>}
      {/* Компонент формы, передающий мутацию данных в качестве prop */}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
