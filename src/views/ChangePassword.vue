<template>
    <div class="change-password">
        <div id="changePassContainer" class="container">
            <div class="row">
                <div class="col-xs col-md"></div>
                <div class="col-xs-5 col-md-5">
                    <h1 id="changePassh1">Change Your Password</h1>
                          <form @submit.prevent="changePassword">
                            <div class="form-group">
                            <label style="color:whitesmoke" for="exampleInputPassword5">Current Password</label>
                            <input v-model="password"  type="password"  class="form-control" id="exampleInputPassword5" placeholder="Password">
                            </div>
                            <div class="form-group">
                            <label style="color:whitesmoke" id="newPasswordLabel" for="exampleInputPassword1">New Password</label>
                            <input v-model="newPassword"  type="password"  class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                             <div class="form-group">
                            <label style="color:whitesmoke" id="confirmPassLabel" for="exampleInputPassword2">Confirm New Password</label>
                            <input v-model="newPasswordConfirm" type="password"  class="form-control" id="exampleInputPassword2" placeholder="Password">
                            </div>
                            <p v-if="!passwordCheck" id="password-error"><strong>Passwords Do Not Match!</strong></p>
                            <button type="submit" class="btn btn-primary">Change Password</button>
                            </form> 
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
        password:'',
        newPassword:'',
        newPasswordConfirm:'',
        passwordCheck:true
    }
  },
  methods:{
      changePassword(){

            var user = firebase.auth().currentUser;
            var pass=this.newPassword;
            if(this.newPassword==this.newPasswordConfirm){
            var credential = firebase.auth.EmailAuthProvider.credential(
            user.email, 
            this.password
        );
            }
            else{
                console.log("Passwords Do Not Match!")
                this.passwordCheck=false;
                console.log(this.passwordCheck)
            }
        user.reauthenticateWithCredential(credential).then(function() {
            console.log("User Authenticated!")
            user.updatePassword(pass).then(function() {
                console.log("Password Updated!")
                firebase.auth().signOut();
            });
        }).catch(function(error) {
            console.log("User Not Authenticated!");
        });
      }
  }
}
</script>

<style scoped lang="scss">
#password-error{
  color:red;
}
#changePassContainer{
  transform: translateY(-100px);
  }
  #changePassh1{
    margin-top: 90px;
    color: whitesmoke;
  }
@media only screen and (max-width: 620px) {
  .left-col{
    display: none;
  }
  .right-col{
    display:none;
  }
  #changePassContainer{
      transform: translateY(-170px);
  }
  #newPasswordLabel{
      transform: translateX(-70px);
  }
  #confirmPassLabel{
      transform: translateX(-40px);
  }
  #changePassh1{
    margin-top: 150px;
  }
}
</style>