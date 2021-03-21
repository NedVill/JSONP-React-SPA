import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  Row,
  Divider,
  List,
  Typography,
} from 'antd';
import AlbumStore from '../../stores/AlbumStore';

import './albums.scss';

@observer class AlbumList extends Component {
  private store: AlbumStore = new AlbumStore();

  componentDidMount(): void {
    this.store.fetchAlbums();
  }

  private renderAlbums = (): JSX.Element => {
    const element: JSX.Element = (
      <List
        className="photos-list"
        bordered
        dataSource={this.store.albums}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Link to={`albums/${item.id}/photos`}>
              <Typography.Text>{item.title}</Typography.Text>
            </Link>
          </List.Item>
        )}
      />
    );

    return element;
  };

  render(): JSX.Element {
    return (
      <>
        <Divider>Albums page</Divider>
        <Row gutter={16}>
          {this.renderAlbums()}
        </Row>
      </>
    );
  }
}

export default AlbumList;
