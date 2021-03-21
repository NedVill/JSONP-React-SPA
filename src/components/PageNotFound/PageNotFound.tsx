import React from 'react';
import { Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFound = (): JSX.Element => {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <Divider>404</Divider>
      <Title>Error, page is not found!</Title>
      <Paragraph>
        You can go to
        <Link to="/"> main page.</Link>
      </Paragraph>
    </>
  );
};

export default PageNotFound;
