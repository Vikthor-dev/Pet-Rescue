<template>
  <div v-if="authenticated" class="home">
<div id="homeContainer" class="container">
  <div class="row">



    
     <div class="col-xs col-md">

       <div class="left-col">

       <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
        <div id="profileAlertCard" class="card-body">
          <h5 class="card-title">User Profile</h5>
          <div class="line"></div>
          <div v-if="this.userType=='person'" class="form-group">
            {{this.userFirstName}}
            {{this.userSecondName}}
          </div>
          <div v-if="this.userType=='shelter'" class="form-group">
            Name: {{this.userShelterName}}
          </div>
          <div class="form-group">
            {{this.userEmail}}
          </div>
          <div v-if="this.userType=='person'" class="form-group">
            {{convertTimestamp}}
          </div>
          <div v-if="this.userType=='shelter'" class="form-group">
            Founded: {{convertTimestamp}}
          </div>
          <div v-if="this.userType=='shelter'" class="form-group">
            Oib / Ssn: {{this.userOibSsn}}
          </div>
          <div v-if="this.userType=='shelter'" class="form-group">
            Location: {{this.userLocation}}
          </div>
          <div v-if="this.userType=='person'" class="form-group">
            Gender: {{this.userGender}}
          </div>
          <div class="form-group">
            User Type : {{this.userType}}
          </div>
           <div class="line"></div>
           <div>
             <button @click="toMyPosts()" class="btn btn-info btn-md">My posts</button>
           </div>
        </div>
      </div>
    </div>
    </div>


    <div class="col-xs-6 col-md-6">
   <!--   <Post :key="post.id" v-bind:info="post" v-for="post in filteredPosts" /> -->
   <!--       <PostShelter :key="post.id" v-bind:info="post" v-for="post in filteredPostShelter"/> -->
   <router-view/>
    </div>




    <div class="col-xs col-md">
      <div class="right-col">

          <nav class="navbar navbar-dark bg-dark default-color">
          <img id="search-icon" src="/Location.png" alt="Search Icon">
          <form class="form-inline my-2 my-lg-0 ml-auto">
          <input class="form-control" id="searchBar" v-model="search" type="search" placeholder="Search" aria-label="Search">
          </form>
          </nav>

        <div class="alert alert-info" role="alert">
          <div class="inside">
        <div class="frontside">
          <h4 class="alert-heading">Fun Facts!</h4>
          <p>Trained pigeons can tell the difference between the paintings of Pablo Picasso and Claude Monet.
            A Grizly bear's bite is strong enough to crush a bowling ball.
          </p>
        </div>
        <div class="backside">
          <h4 class="alert-heading">Fun Facts!</h4>
          <p class="mb-0">The pattern of wrinkles on a gorilla’s nose is unique to each one and is known as a ‘nose print’. 
            Conservation workers use photos and sketches of gorillas’ noses to keep track of individuals..</p>
        </div>
        </div>
        </div>

        <div class="alert alert-info" role="alert">
          <div class="inside">
        <div class="frontside">
          <h4 class="alert-heading">Dogs!</h4>
          <p>In total there is said to be around 400 million dogs in the world.
            The domestic dog has been one of the most popular working and companion animals throughout human history.
          </p>
        </div>
        <div class="backside">
          <h4 class="alert-heading">Dogs!</h4>
          <p class="mb-0">Although experts often disagree, there is scientific evidence which shows that the domestication of 
            dogs could have occurred more than 15,000 years ago.</p>
        </div>
        </div>
        </div>


      </div>
    </div>



  </div>
</div>
  </div>
</template>


<!--import store from '@/store.js';-->
<script>
import store from '@/store.js';
import Post from '@/components/Post.vue'; 
import PostShelter from '@/components/PostShelter.vue';

 export default {
   data(){
     return store;
   },
    name: 'home', 
    components: {
      Post,
      PostShelter
      },
      computed:{
      
      filteredPosts () {
      return this.posts.filter(post => post.postedBy.toLowerCase().includes(this.search) || post.description.toLowerCase().includes(this.search))
    },
      filteredPostShelter () {
      return this.posts.filter(post => post.postedBy.toLowerCase().includes(this.search) || post.description.toLowerCase().includes(this.search))
    },
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
    
    },
      methods: {
      toMyPosts(){
      this.$router.push({ name: "my-posts" }).catch(err => console.log(err));
    }
      },
    /*  mounted(){
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
                postedBy: data.postedBy,
                url: data.url,
                description:data.description,
                name:data.name,
                gender:data.gender,
                age:data.age,
                location:data.location,
                time:data.time,
                link:data.link,
                userPic:data.userPic
              });
            }
          }
        });
      });
           

      } */
    }
