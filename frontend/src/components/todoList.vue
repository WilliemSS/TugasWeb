<template>
  <div>    
    <router-link :to="{ name: 'AddUser' }" class="button is-success">
      Add
    </router-link>    
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Description</th>          
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.description }}</td>          
          <td class="has-text-centered">
            <a
              class="button is-danger is-small"
              @click="deleteTodo(todo.id)"
              >Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";
 
export default {
  name: "todoList",
  data() {
    return {
      todos: [],
    };
  },
 
  created() {
    this.getTodo();
  },
 
  methods: {
    // Get All Products
    async getTodo() {
      try {
        const username = localStorage.getItem('usr');
        const password = localStorage.getItem('pwd');
        const response = await axios.get("http://localhost:3000/todo", 
        { 
          headers: {username, password}
        });
        this.todos = response.data;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Product
    async deleteTodo(id) {
      try {
        const username = localStorage.getItem('usr');
        const password = localStorage.getItem('pwd');
        await axios.delete(`http://localhost:3000/todo/${id}`,
        { 
          headers: {username, password}
        });
        this.getTodo();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>