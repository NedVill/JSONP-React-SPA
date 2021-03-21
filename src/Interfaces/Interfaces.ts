export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export interface ISetPost {
  title: string,
  body: string,
  id?: number,
}

export interface IComment {
  name: string,
  email: string,
  body: string,
  postId: number,
  id: number,
}

export interface IAlbum {
  userId: number,
  id: number,
  title: string,
}

export interface IPhoto {
  albumId: number,
  id: number,
  title: string,
  thumbnailUrl: string,
}

export interface IFetch {
  ok: boolean,
  status: string | number,
  json(): any,
}
