import { defineStore } from 'pinia';
import { Todo } from 'components/models';
import { api } from 'boot/axios';

interface TodoList {
  list: Todo[];
  idx: number; // current id
  todos: Todo[];
}

export const useTodoStore = defineStore('todo', {
  state: (): TodoList => ({
    list: [{ id: 0, content: '测试1', completed: false }],
    idx: 1,
    todos: [],
  }),
  getters: {
    all: (state) => state.list,
    allTodo: (state) => state.todos,
  },
  actions: {
    // local store
    add(todo: Pick<Todo, 'content'>) {
      this.list.push({ ...todo, id: this.idx, completed: false });
      this.idx++;
    },
    remove(id: number) {
      this.list = this.list.filter((todo) => todo.id !== id);
    },
    toggle(id: number) {
      this.list.forEach((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
    },
    // from api
    async fetchTodos() {
      const data: Todo[] = await api.get('/');
      this.todos = data;
    },
    async addTodo(todo: Pick<Todo, 'content'>) {
      await api.post('/', todo);
      this.fetchTodos();
    },
    async deleteTodo(id: string) {
      await api.delete(`/${id}`);
      this.fetchTodos();
    },
    async updateTodoStatus(id: string) {
      await api.post(`/status/${id}`);
      this.fetchTodos();
    },
  },
});
