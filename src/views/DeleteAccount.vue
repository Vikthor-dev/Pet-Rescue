<template>
    <div class="delete-account">
        <div id="deleteAccContainer" class="container">
            <div class="row">
                <div class="col-xs col-md"></div>
                <div class="col-xs-5 col-md-5">
                    <h1 id="DeleteAcch1">Are you sure you want to delete your account?</h1>
                          <form @submit.prevent="deleteAccount">
                            <div class="form-group">
                            <label style="color:whitesmoke" id="deleteAccLabel" for="exampleInputPassword1"><strong>Enter Your Password To Confirm Identity</strong></label>
                            <input v-model="password" type="password"  class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <div class="alert alert-danger" role="alert">
                             <strong>This action will permenantly delete your account!</strong>
                            </div>
                            <button type="submit"  data-toggle="tooltip" data-placement="bottom" title="This Will Delete Your Account!" class="btn btn-danger">Delete Account</button>
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
      password:''
    }
  },
  methods:{
      deleteAccount(){
        var user = firebase.auth().currentUser;
        var pass=this.password;
        var credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        this.password);

        user.reauthenticateWithCredential(credential).then(function() {
            console.log("User Authenticated!");
            user.delete().then(function() {
            console.log("User Deleted!")
            }).catch(function(error) {
            console.log("Error!");
            });
        }).catch(function(error) {
            console.log("Incorrect Password!");
        });
      }
  }
}
</script>

<style scoped lang="scss">
h1{
    margin-top: 150px;
    color: whitesmoke;
    margin-bottom: 20px;
}
#deleteAccContainer{
  transform: translateY(-100px);
}

@media only screen and (max-width: 620px) {
  .left-col{
    display: none;
  }
  .right-col{
    display:none;
  }
  #DeleteAcch1{
    display: none;
  }
  #deleteAccLabel{
    font-size: 25px;
    transform: translateX(-5px);
    margin-top: 80px;
  }
}
</style>