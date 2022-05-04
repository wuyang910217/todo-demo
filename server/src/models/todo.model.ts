import { model, Schema, Document } from 'mongoose';
import { Todo } from '@interfaces/todo.interface';

const todoSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const todoModel = model<Todo & Document>('Todo', todoSchema);

export default todoModel;
