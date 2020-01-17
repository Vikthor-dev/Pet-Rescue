<template>
  <div v-if="authenticated">
    <div :key="post.id" v-for="post in filteredPostShelter">
      <PostShelter :info="post"/>
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
    name: 'dogs', 
    components: {
      Post,
      PostShelter
      },
      computed:{
      
      filteredPosts () {
      return this.posts.filter(post => post.postedBy.toLowerCase().includes(this.search) || post.description.toLowerCase().includes(this.search))
    },
      filteredPostShelter () {
      return this.posts.filter(post => post.postedBy.toLowerCase().includes(this.search) && post.animal=='Dog' || post.description.toLowerCase().includes(this.search) && post.animal=='Dog')
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
       mounted(){
      
   /*    db.collection("posts")
      .orderBy("time")
      .limit(30)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const data = change.doc.data();
            if (data.postedBy && data.animal=="Cat") {
              this.posts.unshift({
                id: change.doc.id,
                postedBy: data.postedBy,
                url: data.url,
                description:data.description,
                name:data.name,
                gender:data.gender,
                age:data.age,
                location:data.location
              });
            }
          }
        });
      }); */
      },
      methods:{
           gotoDetails(post) {
           this.$router.push({path: `post/${post.id}`})
    }
      }
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
#carouselExampleIndicators{
  margin-bottom: 20px;
}
#carouselExampleCaptions{
  margin-bottom: 20px;
}
#carouselExample{
  margin-bottom: 20px;
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
}
</style>


