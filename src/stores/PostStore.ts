import { action, makeObservable, observable } from 'mobx';
import { IComment, IPost, ISetPost } from '../Interfaces/Interfaces';
import ApiService from '../services/ApiService';

export default class PostStore {
  constructor() {
    makeObservable(this, {
      posts: observable,
      modalFormActive: observable,
      modalCommentsActive: observable,
      isLoad: observable,
      setPosts: action,
      setComments: action,
      deletePost: action,
      getModalForm: action,
    });
  }

  private api: ApiService = new ApiService();

  public posts: IPost[] = [];

  public currentValues: ISetPost = { title: '', body: '' };

  public currentComments: IComment[] = [];

  public modalFormActive: boolean = false;

  public modalCommentsActive: boolean = false;

  public isLoad: boolean = false;

  public fetchPosts = (): void => {
    this.isLoad = true;
    this.api.getItems<IPost>('posts', 'posts').then((response) => {
      this.setPosts(response);
      this.isLoad = false;
    });
  };

  public fetchComments = (id: number): void => {
    this.api.getItems<IComment>(`posts/${id}/comments`, 'comments').then((response) => {
      this.setComments(response);
    });
  };

  public deletePost = (id: number): void => {
    this.api.deleteItem(`posts/${id}`, 'post').then(() => {
      this.fetchPosts();
    });
  };

  public addPost = (data: ISetPost): void => {
    if (data.id) {
      this.api.updateItem<IPost, ISetPost>(`posts/${data.id}`, 'post', data).then(() => this.fetchPosts());
    } else {
      this.api.addItem<IPost, ISetPost>('posts', 'post', data).then(() => this.fetchPosts());
    }
  };

  public setPosts = (data: IPost[]): void => {
    this.posts = [...data];
  };

  public setComments = (data: IComment[]): void => {
    this.currentComments = [...data];
    this.modalCommentsActive = true;
  };

  public getModalForm = (data: ISetPost): void => {
    this.currentValues = { ...data };
    this.modalFormActive = true;
  };

  public getModalComments = (id: number): void => {
    this.fetchComments(id);
  };
}
