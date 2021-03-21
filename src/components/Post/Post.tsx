import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  Popconfirm,
  Col,
} from 'antd';
import {
  EditOutlined,
  MessageOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { IPost, ISetPost } from '../../Interfaces/Interfaces';

import './post.scss';

interface PostProps {
  data: IPost,
  onDelete(id: number): void,
  change(data: ISetPost): void,
  getComments(id: number): void,
}

@observer
export default class Post extends Component<PostProps, {}> {
  private renderCloseBtn = (): JSX.Element => {
    const currentTitle: string = 'Are you sure to delete this post?';
    const { data, onDelete } = this.props;
    const { id } = data;

    return (
      <Popconfirm
        placement="top"
        title={currentTitle}
        onConfirm={() => onDelete(id)}
        okText="Yes"
        cancelText="No"
      >
        <CloseOutlined />
      </Popconfirm>
    );
  };

  private goChange = () => {
    const { data, change } = this.props;
    const currentData = { ...data };

    change(currentData);
  };

  render(): JSX.Element {
    const { data, getComments } = this.props;
    const { title, body, id } = data;

    return (
      <Col
        className="post-column gutter-row"
        span={25}
        md={12}
        xl={6}
      >
        <Card
          className="post-item"
          title={title}
          extra={this.renderCloseBtn()}
          actions={[
            <EditOutlined
              key="change"
              onClick={this.goChange}
            />,
            <MessageOutlined
              key="comments"
              onClick={() => getComments(id)}
            />,
          ]}
        >
          <p>{body}</p>
        </Card>
      </Col>
    );
  }
}
