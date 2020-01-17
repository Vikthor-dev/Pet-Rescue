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
               <input disabled v-model="at_age" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
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
               <input disabled v-model="at_gender" type="text" id="petname" class="form-control" placeholder="Animal's name"/>
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
               <input v-model="newLocation" maxlength="14" type="text" id="LocationInput" class="form-control" placeholder="City,Country"/>
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
  #animalType{
    transform: translateX(-15px);
    width:100px;
  }
  #editPosth1{
      margin-bottom: 30px;
      color: whitesmoke;
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
  }
        }
</style>