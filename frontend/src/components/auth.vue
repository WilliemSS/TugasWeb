<template>
    <div>
        <table class="table is-striped is-bordered ">
          <tbody>
          <tr>
            <th class="pt-3">Username</th>
            <th>
              <div class="field">                
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Username"
                    v-model="username"
                  />
                </div>
              </div>                 
            </th>
          </tr>
          <tr>
            <th class="pt-3">Password</th>
            <th>
              <div class="field">                
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
              </div>                 
            </th>
          </tr>
        </tbody>
        </table>

        <div class="control">
          <button class="button is-success " @click="simpan">Login</button> 
          <button class="button is-danger" @click="hapus">Delete</button>         
        </div>   
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            username: '',
            password: ''
        }
    },
    created: function() {
        this.username = localStorage.getItem('usr')
        this.password = localStorage.getItem('pwd')
    },
    methods: {
        simpan: function() {
            localStorage.setItem('usr',this.username)
            localStorage.setItem('pwd',this.password)
        },
        hapus: function() {
            localStorage.removeItem('usr')
            localStorage.removeItem('pwd')
            this.username = ''
            this.password = ''
        }
    }
}
</script>