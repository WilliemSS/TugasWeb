<template>

  <div>
    <h1>Selamat Datang</h1>
    <div>Berikut daftar kerjaan kita:</div>
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.description}}<button @click="hapus(item.id)">X</button></li>
      
    </ul>
    <input v-model="myText"/>
    <button @click="tambahkan">Klik Me</button>
  </div>

</template>

<script >
import axios from 'axios'

export default{
  data:function (){ 
    return { 
      todos:[],
      myText:''
    }
  },
  mounted:function(){
    axios.get('http://localhost:3000/todo')
    .then(result=>{
      this.todos=result.data
    })
  },
  methods:{
   tambahkan: function (){
     let newItem={description:this.myText}
     axios.post('http://localhost:3000/todo',newItem)
     this.todos.push(newItem)
   },
   hapus:function (id) {
     axios.delete('http://localhost:3000/todo/'+id)
     
   }
  }
}

</script>

