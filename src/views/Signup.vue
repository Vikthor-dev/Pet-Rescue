<template>
    <div class="signup">
        <div id="signupContainer" class="container">
            <div class="row">
                <div class="col-xs col-md"></div>
                <div class="col-xs-6 col-md-6">
                    <h1>This is Signup Page</h1>
                          <form @submit.prevent="signup" >
                            <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input required v-model="email" type="text"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>

                            <div class="form-group">
                            <label id="userTypeLabel" for="#">Tip Korisnika :</label>
                            <select required id="userType" class="form-control" v-model="korisnik">
                            <option :key="korisnik" v-for="korisnik in korisnici">{{korisnik}}</option>
                            </select>
                            <div v-if="this.korisnik=='person'" id="person-alert" class="alert alert-primary" role="alert">
                             User Type <strong>'person'</strong> means that you do not represent shelter and your account is primarily made for posting
                             content that will help shelters and animals in need.You are also able to adopt an animal of your own by interacting with posts posted by shelter.
                             Although you are not shelter you can try and help an animal get adopted through your posts.
                            </div>
                            <div v-if="this.korisnik=='shelter'" id="person-alert" class="alert alert-warning" role="alert">
                             User Type <strong>'shelter'</strong> means that you represent a real shelter who cares and helps animals in need
                             and your posts are animals in your shelter for whom you think can get adopted through Pet Rescue web application. Posts from shelter differ from
                             posts from user type person in a way that they provide more information about an animal like name,gender and age.
                            </div>
                            </div>

                            <div v-if="this.korisnik" class="form-group">
                              <croppa :width="150" :height="150" v-model="profile_image_data" placeholder="Profile Picture" :placeholder-font-size=16 placeholder-color="#ffffff" canvas-color="#66b3ff"></croppa>
                            </div>

                            
                            <div v-if="this.korisnik" class="form-group">
                              <label id="dob-person" v-if="this.korisnik=='person'">Date of Birth</label>
                              <label id="dob-shelter" v-if="this.korisnik=='shelter'">Date of Founding</label>
                              <datepicker :clear-button="true" v-model="dbf_korisnika"></datepicker>
                            </div>

                            <div v-if="this.korisnik=='person'" class="form-group">
                              <div class="row">
                                <div class="col-sm col-md">
                                  <label id="firstName">First Name</label>
                                  <input required v-model="first_name_korisnika" type="text" class="form-control" placeholder="Enter First Name">
                                </div>
                                <div class="col-sm col-md">
                                  <label id="secondName">Second Name</label>
                                  <input required v-model="second_name_korisnika" type="text" class="form-control" placeholder="Enter Second Name">
                                </div>
                              </div>
                            </div>

                            <div v-if="this.korisnik=='shelter'" class="form-group">
                              <label>Shelter's Name</label>
                              <input required v-model="shelter_name_korisnika" type="text" class="form-control" placeholder="Shelter's Name">
                            </div>

                            <div v-if="this.korisnik=='person'" class="form-group">
                            <label id="genderLabel">Gender</label>
                            <select required id="userType" class="form-control" v-model="gender_korisnika">
                            <option :key="gender_korisnika" v-for="gender_korisnika in genders_korisnika">{{gender_korisnika}}</option>
                            </select>
                            </div>

                            <div v-if="this.korisnik=='shelter'" class="form-group">
                              <div class="row">
                                <div class="col-sm col-md">
                                  <label id="oibSsn">Organization's OIB / SSN</label>
                                  <input required v-model=" oib_ssn_korisnika" type="text" class="form-control" placeholder="OIB / SSN">
                                </div>
                                <div class="col-sm col-md">
                                  <label id="locationLabel">Location</label>
                                  <input required v-model=" location_shelter_korisnika" type="text" class="form-control" placeholder="City,Country">
                                </div>
                              </div>
                            </div>

                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required v-model="password" type="password"  class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                             <div class="form-group">
                            <label for="exampleInputPassword2">Confirm Password</label>
                            <input required v-model="passwordConfirmation" type="password"  class="form-control" id="exampleInputPassword2" placeholder="Password">
                            <p v-if="!passwordCheck" id="password-error"><strong>Passwords Do Not Match!</strong></p>
                            </div>
                            <button id="signupButton" type="submit" class="btn btn-primary">Sign In</button>
                            </form> 
                            <p><router-link id="haveAcc" to="login" class="nav-link">Already have an account ?</router-link></p>
                </div>
                <div class="col-xs col-md"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  data(){
    return{
      email:'',
      password:'',
      passwordConfirmation:'',
      passwordCheck:true,
      korisnik:'',
      korisnici:['person','shelter'],
      dbf_korisnika:'',
      first_name_korisnika:'',
      second_name_korisnika:'',
      shelter_name_korisnika:'',
      gender_korisnika:'',
      genders_korisnika:['Male','Female'],
      oib_ssn_korisnika:'',
      location_shelter_korisnika:'',
      profile_image_data:null
    }
  },
  methods: {
    signup() {
      var self = this;
      if(this.password==this.passwordConfirmation){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {

      this.profile_image_data.generateBlob(data =>{
        if(data!=null){
           let imageNamePic = this.email + Date.now() + "Profil" + "/slikaProfila.jpg";
           var uploadTask = storage.ref(imageNamePic).put(data);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL_2) {
          let id = self.email;
          // sada moramo spremiti te dodatne podatke
          // Add a new document in collection "cities"
          db.collection("Users")
            .doc(id)
            .set({
              User_Type: self.korisnik,
              User_dbf: self.dbf_korisnika,
              User_First_Name: self.first_name_korisnika,
              User_Second_Name: self.second_name_korisnika,
              User_Shelter_Name: self.shelter_name_korisnika,
              User_Gender: self.gender_korisnika,
              User_Shelter_OIB_SSN: self.oib_ssn_korisnika,
              User_Shelter_Location: self.location_shelter_korisnika,
              User_Picture:downloadURL_2
            })
            .then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
    console.log('File available at', downloadURL_2);
  });

});
        }

      });
          // postavi podatke o korisniku
          // ovdje ide kod nakon POVRATKA UPITA za ragistraciju i to ako nije prošlo
       
        })
        .catch(error => {
          // ovdje ide kod nakon POVRATKA UPITA za ragistraciju i to ako nije prošlo
          console.error(error);
          this.errorMessage = error.message;
        });
      // ovdje se izvršava kod koji ide NAKON SLANJA UPITA za registraciju
    }
    else{
      this.passwordCheck=false;
    }
    }
  },
  components:{
    Datepicker
  }
}
</script>

