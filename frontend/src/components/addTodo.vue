<template>
  <div>
    <div class="field">
      <label class="label">Todo Description</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="TODO Description"
          v-model="description"
        />
      </div>
    </div>
 
    <div class="control">
      <button class="button is-success" @click="addTodo">SAVE</button>
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
      description: "",      
    };
  },
  methods: {
    async addTodo() {
      const username = localStorage.getItem('usr');
      const password = localStorage.getItem('pwd');
      try {
        await axios.post("http://localhost:3000/todo", 
        {
          description: this.description,
        },
        { 
          headers: {username, password}
        });        
        this.description = "";
        this.$router.push("/todo");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
 
<style>
</style>