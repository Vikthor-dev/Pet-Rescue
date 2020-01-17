<template>
    <div class="forgot-password">
        <div class="container">
            <div class="row">
                <div class="col-xs col-md"></div>
                <div class="col-xs-5 col-md-5">
                    <h1>Forgot Your Password?</h1>
                          <form @submit.prevent="resetPassword">
                            <div class="form-group">
                            <label for="exampleInputPassword5">Enter Email adress</label>
                            <input v-model="email"  type="email"  class="form-control" id="exampleInputPassword5" placeholder="JaneDoe@gmail.com">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                            <p><router-link id="haveAcc" to="login" class="nav-link">Already have an account ?</router-link></p>
                            <p><router-link id="noAcc" to="signup" class="nav-link">You don't have an account ?</router-link></p>
                </div>
                <div class="col-xs col-md"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
        email:''
    }
  },
  methods:{
      resetPassword(){
          var auth = firebase.auth();
          var emailAddress = this.email;
          auth.sendPasswordResetEmail(emailAddress).then(function() {
               console.log("Email Sent!");
            }).catch(function(error) {
               console.log("Error");
        });
            if(this.$route.name!=='login'){
               this.$router.push(name='login')
               }
      }
  }
   
}
</script>

<style lang="scss">
h1{
    margin-top: 150px;
}
        @media only screen and (max-width: 620px) {
            #leftcol{
                display: none;
            }
            #rightcol{
                display: none;
            }
            .btn{
              width:100%;
            }
            .container{
                margin-top: 100px;
            }
            label{
                transform:translateX(-60px);
            }
        }
</style>