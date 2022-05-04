<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>Todo List</p>
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="{ done: todo.completed }"
          @click="onToggle(todo.id)"
        >
          {{ todo.content }}
          <button @click.stop="onRemove(todo.id)">删除</button>
        </li>
      </ul>
      <div>
        <input v-model.trim="content" />
        <button @click="onAdd">添加</button>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';
import { useTodoStore } from '../../stores/todo';

export default defineComponent({
  name: 'MongoTodo',
  setup() {
    const store = useTodoStore();
    const { allTodo } = storeToRefs(store);
    const { fetchTodos, addTodo, deleteTodo, updateTodoStatus } = store;
    const content = ref('');

    fetchTodos();

    function onAdd() {
      addTodo({ content: content.value });
      content.value = '';
    }

    return {
      todos: allTodo,
      content,
      onAdd,
      onRemove: deleteTodo,
      onToggle: updateTodoStatus,
    };
  },
});
</script>
<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
