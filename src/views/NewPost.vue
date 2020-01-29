<template>
<div id="newPostContainer" class="container">
  <div class="row">


    <div class="col-xs col-md-4">
              <div class="form-group">
            <croppa :width="350" :height="350" v-model="postImageData"></croppa>
        <!--  <input v-model="postImageUrl" type="text" id="imageUrl" class="form-control" placeholder="Paste the image URL"/> -->
          </div>
    </div>


    <div id="midCol" class="col-xs-7 col-md-4">

      <div class="form-group">
         <form @submit.prevent="postImage">

          
          <div class="form-group">
          <textarea required v-model="description" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
          </div>


          <div class="form-group">
          <label id="animalLabel"><strong>Animal:</strong></label>
          <select required id="animalTypeX" class="form-control" v-model="animal">
          <option :key="animal" v-for="animal in animals">{{animal}}</option>
          </select>
          </div>


          <div class="form-group">
          <label id="animalLocation"><strong>Location:</strong></label>
          <input required v-model="location" type="text" id="LocationInput" class="form-control" placeholder="City or Street"/>
          </div>

          <button v-if="this.userType=='person' && this.userName!=''" type="submit" id="postBtnPerson" class="btn btn-lg btn-primary mb-5"><strong>Post</strong></button>

        </form>
      </div>

    </div>



    <div class="col-xs col-md-4">

          <form @submit.prevent="postImage">
      
          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalName"><strong>Name:</strong></label>
          <input :disabled="isDisabled" required v-model="name" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
          </div>


          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalGenderLabel" style="color:whitesmoke"><strong>Gender:</strong></label>
          <select :disabled="isDisabled" required id="animalType" class="form-control" v-model="gender">
          <option :key="gender" v-for="gender in genders">{{gender}}</option>
          </select>
          </div>

          
          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalAge"><strong>Age:</strong></label>
          <select :disabled="isDisabled" required id="animalType" class="form-control" v-model="age">
          <option :key="age" v-for="age in ages">{{age}}</option>
          </select>
          </div>


          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="shelterLink"><strong>Shelter's Page :</strong></label>
          <input :disabled="isDisabled" required v-model="link" type="text" id="LinkUrl" class="form-control" placeholder="https://www.bluecross.org.uk/victoria-animal-hospital"/>
          </div>

          <button v-if="this.userType=='shelter' && this.userName!=''" type="submit" id="postBtn" class="btn btn-lg btn-primary mb-5"><strong>Post</strong></button>
          <button v-if="this.userType=='shelter'" type="button" v-on:click="isDisabled = !isDisabled" id="postBtn2" class="btn btn-lg btn-primary mb-5"><strong>Regular Post</strong></button>

          </form>
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
  methods: {
    postImage() {
      var self = this;
      this.postImageData.generateBlob(data =>{
        if(data!=null){
           let imageName = this.userEmail + Date.now() + "/slika.jpg";
           var uploadTask = storage.ref(imageName).put(data);

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
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {


       let d=new Date();
       let n=d.toLocaleString();
       db.collection("posts")
        .add({
          userPic:self.userPicture,
          postedBy:self.userEmail,
          time:n,
          url: downloadURL,
          description:self.description,
          animal:self.animal,
          name:self.name,
          gender:self.gender,
          age:self.age,
          location:self.location,
          link:self.link,
          username:self.userName
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    //  this.postImageUrl = null;
      self.postImageUrl="";
      self.description ="";
      self.name="";
      self.location="";
      self.animal="";
      self.age="";
      self.gender="";
      self.link="";
    console.log('File available at', downloadURL);
  });


});
        }

      });
    this.$router.push({ name: "posts" }).catch(err => console.log(err));
    }  

  }
}
</script>

<style scoped lang="scss">
  input[type=text]:disabled {
  background: #127be4
}
  select:disabled {
  background: #127be4
}
  textarea:hover{
    background-color:gainsboro;
  }
  select:hover{
    background-color:gainsboro;
  }
  input:hover{
    background-color:gainsboro;
  }
  #description{
    margin-top:30px;
    transform: translateX(45px);
    width: 355px;
  }
  #imageUrl{
    width: 650px;
    transform: translateX(-15px);
  }
  #petname{
    width: 250px;
    transform: translateX(105px);
  }
  #LinkUrl{
    width: 250px;
    transform: translateX(105px);
  }
   #LocationInput{
    width: 250px;
    transform: translateX(45px);
    }
  #postBtn{
    transform: translateX(-375px);
  }
  #postBtn2{
    transform: translateX(-335px);
  }
  #postBtnPerson{
    margin-top: 30px;
    transform: translateX(-85px);
  }
  #animalLabel{
    transform: translateX(-95px);
    color: whitesmoke;
  }
  #animalName{
    transform: translateX(-40px);
    color: whitesmoke;
  }
  #animalGenderLabel{
    transform: translateX(-30px);
  }
  #animalAge{
    transform: translateX(-40px);
    color: whitesmoke;
  }
  #animalLocation{
    transform: translateX(-85px);
    color: whitesmoke;
  }
  #shelterLink{
    transform: translateX(-5px);
    color: whitesmoke;
  }
  #animalType{
    transform: translateX(105px);
    width:100px;
  }
  #animalTypeX{
    transform: translateX(45px);
    width:100px;
  }
  .croppa-container{
    margin-top: 30px;
    transform: translateX(-55px);
    margin-bottom: 50px;
  }
   @media only screen and (max-width: 620px) {
            #newPostContainer{
              transform: translateY(-30px)
            }
            #imageUrl{
              width: 250px;
              margin-bottom:30px;
              margin-top: 30px;
            }
            #animalTypeX{
              transform: translate(-20px,-80px);
            }
             #description{
              transform: translate(-20px,-80px);
              width: 300px;
            }
             #animalLabel{
              transform: translate(-120px,-80px);
              color: whitesmoke;
            }
            #petname{
              transform: translateX(-20px);
            }
            #animalName{
              transform: translateX(-125px);
              color: whitesmoke;
            }
            #animalGenderLabel{
              transform: translateX(-115px);
            }
             #animalAge{
              transform: translateX(-125px);
              color: whitesmoke;
            }
            #animalLocation{
              transform: translate(-115px,-70px);
              color: whitesmoke;
            }
            #shelterLink{
              margin-top: 30px;
              transform: translateX(-20px);
            }
            #LocationInput{
              width: 250px;
              transform: translate(-20px,-70px);
            }
            #LinkUrl{
              width: 250px;
              transform: translateX(-15px);
            }
            #postBtn{
              margin-top: 20px;
              transform: translateX(-15px);
              width: 100%;
            }
            #animalType{
              transform: translateX(-20px);
            }
            #shelterLink{
              transform: translateX(-85px);
            }
            #postBtn2{
              transform: translateX(-15px);
              width: 100%;
            }
            .croppa-container{
              width: 350px;
              height: 350px;
              transform: translate(-25px);
              margin-top: 50px;
            }
            #postBtnPerson{
              width: 100%;
              transform: translateX(-10px);
            }
        }
</style>