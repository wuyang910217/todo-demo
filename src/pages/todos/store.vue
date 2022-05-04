<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>Todo List</p>
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="todo.completed ? 'done' : ''"
          @click="onToggle(todo.id)"
        >
          {{ todo.id }} - {{ todo.content }}
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
  name: 'StoreTodo',
  setup() {
    const store = useTodoStore();
    const { all } = storeToRefs(store);
    const { add, remove, toggle } = store;
    const content = ref('');

    function onAdd() {
      add({ content: content.value });
      content.value = '';
    }

    return {
      todos: all,
      content,
      onAdd,
      onRemove: remove,
      onToggle: toggle,
    };
  },
});
</script>
<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
</style>
