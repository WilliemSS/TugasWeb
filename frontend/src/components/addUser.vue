<template>
  <div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Username"
          v-model="username"
        />
      </div>      
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
    </div>

 
    <div class="control">
      <button class="button is-success" @click="addUser">SAVE</button>
    </div>
  </div>
</template>
 
<script>
// import axios
import axios from "axios";
 
export default {
  name: "AddProduct",
  data() {
    return {
      username : '',
      password : '' 
    };
  },
  methods: {
    // Create New product
    async addUser() {
      const username = localStorage.getItem('usr');
      const password = localStorage.getItem('pwd');
      try {
        await axios.post("http://localhost:3000/user", 
        {
          username: this.username,
          password: this.password
        },
        { 
          headers: {username, password}
        });        
        this.description = "";
        this.$router.push("/user");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>