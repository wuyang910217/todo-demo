import { Router } from 'express';
import TodoController from '@controllers/todo.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateTodoDto } from '@dtos/todo.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class TodoRoute implements Routes {
  public path = '/todo';
  public router = Router();
  public todoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.todoController.getTodos);
    this.router.post(`${this.path}`, validationMiddleware(CreateTodoDto, 'body'), this.todoController.createTodo);
    this.router.post(`${this.path}/status/:id`, validationMiddleware(CreateTodoDto, 'body', true), this.todoController.updateTodoStatus);
    this.router.delete(`${this.path}/:id`, this.todoController.deleteTodo);
  }
}

export default TodoRoute;
