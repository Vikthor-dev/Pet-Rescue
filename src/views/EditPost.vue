<template>
<div id="editPostContainer" class="container">
  <div class="row">


    <div class="col-xs col-md">
     
    </div>


    <div class="col-xs-8 col-md-8">

      <h1 id="editPosth1">Edit Your Post</h1>


      <form @submit.prevent="updatePost()">

          <div class="form-group">
            <div class="row">
            <div class="col-xs col-md">
              <textarea disabled v-model="at_description" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
            </div>
            <div class="col-xs col-md">
             <textarea v-model="newDescription" class="form-control" id="description" rows="3" placeholder="Description"></textarea>
            </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
            <div class="col-xs col-md">
               <input type="text" disabled id="animalType" class="form-control" v-model="at_animal">
            </div>
            <div class="col-xs col-md">
              <select id="animalType" class="form-control" v-model="newAnimal">
              <option :key="newAnimal" v-for="newAnimal in newAnimals">{{newAnimal}}</option>
              </select>
            </div>
            </div>
          </div>


            <div v-if="this.global.userType=='shelter'" class="form-group">
            <div class="row">
            <div class="col-xs col-md">
               <input disabled v-model="at_name" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
            </div>
            <div class="col-xs col-md">
               <input v-model="newName" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
            </div>
            </div>
          </div>

            <div v-if="this.global.userType=='shelter'" class="form-group">
            <div class="row">
            <div class="col-xs col-md">
               <input disabled v-model="at_age" type="text" id="petname" class="form-control" placeholder="Animal's age"/>
            </div>
            <div class="col-xs col-md">
                <select id="animalType" class="form-control" v-model="newAge">
                <option :key="newAge" v-for="newAge in newAges">{{newAge}}</option>
                </select>
            </div>
            </div>
          </div>

           <div v-if="this.global.userType=='shelter'" class="form-group">
            <div class="row">
            <div class="col-xs col-md">
               <input disabled v-model="at_gender" type="text" id="petname" class="form-control" placeholder="Animal's gender"/>
            </div>
            <div class="col-xs col-md">
                <select id="animalType" class="form-control" v-model="newGender">
                <option :key="newGender" v-for="newGender in newGenders">{{newGender}}</option>
              </select>
            </div>
            </div>
          </div>
            

            <div class="form-group">
            <div class="row">
            <div class="col-xs col-md">
               <input disabled v-model="at_location" type="text" id="LocationInput" class="form-control" placeholder="City,Country"/>
            </div>
            <div class="col-xs col-md">
               <input v-model="newLocation" type="text" id="LocationInput" class="form-control" placeholder="City,Country"/>
            </div>
            </div>
          </div>

            <div v-if="this.global.userType=='shelter'" class="form-group">
            <div class="row">
            <div class="col-xs col-md">
                <input disabled v-model="at_link" type="text" id="LinkUrl" class="form-control" placeholder="https://www.bluecross.org.uk/victoria-animal-hospital"/>
            </div>
            <div class="col-xs col-md">
               <input v-model="newLink" type="text" id="LinkUrl" class="form-control" placeholder="https://www.bluecross.org.uk/victoria-animal-hospital"/>
            </div>
            </div>
          </div>

          <button type="submit" id="postBtn" class="btn btn-primary btn-lg mb-5"><strong>Save</strong></button>
        </form>
        <button type="submit" id="deletePostBtn" data-toggle="modal" data-target="#exampleModalLong" class="btn btn-danger btn-lg mb-5">Delete Post</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure you want to delete your post?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        <button  type="button" @click="deletePost()" data-dismiss="modal" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</div>

    </div>



    <div class="col-xs col-md">
      
    </div>


  </div>
</div>

</template>

<script>
import store from "@/store.js";
export default {
  data() {
    return {
      global: store,
      at_description:'',
      at_animal:'',
      at_name:'',
      at_gender:'',
      at_age:'',
      at_link:'',
      at_location:'',
      newAnimal:'',
      newAnimals:['Dog','Cat','Other'],
      newGender:'',
      newGenders:['Male','Female'],
      newAge:'',
      newAges:['Puppy','Adult','Senior'],
      newImageUrl:'',
      newDescription:'',
      newName:'',
      newLocation:'',
      newLink:''
    };
  },
  props: ["id"],
  mounted() {
    db.collection("posts")
      .doc(this.id)
      .get()
      .then(doc => {
        this.post = doc.data();
        this.at_description=doc.data().description;
        this.at_animal=doc.data().animal;
        this.at_name=doc.data().name;
        this.at_gender=doc.data().gender;
        this.at_age=doc.data().age;
        this.at_location=doc.data().location;
        this.at_link=doc.data().link;
        console.log(this.post);
        this.post.id = doc.id;
      });
    console.log(store);
  },
  methods: {
    updatePost() {
      if (this.newDescription=='') {
        this.newDescription=this.at_description;
        if (this.newAnimal===''){
        this.newAnimal=this.at_animal;
      }
        if(this.newGender===''){
        this.newGender=this.at_gender;
      }
        if(this.newName==''){
        this.newName=this.at_name;
      }
        if(this.newLink==''){
        this.newLink=this.at_link;
      }
        if(this.newAge===''){
        this.newAge=this.at_age;
      }
        if(this.newLocation==''){
       this.newLocation=this.at_location;
      }
      }
      else if(!this.newDescription==''){
        if (this.newAnimal===''){
        this.newAnimal=this.at_animal;
      }
        if(this.newGender===''){
        this.newGender=this.at_gender;
      }
        if(this.newName==''){
        this.newName=this.at_name;
      }
        if(this.newLink==''){
        this.newLink=this.at_link;
      }
        if(this.newAge===''){
        this.newAge=this.at_age;
      }
        if(this.newLocation==''){
       this.newLocation=this.at_location;
      }
      }
      var id = this.id;
      db.collection("posts")
        .doc(id)
        .update({
          description: this.newDescription,
          animal: this.newAnimal,
          location: this.newLocation,
          gender: this.newGender,
          name: this.newName,
          link: this.newLink,
          age: this.newAge
        })
        .then(result => {
          console.log(result);
          this.$router.push({ name: "posts" });
        })
        .catch(e => {
          console.error(e);
        });
    },
    deletePost(){
      let id=this.id;
      db.collection("posts").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.$router.push({ name: "posts" });
    }
  }
};
</script>

<style lang="scss">
  #description{
    transform: translateX(-15px);
  }
  #petname{
    width: 250px;
    transform: translateX(-15px);
  }
  #LinkUrl{
    transform: translateX(-15px);
  }
   #LocationInput{
    width: 250px;
    transform: translateX(-15px);
    }
  #postBtn{
    margin-top: 30px;
    transform: translateX(-330px);
  }
  #deletePostBtn{
    transform: translateY(-95px);
    margin-right: 300px;
  }
  #animalType{
    transform: translateX(-15px);
    width:100px;
  }
  #editPosth1{
      margin-bottom: 30px;
      color: whitesmoke;
      font-style: italic;
      transform: translateX(-20px);
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
            #imageUrl{
              width: 250px;
              margin-bottom:30px;
              margin-top: 30px;
            }
             #description{
              transform: translateX(-15px);
              width: 250px;
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
              #editPosth1{
             margin-bottom: 30px;
             color: whitesmoke;
             font-style: italic;
           }
           input{
             margin:2px;
           }
           select{
             margin:2px;
           }
           textarea{
             margin:2px;
           }
           #deletePostBtn{
             width: 100%;
             transform: translateX(-10px);
           }
           .modal{
             width: 400px;
           }
        }
</style>