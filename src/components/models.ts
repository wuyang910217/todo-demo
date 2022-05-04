export interface Todo {
  id: number | string;
  content: string;
  completed?: boolean;
}

export interface Meta {
  totalCount: number;
}
