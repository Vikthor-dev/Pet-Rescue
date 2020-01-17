<template>
        <div class="card mb-3">
        <div class="header header-dark bg-dark">
        <img :src="info.userPic" align="left" alt="...">
        <p>{{info.postedBy}}</p>
        </div>
      <img id="posted-img" :src="info.url" class="card-img-top" alt="...">
      <div v-if="info.name && info.gender && info.age!=NULL" class="pet-info pet-info-dark bg-dark">
        <div class="row">
          <p id="name">Name:{{info.name}}</p>
          <p id="gender">Gender: {{info.gender}}</p>
          <p id="age">Age: {{info.age}}</p>
        </div>
      </div>
      <div class="card-body card-body-dark bg-dark">
        <p class="card-text">{{info.description}}</p>
      </div>
      <div class="footer footer-dark bg-dark">
        <div class="row">
        <div class="col-5">
        <img src="/Location.png" align="left" alt="...">
        <p id="locationText" align="left"><small>Location:{{info.location}}</small></p>
        </div>
        <div @click="gotoDetails(post)" class="col-4">
        <img id="commentsImg" src="/Comment.png" align="left" alt="...">
        <p id="commentsText" align="left"><small>Comments</small></p>
        </div>
        <div class="col-3">
        <a id="buttonAdopt" v-if="info.name && info.gender && info.age &&info.link!=NULL" class="btn btn-primary btn-sm" :href="info.link" role="button">Adopt Me</a>
        </div>
      </div>
      </div>

        <div v-if="showcomments">
        <form @submit.prevent="postComment">
        <div id="commentsFooter" class="footer footer-dark bg-dark">
        <div class="row">
        <div class="col-sm col-md">
        <input  v-model="newComment" type="text" class="form-control" placeholder="Comment this post" id="commentsInput">
        </div>
        <div class="col-sm col-md">
        <button id="inputCommentsBtn" type="submit" class="btn btn-success btn-md">Post</button>
        </div>
        </div>
        </div>
        </form>
        <div class="comments list-group">
        <a id="commentsDiv" :key="c.Posted_at" v-for="c in comments" href="#" class="animate list-group-item list-group-item-action flex-column align-items-start">
        <img id="commImg" :src="c.ImgComm" alt="">
        <small id="postedComment">{{ c.comment }}</small>
        <small id="commBy"> by </small>
        <small id="commPostedBy">{{ c.Posted_By }} </small>
        <small id="commTime">{{ c.Posted_at}}</small>
        </a>
        </div>
      </div>


      <div id="finalFooter" class="footer footer-dark bg-dark">
        <div class="row">
          <div id="postedatcol" class="col-xs-1 col-md-3">
          <p id="posted-at">Posted at :</p>
          </div>
          <div id="timecol" class="col-xs-7 col-md-7">
          <p id="date">{{timeAgo}}</p>
          </div>
          <div id="editbtncol" class="col-xs-4 col-md-2">
          <button v-if="info.postedBy==this.global.userEmail" @click="editPost()" id="edit" class="btn btn-danger btn-sm">Edit</button>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import store from '@/store.js'
import moment from 'moment'
export default {
  data(){
    return{
      global: store,
      newComment: "",
      comments: []
    }
  },
    props:["info","showcomments"],
  computed:{
    timeAgo(){
      return moment(this.info.time).fromNow();
    }
  },
  mounted(){
       if (this.showcomments) {
     db.collection("posts").doc(this.info.id).collection("comments").orderBy("Posted_at","asc").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let comment = change.doc.data();
            comment.isNew = true;
            console.log(comment);
            this.comments.unshift(comment)
          }
        })
     })
    }
  },
  methods:{
        gotoDetails(post) {
        if (this.$route.name !== "post-detail"){
        this.$router.push({path: `post/${this.info.id}`})
           }
          },
      postComment() {
      let m=new Date();
      let k=m.toLocaleString();
      if (this.newComment) {
        db.collection("posts")
          .doc(this.info.id)
            .collection("comments")
            .add({
               Posted_By: this.global.userEmail, 
               comment: this.newComment, 
               Posted_at: k,
               ImgComm:this.global.userPicture
                })
              .then(result => {
                console.log(result)
                this.newComment = "";
              })
              .catch(e => {
                console.error(e)
              })
      }
    },
    editPost(){
       if (this.$route.name !== "edit-post") {
        this.$router.push({ path: `/edit-post/${this.info.id}` });
      }
    }
  }
  
}
</script>



