import React from 'react';
import { Divider, Typography } from 'antd';

const Main = (): JSX.Element => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <Divider>Main page</Divider>
      <Title>Приветствую!</Title>
      <Paragraph>
        Небольшое SPA, которое выводит список постов с комментариями.
        Добавление, удаление, обновление поста.
      </Paragraph>
      <Paragraph>
        Также выводит список альбомов фотографий с возможностью посмотреть фотографии альбомов.
      </Paragraph>
    </>
  );
};

export default Main;
