<template>
 <div id="app">
   <nav v-if="authenticated" class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav">
  <a class="navbar-brand">PET RESCUE</a>
   <li class="mobileSearch">
      <form class="form-inline my-2 my-lg-0 ml-auto">
      <input class="form-control" id="searchBarNav" v-model="search" type="search" placeholder="Search" aria-label="Search">
      </form>
      </li>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
       <router-link  to="/" class="nav-link"><img id="nav-icon" src="/Home.ico" alt="Home Icon">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/dogs" class="nav-link"><img id="nav-icon" src="/Dog.png" alt="Dog Icon">Dogs</router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/cats" class="nav-link"><img id="nav-icon" src="/Cat.png" alt="Cat Icon">Cats</router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/other" class="nav-link"><img id="nav-icon" src="/Other.png" alt="Other Icon">Other</router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/new-post" class="nav-link"><img id="nav-icon" src="/Image.png" alt="Post Icon">Post</router-link>
      </li>
      <li class="nav-item">
        <router-link  to="/change-password" class="nav-link"><img id="nav-icon" src="/key.png" alt="Change Icon">Password</router-link>
      </li>
       <li class="nav-item">
        <router-link  to="/delete-account" class="nav-link"><img id="nav-icon" src="/delete.png" alt="Change Icon">Delete</router-link>
      </li>
    </ul>
      <ul class="navbar-nav">
        <li class="nav-item m-auto">
          <img id="navProfileIcon" :src="this.userPicture" alt="#">
        </li>
        <li class="nav-item">
          <a class="nav-link"  @click="logout" style="cursor: pointer;"><img id="nav-icon" src="/Logout.png" alt="Logout Icon">Logout</a>
        </li>
      </ul>
  </div>
</nav>
    <div class="container">

    <router-view/>
    
    </div>

    <nav v-if="authenticated" class="navbar navbar-expand-lg navbar-dark bg-dark" id="nav-bottom">
       <a id="petRescueSignbottom" class="navbar-brand">PET RESCUE</a>
       <li class="nav-item active">
         <button id="toTopBtn" @click="toTop" class="btn"><i class="fa fa-home"></i>Top</button>
      </li>
      <li id="userProfile" class="nav-item">
        <router-link  to="user-profile" class="nav-link"><img id="nav-icon" src="/settings.png" alt="User Profile Icon"></router-link>
      </li>
      <li id="statsIcon" class="nav-item">
        <router-link  to="stats" class="nav-link"><img id="nav-icon" src="/graph.png" alt="Statistics Icon"></router-link>
      </li>
      <li id="statsIcon" class="nav-item">
        <button id="toMypostsBtn" @click="toMyPosts()" class="btn btn-info btn-sm">My posts</button>
      </li>
   </nav>

  </div>
</template>


<script>
import store from '@/store.js'
export default {
  data(){
    return store;
  },
  methods:{
    logout(){
      this.search='';
      this.userType='',
      this.userDbf='',
      this.userFirstName='',
      this.userSecondName='',
      this.userShelterName='',
      this.userGender='',
      this.userOibSsn='',
      this.userLocation='',
      this.userPicture='',
      this.userName='',
      firebase.auth().signOut();
    },
    toTop(){
       document.documentElement.scrollTop = 0;
    },
      toMyPosts(){
      this.$router.push({ name: "my-posts" }).catch(err => console.log(err));
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User is logged in with email " + user.email);
        this.authenticated = true;
        this.userEmail = user.email;

      db.collection("Users")
      .doc(this.userEmail)
      .get()
      .then(doc => {
      if (doc.exists) {
      this.userName= doc.data().User_Name;
      this.userType = doc.data().User_Type;
      this.userDbf = doc.data().User_dbf;
      this.userFirstName = doc.data().User_First_Name;
      this.userSecondName = doc.data().User_Second_Name;
      this.userShelterName = doc.data().User_Shelter_Name;
      this.userGender = doc.data().User_Gender;
      this.userOibSsn = doc.data().User_Shelter_OIB_SSN;
      this.userLocation = doc.data().User_Shelter_Location;
      this.userPicture = doc.data().User_Picture;
      console.log("Document data:", doc.data());
      console.log(this.userType);
          } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
              }
          }); 

        
        if (this.$route.name !== "home")
        this.$router.push({ name: "posts" }).catch(err => console.log(err));
      } else {
        console.log("User is not logged in");
        this.authenticated = false;
        if (this.$route.name !== "login")
        this.$router.push({ name: "login" }).catch(err => console.log(err));
      }
    });

       db.collection("posts")
      .orderBy("time")
      .limit(30)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const data = change.doc.data();
            if (data.postedBy) {
                this.posts.unshift({
                id: change.doc.id,
                username:data.username,
                postedBy: data.postedBy,
                url: data.url,
                description:data.description,
                name:data.name,
                gender:data.gender,
                age:data.age,
                location:data.location,
                time:data.time,
                link:data.link,
                userPic:data.userPic,
                animal:data.animal,
                comments: data.comments
              });
            }
          }
        });
      });

        var self=this
        db.collection('posts').where("animal","==","Other").get().then(snap => {
          self.size_other = snap.size // will return the collection size
          console.log("Size :",self.size_other)
        });

        
        db.collection('posts').where("animal","==","Dog").get().then(snap => {
          self.size_dogs = snap.size // will return the collection size
          console.log("Size :",self.size_dogs)
        });

        db.collection('posts').where("animal","==","Cat").get().then(snap => {
          self.size_cats = snap.size // will return the collection size
          console.log("Size :",self.size_cats)
        });

         db.collection('Users').where("User_Type","==","person").get().then(snap => {
          self.size_person = snap.size // will return the collection size
          console.log("Size :",self.size_person)
        });

          db.collection('Users').where("User_Type","==","shelter").get().then(snap => {
          self.size_shelter = snap.size // will return the collection size
          console.log("Size :",self.size_shelter)
        });
  }

  
}
</script>




