export interface IPageQuery {
  page: number;
  size: number;
}

export interface IImgMeta {
  tags: string[];
}

export interface IImg {
  id: string;
  count: number;
  dirPath: string;
  suffix: string;
  type: string;
  meta: IImgMeta;
}

export interface IPage<T> {
  data: T[];
  count: number;
  page: number;
  total: number;
}

export const getPage: (q: IPageQuery) => Promise<IPage<IImg>> = (query) =>
  fetch(`/imgs/page?page=${query.page}&size=${query.size}`, {
    cache: "force-cache",
  }).then((res) => res.json());

export const getDetails: (id: string | number) => Promise<IImg> = (id) =>
  fetch(`/imgs/details/${id}`, {
    cache: "force-cache",
  }).then((res) => res.json());
