<template>
<div id="userProfileContainer" class="container">
  <div class="row">


    <div class="col-xs col-md">
      <img id="userPictureId" :src="this.userPicture" alt="User Picture">
    </div>


    <div class="col-xs-7 col-md-7">

      
      <label><h1 id="userProfile1h1">USER PROFILE</h1></label>
      

      <div class="form-group">
        <input disabled type="text" class="form-control" :value="userType">
      </div>

      <div class="form-group">
        <input disabled type="text" class="form-control" :value="userEmail">
      </div>

      <div v-if="this.userType=='person'" class="form-group">
          <input disabled type="text" class="form-control" :value="userFirstName">
      </div>

      <div v-if="this.userType=='person'" class="form-group">
        <input disabled type="text" class="form-control" :value="userSecondName">
      </div>

       <div v-if="this.userType=='shelter'" class="form-group">
        <input disabled type="text" class="form-control" :value="userShelterName">
      </div>

      <div class="form-group">
        <input disabled type="text" class="form-control" :value="convertTimestamp">
      </div>

      <div v-if="this.userType=='person'" class="form-group">
        <input disabled type="text" class="form-control" :value="userGender">
      </div>

       <div v-if="this.userType=='shelter'" class="form-group">
        <input disabled type="text" class="form-control" :value="userOibSsn">
      </div>

       <div v-if="this.userType=='shelter'" class="form-group">
        <input disabled type="text" class="form-control" :value="userLocation">
      </div>

      <div class="form-group">
        <router-link id="eidtProfileBtn" to="edit-profile" class="btn btn-danger btn-md">Edit Profile</router-link>
      </div>
    
    </div>




  </div>
</div>

</template>

<script>
import store from '@/store.js';
export default {
    data(){
        return store;
    },
    methods:{

    },
    computed:{
         convertTimestamp() {
        var d = new Date(this.userDbf.seconds * 1000), // Convert the passed timestamp to milliseconds
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
        dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    // ie: 2014-03-24, 3:00 PM
    time = dd + '-' + mm + '-' + yyyy;
    return time;
}
    }
}
</script>

<style scoped lang="scss">
.form-group{
  margin-right: 280px;
  transform: translateY(-80px);
  margin-bottom: 30px;
}
h1{
    color: whitesmoke;
    margin-right: 300px;
    transform: translateY(-100px);
}
h3{
    color: whitesmoke;
}
#userPictureId{
  border-radius: 10%;
  transform: translateY(80px);
}
#eidtProfileBtn{
  transform: translateX(-120px);
}
@media only screen and (max-width: 620px) {
  .left-col{
    display: none;
  }
  .right-col{
    display:none;
  }
  h1{
    color: whitesmoke;
    margin-bottom: 30px;
    transform: translateX(-120px);
    font-size: 30px;
}
h3{
    color: whitesmoke;
    font-size: 20px;
}
}
</style>