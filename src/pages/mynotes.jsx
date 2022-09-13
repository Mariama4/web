import React from 'react';
import { useEffect } from 'react';

const MyNotes = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'My notes - Notedly';
  });
  return (
    <div>
      <p>These are my notes</p>
    </div>
  );
};

export default MyNotes;
