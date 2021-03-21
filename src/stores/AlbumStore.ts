import { action, makeObservable, observable } from 'mobx';
import { IAlbum, IPhoto } from '../Interfaces/Interfaces';
import ApiService from '../services/ApiService';

export default class AlbumStore {
  constructor() {
    makeObservable(this, {
      albums: observable,
      photos: observable,
      isLoad: observable,
      setAlbums: action,
      setPhotos: action,
    });
  }

  private api: ApiService = new ApiService();

  public albums: IAlbum[] = [];

  public photos: IPhoto[] = [];

  public isLoad: boolean = false;

  public fetchAlbums = (): void => {
    this.api.getItems<IAlbum>('albums', 'albums').then((response) => {
      this.setAlbums(response);
    });
  };

  public fetchPhotos = (id: string): void => {
    this.isLoad = true;
    this.api.getItems<IPhoto>(`albums/${id}/photos`, 'photos').then((response) => {
      this.setPhotos(response);
      this.isLoad = false;
    });
  };

  public setAlbums = (data: IAlbum[]): void => {
    if (data.length > 0) {
      this.albums = [...data];
    }
  };

  public setPhotos = (data: IPhoto[]): void => {
    if (data.length > 0) {
      this.photos = [...data];
    }
  };
}
