import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 90%;
`;

const NoteForm = (props) => {
  // устанавливаем состояние формы по умолчанию
  const [value, setValue] = useState({ content: props.content || '' });
  // обновляем это состояние при вводе пользователем данных
  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.action({
            variables: { ...value },
          });
        }}
      >
        <TextArea
          required
          type="text"
          name="content"
          placeholder="Note content"
          value={value.content}
          onChange={onChange}
        />
        <Button type="Submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default NoteForm;
