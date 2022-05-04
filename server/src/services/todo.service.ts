import { CreateTodoDto } from '@dtos/todo.dto';
import { HttpException } from '@exceptions/HttpException';
import { Todo } from '@interfaces/todo.interface';
import todoModel from '@models/todo.model';
import { isEmpty } from '@utils/util';

class TodoService {
  public todos = todoModel;

  public async findAll(): Promise<Todo[]> {
    const list: Todo[] = await this.todos.find();
    return list;
  }

  public async addTodo(data: CreateTodoDto): Promise<Todo> {
    if (isEmpty(data)) throw new HttpException(400, 'invilid data');

    const todo: Todo = await this.todos.create({ ...data, completed: false });

    return todo;
  }

  public async deleteTodo(id: string): Promise<Todo> {
    const todo: Todo = await this.todos.findByIdAndDelete(id);
    if (!todo) throw new HttpException(409, 'not find todo');

    return todo;
  }

  public async updateTodoStatus(id: string): Promise<Todo> {
    const todo: Todo = await this.todos.findById(id);
    if (!todo) throw new HttpException(409, 'not find todo');
    todo.completed = !todo.completed;
    await this.todos.updateOne(todo);

    return todo;
  }
}

export default TodoService;
