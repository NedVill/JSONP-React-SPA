import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Row, Divider, Button } from 'antd';
import { IPost, ISetPost } from '../../Interfaces/Interfaces';
import PostStore from '../../stores/PostStore';
import Post from '../Post/Post';
import ModalFormPost from '../ModalFormPost/ModalFormPost';
import ModalComments from '../ModalComments/ModalComments';
import Spinner from '../Spinner/Spinner';

import './posts.scss';

@observer class Posts extends Component {
  private store: PostStore = new PostStore();

  componentDidMount(): void {
    this.store.fetchPosts();
  }

  private onDeletePost = (id: number): void => {
    this.store.deletePost(id);
  };

  private renderPosts = (): JSX.Element[] => {
    const { posts } = this.store;
    let elems: JSX.Element[];

    if (Object.values(posts).length === 0) {
      elems = [<p>No results</p>];
    } else {
      elems = posts.map((item: IPost) => {
        const elem: JSX.Element = (
          <Post
            key={item.id}
            data={item}
            onDelete={this.onDeletePost}
            change={this.store.getModalForm}
            getComments={this.store.getModalComments}
          />
        );

        return elem;
      });
    }

    return elems;
  };

  private callModal = (): void => {
    const data: ISetPost = { title: '', body: '' };
    this.store.getModalForm(data);
  };

  private closeModalForm = (): void => {
    this.store.modalFormActive = !this.store.modalFormActive;
  };

  private closeModalComments = (): void => {
    this.store.modalCommentsActive = !this.store.modalCommentsActive;
  };

  private renderDevider = (idx: number): JSX.Element => {
    const length: number = this.store.posts.length - 1;
    const correctIdx: number = idx + 1;

    return (
      <>
        {correctIdx % 4 === 0 && length !== idx ? <Divider /> : ''}
      </>
    );
  };

  render(): JSX.Element {
    return (
      <>
        <Divider>Posts page</Divider>
        <div className="posts-bar">
          <Button
            onClick={this.callModal}
            type="primary"
          >
            Add a new post
          </Button>
        </div>
        <Row gutter={16}>
          {this.store.isLoad ? <Spinner /> : this.renderPosts()}
        </Row>
        <ModalFormPost
          onSubmit={this.store.addPost}
          onClose={this.closeModalForm}
          isOpen={this.store.modalFormActive}
          values={this.store.currentValues}
        />
        <ModalComments
          onClose={this.closeModalComments}
          isOpen={this.store.modalCommentsActive}
          comments={this.store.currentComments}
        />
      </>
    );
  }
}

export default Posts;
