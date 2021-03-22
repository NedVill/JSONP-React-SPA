import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import {
  Row,
  Col,
  Divider,
  Image,
} from 'antd';
import Spinner from '../Spinner/Spinner';
import AlbumStore from '../../stores/AlbumStore';
import { IPhoto } from '../../Interfaces/Interfaces';

import './photos.scss';

interface MatchParams {
  id: string;
}

@observer class PhotoList extends Component<RouteComponentProps<MatchParams>, {}> {
  private store: AlbumStore = new AlbumStore();

  componentDidMount(): void {
    const { match } = this.props;
    this.store.fetchPhotos(match.params.id);
  }

  private renderPhotos = (): ReactNode => {
    const { photos } = this.store;

    if (Object.values(photos).length > 0) {
      return photos.map((item: IPhoto) => {
        const elem = (
          <Col
            key={item.id}
            className="gutter-row"
            span={12}
            md={6}
            xl={4}
          >
            <Image
              key={item.id}
              width="100%"
              src={item.thumbnailUrl}
            />
          </Col>
        );

        return elem;
      });
    }

    return <p>No results</p>;
  };

  render(): JSX.Element {
    return (
      <>
        <Divider>Photos page</Divider>
        <Row gutter={6}>
          {this.store.isLoad ? <Spinner /> : this.renderPhotos()}
        </Row>
      </>
    );
  }
}

export default PhotoList;