</script>

<style lang="scss">
.header{
  height: 60px;
  border-style: solid;
  border-bottom-color: rgb(60, 128, 192);
  border-top-color: rgb(60, 128, 192);
  border-width: 2px;
}
.header img{
  height: 40px;
  width: 40px;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 8px;
}
.header p{
  text-align: left;
  margin-top: 15px;
  color: whitesmoke;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
}
.card-text{
  text-align: justify;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color:whitesmoke;
}
.card-body{
  border-style: solid;
  border-top-color: rgb(60, 128, 192);
  border-width: 2px;
}
.footer{
  height: 50px;
  border-style: solid;
  border-top-color: rgb(60, 128, 192);
  border-bottom-color: rgb(60, 128, 192);
  border-width: 2px;
}
.footer p{
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.col-5 img{
  height: 25px;
  width: 25px;
  margin-top: 10px;
  margin-right: 10px;
}
.col-5 p{
  margin-top: 10px;
  color: whitesmoke;
}
.col-4 img{
  height: 30px;
  width: 30px;
  margin-top: 10px;
  margin-right: 10px;
}
.col-4 p{
  margin-top: 10px;
  color: whitesmoke;
}
.col-4{
  transform: translateX(-10px);
}
.col-5{
  transform: translateX(15px);
}
.name{
  background-color: brown;
  transform: translateX(15px);
  width: 120px;
  height: 46px; 
  p{
    margin-top: 8px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: whitesmoke;
    font-size: 20px;
  }
}
.gender{
  width: 120px;
  p{
    margin-top: 8px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: whitesmoke;
    font-size: 20px;
  }
}
.age{
  width:180px;
  p{
    margin-top: 8px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: whitesmoke;
    font-size: 20px;
  }
}
.details{
  width:115px;
  img{
    height: 25px;
    width: 25px;
    margin-top: 10px;
    margin-right: 10px;
  }
}
.pet-info{
  border-style: solid;
  border-top-color: rgb(60, 128, 192);
  border-width: 2px;
  height: 50px;
}
.col-3{
  margin-top: 7px;
}
.alert p{
  text-align: justify;
}
.right-col{
  .navbar{
    margin-bottom: 10px;
    border-style: solid;
    border-color: dodgerblue;
    border-width: 2px;
  }
  .navbar:hover{
    #search-icon{
      height: 35px;
      width: 35px;
    }
    #search-icon{
      transition: height 0.5s;
      transition: width 0.5s;
    }
    #searchBar{
      width: 175px;
    }
    #searchBar{
      transition: width 0.5s;
    }
  }
  #search-icon{
    height: 30px;
    width: 30px;
  }
  #searchBar{
    width: 100px;
    border-style: solid;
    border-color: dodgerblue;
    border-width: 2px;
  }
  #person-icon{
   height: 30px;
   width: 30px;
   transform: translateX(-5px);
   margin-right: 5px;
 }
 #shelter-icon{
   height: 30px;
   width: 30px;
   transform: translateX(-5px);
   margin-right: 5px;
 }
 .inside{
  position: relative;
  width: 200px;
  height: 210px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
 }
 .alert:hover .inside {
  transform: rotateY(180deg);
}
.frontside, .backside {
  position: absolute;
  width: 200px;
  height: 200px;
  backface-visibility: hidden;
}
.frontside {
  color: black;
}

/* Style the back side */
.backside {
  color: black;
  transform: rotateY(180deg);
}
}
  #profileAlertCard{
     border-style: solid;
     border-bottom-color: rgb(60, 128, 192);
     border-left-color: rgb(60, 128, 192);
     border-right-color: rgb(60, 128, 192);
     text-align: justify;
     .form-group{
       margin-left:30px
     }
     h5{
       margin-left: 30px;
     }
     .line{
       border-style: solid;
       border-color: rgb(60, 128, 192);
       border-width: 1px;
       margin-bottom: 10px;
     }
     .btn{
       transform: translateX(10px)
     }
}
#profileAlertCard .form-group:hover{
  color: rgb(60, 128, 192);
}
@media only screen and (max-width: 620px) {
  .left-col{
    display: none;
  }
  .right-col{
    display:none;
  }
  #homeContainer{
    transform: translateY(-10px);
  }
}
</style>


