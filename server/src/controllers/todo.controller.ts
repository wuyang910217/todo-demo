import { NextFunction, Request, Response } from 'express';
import todoService from '@services/todo.service';
import { Todo } from '@interfaces/todo.interface';
import { CreateTodoDto } from '@dtos/todo.dto';

class TodoController {
  public todoService = new todoService();

  public getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list: Todo[] = await this.todoService.findAll();

      res.status(200).json({ data: list, message: 'success', code: 1 });
    } catch (error) {
      next(error);
    }
  };

  public createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo: CreateTodoDto = req.body;
      const data: Todo = await this.todoService.addTodo(todo);

      res.status(201).json({ data, message: 'success', code: 1 });
    } catch (error) {
      next(error);
    }
  };

  public updateTodoStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data: Todo = await this.todoService.updateTodoStatus(id);

      res.status(200).json({ data, message: 'success', code: 1 });
    } catch (error) {
      next(error);
    }
  };

  public deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data: Todo = await this.todoService.deleteTodo(id);

      res.status(200).json({ data, message: 'success', code: 1 });
    } catch (error) {
      next(error);
    }
  };
}

export default TodoController;
