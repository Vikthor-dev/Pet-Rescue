<template>
<div id="EdituserProfileContainer" class="container">
  <div class="row">


    <div class="col-xs col-md">
     
    </div>


    <div class="col-xs-7 col-md-7">
        <h1>Edit Profile</h1>
        <form @submit.prevent="updateProfile">
            <div v-if="this.global.userType=='person'" class="form-group">
                <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" :value="this.global.userFirstName">
                    </div>
                    <div class="col-xs col-md">
                         <input type="text" class="form-control" v-model="novo_prvo_ime" placeholder="Update First Name">
                    </div>
                </div>
            </div>

            <div v-if="this.global.userType=='person'" class="form-group">
                <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" :value="this.global.userSecondName">
                    </div>
                    <div class="col-xs col-md">
                         <input type="text" class="form-control" v-model="novo_drugo_ime" placeholder="Update Second Name">
                    </div>
                </div>
            </div>

             <div v-if="this.global.userType=='shelter'" class="form-group">
                <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" :value="this.global.userShelterName">
                    </div>
                    <div class="col-xs col-md">
                         <input type="text" class="form-control" v-model="novo_ime_sklonista" placeholder="Update Shelter Name">
                    </div>
                </div>
            </div>

            <div class="form-group">
                  <div class="row">
                    <div class="col-xs col-md">
                         <input type="text" class="form-control" style="width:150px" disabled :value="convertTimestamp">
                    </div>
                    <div class="col-xs col-md">
                         <datepicker :clear-button="true" v-model="novi_datum" placeholder="Update Date"></datepicker>
                    </div>
                </div>
            </div>

            <div v-if="this.global.userType=='person'" class="form-group">
                  <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" style="width:110px" :value="this.global.userGender">
                    </div>
                    <div class="col-xs col-md">
                         <select style="width:110px"  class="form-control" v-model="spol">
                            <option :key="spol" v-for="spol in spolovi">{{spol}}</option>
                         </select>
                    </div>
                </div>
            </div>

            <div v-if="this.global.userType=='shelter'" class="form-group">
                  <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" :value="this.global.userOibSsn">
                    </div>
                    <div class="col-xs col-md">
                        <input type="text" class="form-control" v-model="novi_oib_ssn" placeholder="Update Oib/Ssn">
                    </div>
                </div>
            </div>

            <div v-if="this.global.userType=='shelter'" class="form-group">
                  <div class="row">
                    <div class="col-xs col-md">
                         <input disabled type="text" class="form-control" :value="this.global.userLocation">
                    </div>
                    <div class="col-xs col-md">
                        <input type="text" class="form-control" v-model="nova_lokacija" placeholder="Update Location">
                    </div>
                </div>
            </div>

            <div class="form-group">
                  <div class="row">
                    <div class="col-xs col-md">
                         <img :src="this.global.userPicture">
                    </div>
                    <div class="col-xs col-md">
                        
                    </div>
                </div>
            </div>

            <div class="form-group">
                 <croppa :width="150" :height="150" v-model="nova_slika" placeholder="Profile Picture" :placeholder-font-size=16 placeholder-color="#ffffff" canvas-color="#66b3ff"></croppa>
            </div>
            

            <button id="updateBtn" type="submit" class="btn btn-primary btn-lg">Update</button>
        </form>
    </div>



    <div class="col-xs col-md">
      
    </div>


  </div>
</div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';
import store from '@/store.js';
export default {
    data(){
        return{
            global:store,
            spol:'',
            spolovi:['Male','Female'],
            novo_prvo_ime:'',
            novo_drugo_ime:'',
            novo_ime_sklonista:'',
            novi_datum:'',
            novi_oib_ssn:'',
            nova_lokacija:'',
            nova_slika:null
        }
    },
    methods:{
        updateProfile(){
      var self = this;
      this.nova_slika.generateBlob(data =>{
        if(data!=null){
           let imageNamePic = this.global.userEmail + Date.now() + "Profil" + "/slikaProfila.jpg";
           var uploadTask_3 = storage.ref(imageNamePic).put(data);

  uploadTask_3.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask_3.snapshot.ref.getDownloadURL().then(function(downloadURL_3) {
      db.collection("Users").doc(self.global.userEmail).update({
                    User_dbf : self.novi_datum,
                    User_First_Name : self.novo_prvo_ime,
                    User_Second_Name : self.novo_drugo_ime,
                    User_Shelter_Name : self.novo_ime_sklonista,
                    User_Gender : self.spol,
                    User_Shelter_OIB_SSN : self.novi_oib_ssn,
                    User_Shelter_Location : self.nova_lokacija,
                    User_Picture : downloadURL_3
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            this.$router.push({ name: "user-profile" }).catch(err => console.log(err));
  });


});
        }

      });
       this.$router.push({ name: "posts" }).catch(err => console.log(err));
        }
    },
    computed:{
         convertTimestamp() {
        var d = new Date(this.global.userDbf.seconds * 1000), // Convert the passed timestamp to milliseconds
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
    },
    components:{
        Datepicker
    }
}
</script>

<style scoped lang="scss">
h1{
    color: whitesmoke;
    margin-bottom: 20px;
}
.form-group{
    margin-bottom: 50px;
    margin-top: 30px;
}
#updateBtn{
    transform: translateY(-140px);
    margin-right: 540px;
}
.form-group{
    img{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        transform: translateX(-100px);
    }
}
.croppa-container{
    margin-left: 180px;
    transform: translateY(-140px);
}
</style>