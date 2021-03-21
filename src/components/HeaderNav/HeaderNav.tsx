import { Menu, Layout } from 'antd';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';

interface MatchParams {
  id: string;
}

const HeaderNav = (props: RouteComponentProps<MatchParams>): JSX.Element => {
  const { location } = props;
  const { Header } = Layout;

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <NavLink to="/">Main</NavLink>
        </Menu.Item>
        <Menu.Item key="/posts">
          <NavLink to="/posts">Posts</NavLink>
        </Menu.Item>
        <Menu.Item key="/albums">
          <NavLink to="/albums">Albums</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderNav;
