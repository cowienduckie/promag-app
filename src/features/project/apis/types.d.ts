export type WorkItemDto = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  position: number;
  workColumnId: string;
};

export type WorkColumnDto = {
  id: string;
  name: string;
  position: number;
  workItems: WorkItemDto[];
};

export type ProjectDto = {
  id: string;
  name: string;
  description: string;
  workColumns: WorkColumnDto[];
};

export type ProjectMinimalDto = {
  id: string;
  name: string;
  description: string;
};

export type PagedList<T> = {
  pageIndex: number;
  pageSize: number;
  totalRecord: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
};

export type Wrapper<T> = {
  isSuccess: boolean;
  message: string;
  data?: T;
};