<style lang="scss" scoped>
.card:hover{
  transform:rotateY(10deg);
  .card-text{
    transition: 0.2s;
  }
  .card-text{
      color: cadetblue;
  }
  .header p{
    transition: 0.2s;
  }
  .header p{
    color: cadetblue;
  }
}
.card{
  transition: transform 0.5s;
}
  .header{
  height: 60px;
  border-style: solid;
  border-bottom-color: rgb(60, 128, 192);
  border-top-color: rgb(60, 128, 192);
  border-width: 2px;
}
.header img{
  height: 50px;
  width: 50px;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 3px;
  border-radius: 50%;
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
  border-width: 1px;
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
.pet-info{
  border-style: solid;
  border-top-color: rgb(60, 128, 192);
  border-width: 2px;
  height: 50px;
  p{
    color:aquamarine;
    font-size: 25px;
    margin-left: 25px;
    font-style: italic;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .row{
    transform: translateX(15px);
    margin-top: 3px;
  }
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
.right-col{
  .navbar{
    margin-bottom: 10px;
  }
}
#finalFooter{
  p{
    color: whitesmoke;
    font-size: 20px;
    margin-left: 17px;
    margin-top: 5px;
    font-style: italic;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    transform: translateX(17px);
  }
  #date{
    color: aquamarine;
  }
  #edit{
   transform: translateX(125px);
   height: 30px;
   width: 80px;
   margin-top: 5px;
  }
  #postedatcol{
    transform: translateX(-25px);
  }
  #timecol{
    transform: translateX(-145px);
  }
  #editbtncol{
    transform: translateX(-155px);
  }
  #editPostRouterLink{
    color: whitesmoke;
  }
}
.col-4:hover{
  #commentsText{
  color: dodgerblue;
  cursor: pointer;
  font-size: 20px;
}
#commentsText{
  transition: font-size 0.5s
}
#commentsImg{
  transition: height 0.5s;
  transition: width 0.5s;
}
#commentsImg{
  height: 35px;
  width: 35px;
  cursor: pointer;
}
}
#commentsInput{
  width: 300px;
  background-color: whitesmoke;
  margin-top: 5px;
  margin-left: 5px;
}
#inputCommentsBtn{
  margin-top: 5px;
  transform: translateX(-85px);
}
#commImg{
  height: 35px;
  width: 35px;
  border-radius: 50%;
  transform: translateX(-20px);
}
#postedComment{
  margin-right: 5px;
  font-weight: bold;
}
#commentsDiv{
  background-color:#e6e6ff;
}
#commBy{
  margin-right: 5px;
  font-weight: bold;
  font-style: italic;
}
#commPostedBy{
  margin-right: 5px;
  font-weight: bold;
  font-style: italic;
}
#commTime{
  font-weight: bold;
  font-style: italic;
}
@media only screen and (max-width: 620px) {
  .pet-info{
    #name{
      color: whitesmoke;
      font-weight: bold;
      margin-top: 8px;
      font-size: 12px;
      transform: translateX(-15px);
    }
    #gender{
      color: whitesmoke;
      font-weight: bold;
      margin-top: 8px;
      font-size: 12px;
      transform: translateX(-35px);
    }
    #age{
      color: whitesmoke;
      font-weight: bold;
      margin-top: 8px;
      font-size: 12px;
      transform: translateX(-55px);
    }
  }
  #buttonAdopt{
    width:60px;
    height:35px;
    transform:translateX(-20px);
    font-size: 10px;
    font-weight: bold;
  }
  #locationText{
    display: none;
  }
  #commentsText{
    display:none;
  }
  #posted-at{
    display: none;
  }
  #finalFooter{
    p{
      font-size: 15px;
      transform: translateX(2px);
      margin-top: 10px;
    }
  }
  #postedatcol{
    transform: translateX(-25px);
  }
  #timecol{
    transform: translateX(-110px);
    p{
      transform: translateX(55px);
    }
  }
  #editbtncol{
    #edit{
      margin-left: 360px;
      height: 30px;
      width: 50px;
      font-weight: bold;
      transform: translateY(-40px);
    }
  }
  #editPostRouterLink{
    color: whitesmoke;
  }
} 
</style>