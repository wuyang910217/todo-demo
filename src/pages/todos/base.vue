<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>Todo List</p>
      <ul>
        <li v-for="todo in todos" :key="todo.id" @click="onRemove(todo)">
          {{ todo.id }} - {{ todo.content }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Todo } from 'components/models';

export default defineComponent({
  name: 'BaseTodo',
  setup() {
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1',
      },
      {
        id: 2,
        content: 'ct2',
      },
      {
        id: 3,
        content: 'ct3',
      },
      {
        id: 4,
        content: 'ct4',
      },
      {
        id: 5,
        content: 'ct5',
      },
    ]);

    const onRemove = (todo: Todo) => {
      todos.value = todos.value.filter((t) => t.id !== todo.id);
    };

    return { todos, onRemove };
  },
});
</script>
