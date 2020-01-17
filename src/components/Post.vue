<template>
          <div class="card mb-3">
        <div class="header header-dark bg-dark">
        <img :src="info.userphoto" align="left" alt="...">
        <p>{{info.postedBy}}</p>
        </div>
      <img id="posted-img" :src="info.url" class="card-img-top" alt="">
      <div class="card-body card-body-dark bg-dark">
        <p class="card-text">{{info.description}}</p>
      </div>
      <div class="footer footer-dark bg-dark">
        <div class="row">
        <div class="col-5">
        <img src="/Location.png" align="left" alt="...">
        <p align="left"><small>Location:{{info.location}}</small></p>
        </div>
        <div class="col-4">
        <img src="/Comment.png" align="left" alt="...">
        <p align="left"><small>Comments</small></p>
        </div>
      </div>
      </div>
      </div>
</template>


<style lang="scss" scoped>
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
.right-col{
  .navbar{
    margin-bottom: 10px;
  }
}    
</style>

<script>
export default {
    props:["info"]
}
</script>