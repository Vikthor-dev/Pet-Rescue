<template>
<div class="login">
    <div id="loginContainer" class="container">
        <div class="row">
            <div id="leftcol" class="col-xs col-md"></div>
            <div class="col-xs-6 col-md-6">
                    <h1>This is Login Page</h1>
                          <form @submit.prevent="login">
                            <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <button id="loginButton" type="submit" class="btn btn-primary">Login</button>
                            <p id="CheckAccount" v-if="this.Check==true">{{this.errorMessage}}</p>
                            <p><router-link id="noAcc" to="signup" class="nav-link">You don't have an account ?</router-link></p>
                            <p><router-link id="frgtpass" v-if="!authenticated" to="forgot-password" class="nav-link">Forgot Password?</router-link></p>
                            </form>
            </div>
            <div id="rightcol" class="col-xs col-md"></div>
        </div>
    </div>
</div>

</template>

<script>
export default {
  data(){
    return{
      email:'',
      password:'',
      Check:false,
      errorMessage:''
    }
  },
  methods:{
    login(){
      var self = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        console.log(error);
        self.Check=true;
        self.errorMessage=error;
        });
    }
  }
}
</script>

<style lang="scss">
        h1{
            margin-top: 100px;
            color: whitesmoke;
        }
        label{
            color: whitesmoke;
        }
        #noAcc{
            color: whitesmoke;
            margin-top: 10px;
        }
        #frgtpass{
            color: whitesmoke;
        }
        #CheckAccount{
          color: red;
          font-weight: bold;
          margin-top: 10px;
        }
        @media only screen and (max-width: 620px) {
            #leftcol{
                display: none;
            }
            #rightcol{
                display: none;
            }
            #loginContainer{
              transform: translateY(-30px)
            }
            #loginButton{
              width:100%;
            }
        }
</style>