<style>
html, body, #app, section.section {
  height: 100%;
  margin: 0;
  background: #1e5799;
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1e5799), color-stop(100%,#7db9e8));
  background: -webkit-linear-gradient(top,  #1e5799 0%, #7db9e8 100%);
  background:    -moz-linear-gradient(top,  #1e5799 0%, #7db9e8 100%);
  background:     -ms-linear-gradient(top,  #1e5799 0%, #7db9e8 100%);
  background:      -o-linear-gradient(top,  #1e5799 0%, #7db9e8 100%);
  background:         linear-gradient(to bottom, #1e5799 0%, #7db9e8 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 );
  background-attachment: fixed;
}
</style>

<style scoped lang="scss">

.mobileSearch{
  display: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav-icon{
  margin-right: 10px;
  height: 30px;
  width: 30px;

}
#welcome-text{
  color: whitesmoke;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 40px;
  transform: translateX(120px);
}
#login-icon{
  height: 40px;
  width: 40px; 
  margin-top: 15px;
}
#signup-icon{
  height: 40px;
  width: 40px;
  margin-top: 15px;
}
#signup-text{
  margin-top: 15px;
}
#login-text{
  margin-top: 15px;
}
#nav {
  .navbar-brand{
    transition: font-size 1s;
  }
  .navbar-brand:hover{
    font-size: 30px;
    transform: translateX(25px);
  }
    #navProfileIcon{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    transform: translateX(-30px);
    transition: height 0.5s;
    transition: width 0.5s;
  }
  #navProfileIcon:hover{
    height: 60px;
    width: 60px;
  }
  width: 100%;
  padding-left: 10%;
  background-color: white;
  margin-bottom: 30px;
  box-shadow: 0 3px 3px 0px rgba(0,0,0,.2);
  position: sticky;
  top: 0;
  z-index: 100;

  a {
    font-weight: bold;
    color:whitesmoke;
    margin-right: 40px;

    &.router-link-exact-active {
      color: rgba($color: #02b7ff, $alpha: 1.0)
    }
  }
  img:hover{
    width: 25px;
    height: 25px;
  }
}
#nav-bottom{
   .navbar-brand{
    transition: font-size 1s;
  }
  .navbar-brand:hover{
    font-size: 30px;
    transform: translateX(25px);
  }
  
  width: 100%;
  padding-left: 10%;
  background-color: white;
  box-shadow: 0 3px 3px 0px rgba(0,0,0,.2);
  position: sticky;
  bottom: 0;
  z-index: 100;
  height: 70px;
  
  .btn {
  background-color: DodgerBlue; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}

  a {
    font-weight: bold;
    color:whitesmoke;
    margin-right: 40px;

    &.router-link-exact-active {
      color: rgba($color: #02b7ff, $alpha: 1.0)
    }
  }
  p{
    color: whitesmoke;
    font-weight: bold;
  }
  #userProfile{
    margin-left: 50px;
    transform: translateY(-10px);
  }
   #statsIcon{
    transform: translateY(-10px);
  }
   img:hover{
    width: 25px;
    height: 25px;
  }
}
#searchBarNav{
  width: 250px;
}
#toMypostsBtn{
  display: none;
}
 @media only screen and (max-width: 620px) {
   #petRescueSignbottom{
     display:none;
   }
   #toTopBtn{
     height:40px;
     width: 60px;
     transform: translateY(-10px);
   }
   #nav-bottom{
     .nav-link{
       transform: translateY(-10px);
     }
     li{
      transform: translateX(-20px);
    }
    #statsIcon{
      transform: translate(125px,-80px);
    }
    #userProfile{
    transform: translate(-120px,-10px);
  }
   }
   .mobileSearch{
     display: inline;
  }
  #toMypostsBtn{
    display: inline;
    transform: translateX(-120px);
  }
 }
</style>