<style lang="scss">
#password-error{
  color: red;
}
#haveAcc{
  color: whitesmoke;
}
#userType{
  width: 200px;
}
#userTypeLabel{
  transform: translateX(-210px);
}
#person-alert{
  margin-top: 10px;
  width: 520px;
  text-align: justify;
}
#dob-person{
  transform: translateX(-215px);
}
#dob-shelter{
  transform: translateX(-200px);
}
#firstName{
  transform: translateX(-80px);
}
#secondName{
  transform: translateX(-70px);
}
#genderLabel{
  transform: translateX(-230px);
}
#oibSsn{
  transform: translateX(-30px);
}
#locationLabel{
  transform: translateX(-90px);
}
.croppa-container{
    transform: translateX(-185px);
  }

 @media only screen and (max-width: 620px) {
            #leftcol{
                display: none;
            }
            #rightcol{
                display: none;
            }
            #haveAcc{
              margin-top: 10px;
            }
            h1{
              margin-bottom: 20px;
            }
            #signupContainer{
              transform: translateY(-50px);
            }
            #signupButton{
              width:100%;
            }
            #person-alert{
              width: 260px;
            }
            .croppa-container{
              transform: translateX(-55px);
            }
            #dob-shelter{
              transform: translateX(-70px);
            }
            
        }
</style>