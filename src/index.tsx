import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HeaderNav from './components/HeaderNav/HeaderNav';
import Posts from './components/Posts/Posts';
import Main from './components/Main/Main';
import AlbumList from './components/AlbumList/AlbumList';
import PhotoList from './components/PhotoList/PhotoList';
import PageNotFound from './components/PageNotFound/PageNotFound';

import 'antd/dist/antd.css';
import './main.scss';

const App = (): JSX.Element => {
  const { Content } = Layout;

  return (
    <div className="App">
      <Layout className="layout">
        <Router>
          <Route component={HeaderNav} />
          <Content className="content_page">
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/posts" component={Posts} />
              <Route path="/albums" component={AlbumList} exact />
              <Route path="/albums/:id/photos" component={PhotoList} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Content>
        </Router>
      </Layout>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
