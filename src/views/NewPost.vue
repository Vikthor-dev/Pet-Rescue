<template>
<div id="newPostContainer" class="container">
  <div class="row">


    <div class="col-xs col-md">
     
    </div>


    <div class="col-xs-7 col-md-7">

      <div class="form-group">
      <form @submit.prevent="postImage">
          <div class="form-group">
            <croppa :width="350" :height="350" v-model="postImageData"></croppa>
        <!--  <input v-model="postImageUrl" type="text" id="imageUrl" class="form-control" placeholder="Paste the image URL"/> -->
          </div>

          
          <div class="form-group">
          <textarea required v-model="description" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
          </div>


          <div class="form-group">
          <label id="animalLabel"><strong>Animal:</strong></label>
          <select required id="animalType" class="form-control" v-model="animal">
          <option :key="animal" v-for="animal in animals">{{animal}}</option>
          </select>
          </div>

          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalName"><strong>Name:</strong></label>
          <input required v-model="name" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
          </div>


          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalGenderLabel"><strong>Gender:</strong></label>
          <select required id="animalType" class="form-control" v-model="gender">
          <option :key="gender" v-for="gender in genders">{{gender}}</option>
          </select>
          </div>

          
          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="animalAge"><strong>Age:</strong></label>
          <select required id="animalType" class="form-control" v-model="age">
          <option :key="age" v-for="age in ages">{{age}}</option>
          </select>
          </div>


          <div class="form-group">
          <label id="animalLocation"><strong>Location:</strong></label>
          <input required v-model="location" maxlength="14" type="text" id="LocationInput" class="form-control" placeholder="City,Country"/>
          </div>


          <div v-if="this.userType=='shelter'" class="form-group">
          <label id="shelterLink"><strong>Shelter's Page :</strong></label>
          <input required v-model="link" type="text" id="LinkUrl" class="form-control" placeholder="https://www.bluecross.org.uk/victoria-animal-hospital"/>
          </div>




          <button type="submit" id="postBtn" class="btn btn-primary mb-5"><strong>Post</strong></button>
        </form>
      </div>

    </div>



    <div class="col-xs col-md">
      
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
          link:self.link
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
    transform: translateX(-15px);
    width: 650px;
  }
  #imageUrl{
    width: 650px;
    transform: translateX(-15px);
  }
  #petname{
    width: 250px;
    transform: translateX(-15px);
  }
  #LinkUrl{
    width: 650px;
    transform: translateX(-15px);
  }
   #LocationInput{
    width: 250px;
    transform: translateX(-15px);
    }
  #postBtn{
    transform: translateX(-295px);
  }
  #animalLabel{
    transform: translateX(-290px);
    color: whitesmoke;
  }
  #animalName{
    transform: translateX(-295px);
    color: whitesmoke;
  }
  #animalGenderLabel{
    transform: translateX(-290px);
  }
  #animalAge{
    transform: translateX(-300px);
    color: whitesmoke;
  }
  #animalLocation{
    transform: translateX(-285px);
    color: whitesmoke;
  }
  #shelterLink{
    transform: translateX(-260px);
    color: whitesmoke;
  }
  #animalType{
    transform: translateX(-15px);
    width:100px;
  }
  #alertmessage1{
    transform: translateY(35px);
    margin-right: 140px;
    color:powderblue;
    font-weight: bold;
  }
  #alertmessage2{
    transform: translateY(35px);
    margin-left: 140px;
    color:powderblue;
    font-weight: bold;
  }
   #alertmessage3{
    transform: translateY(35px);
    color:powderblue;
    font-weight: bold;
  }
  .croppa-container{
    transform: translateX(-145px);
  }
   @media only screen and (max-width: 620px) {
            #leftcol{
                display: none;
            }
            #rightcol{
                display: none;
            }
            #newPostContainer{
              transform: translateY(-30px)
            }
            #alertmessage1{
              display:none;
            }
             #alertmessage2{
              display: none;
            }
             #alertmessage3{
              display: none;
            }
            #imageUrl{
              width: 250px;
              margin-bottom:30px;
              margin-top: 30px;
            }
             #description{
              transform: translateX(-15px);
              width: 320px;
            }
             #animalLabel{
              transform: translateX(-115px);
              color: whitesmoke;
            }
            #animalName{
              transform: translateX(-120px);
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
              transform: translateX(-105px);
              color: whitesmoke;
            }
            #shelterLink{
              margin-top: 30px;
              transform: translateX(-20px);
            }
            #LocationInput{
              width: 250px;
              transform: translateX(-15px);
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
            .croppa-container{
              width: 350px;
              height: 350px;
              transform: translateX(-20px);
              margin-top: 50px;
            }
        }
</style>