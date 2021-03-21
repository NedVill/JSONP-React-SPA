import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Comment } from 'antd';
import { IComment } from '../../Interfaces/Interfaces';

interface CommentProps {
  data: IComment,
}

@observer
export default class ModalComments extends Component<CommentProps, {}> {
  render(): JSX.Element {
    const { data } = this.props;
    const { name, email, body } = data;

    return (
      <>
        <Comment
          author={(
            <>
              <i>{email}</i>
              <br />
              <b>{name}</b>
            </>
          )}
          content={`${body}`}
        />
      </>
    );
  }
}
