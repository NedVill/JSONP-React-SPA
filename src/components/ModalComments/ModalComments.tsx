import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Modal, Divider } from 'antd';
import Comment from '../Comment/Comment';
import { IComment } from '../../Interfaces/Interfaces';

interface ModalProps {
  isOpen: boolean,
  comments: IComment[],
  onClose(): void,
}

@observer
export default class ModalComments extends Component<ModalProps, {}> {
  private renderComments = (): ReactNode => {
    const { comments } = this.props;

    if (comments.length > 0) {
      return comments.map((comment: IComment, idx: number) => {
        const element = (
          <div key={comment.id}>
            <Comment
              data={comment}
            />
            {(idx + 1) !== comments.length ? <Divider /> : ''}
          </div>
        );

        return element;
      });
    }

    return <p>No commets.</p>;
  };

  render(): JSX.Element {
    const { isOpen, onClose } = this.props;

    return (
      <Modal
        title="Comments"
        visible={isOpen}
        onCancel={onClose}
        onOk={onClose}
      >
        {this.renderComments()}
      </Modal>
    );
  }
}
