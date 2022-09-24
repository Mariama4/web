import React from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// Импортируем мутацию DELETE_NOTE
import { DELETE_NOTE } from '../gql/mutation';
// Импортируем запросы для их повторного получения после удаления заметки
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const DeleteNote = (props) => {
  const navigate = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId,
    },
    // Повторно получаем запросы списка заметок, чтобы обновить кэш
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      // Перенаправляем пользователя на страницу "my notes"
      navigate('../mynotes');
    },
  });
  // console.log(deleteNote);
  return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);
