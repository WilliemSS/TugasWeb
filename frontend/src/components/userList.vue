<template>
  <div>    
    <router-link :to="{ name: 'AddUser' }" class="button is-success mt-5">
      Add New
    </router-link>    
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Username</th>          
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>                    
          <td class="has-text-centered">
            <!--
            <router-link
              :to="{ name: 'Edit', params: { id: todo.id } }"
              class="button is-info is-small"
              >Edit
            </router-link>
            -->
            <a
              class="button is-danger is-small"
              @click="deleteUser(user.id)"
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
      users: [],     
    };
  },
  mounted() {
    this.data();
  },
 
  created() {
    this.getUser();
  },
 
  methods: {
    // Get All Products
    async getUser() {
      try {
        const username = localStorage.getItem('usr');
        const password = localStorage.getItem('pwd');
        const response = await axios.get("http://localhost:3000/user", 
        { 
          headers: {username, password}
        });
        this.users = response.data;
      } catch (err) {
        console.log(err);
      }
    },
 
    // Delete Product
    async deleteUser(id) {
      try {
        const username = localStorage.getItem('usr');
        const password = localStorage.getItem('pwd');
        await axios.delete(`http://localhost:3000/user/${id}`,
        { 
          headers: {username, password}
        });
        this.getUser();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>