<template>
<div id="statsContainer" class="container">
  <div class="row">


    <div class="col-xs col-md">
          <apexchart id="donutChart" width="400" type="donut" :options="options" :series="series"></apexchart>
    </div>


    <div class="col-xs col-md">
        <apexchart id="donutChart_2" width="400" type="donut" :options="options_2" :series="series_2"></apexchart>
    </div>


    <div class="col-xs col-md">
        <div class="form-group">
            <h1 style="color:whitesmoke">Statistics</h1>
            <hr>
            <h3>Dog posts : {{this.global.size_dogs}}</h3>
            <h3>Cat posts : {{this.global.size_cats}}</h3>
            <h3>Other posts : {{this.global.size_other}}</h3>
            <hr>
            <h4>Person profiles : {{this.global.size_person}}</h4>
            <h4>Shelter profiles : {{this.global.size_shelter}}</h4>
        </div>
    </div>



  </div>
</div>

</template>

<script>
import store from '@/store.js';
export default {
    data(){
        return{
          global:store,
            options: {
                labels: ['Dogs', 'Cats', 'Other'],
                fill: {
                   colors: ['#1a75ff','#66ff66','#ffa64d']
                }
            },
             options_2: {
                labels: ['Person', 'Shelter'],
                fill: {
                   colors_2: ['#d966ff','#730099']
                }
            },
             series: [store.size_dogs,store.size_cats,store.size_other],
             series_2: [store.size_person,store.size_shelter]
        }
    },
    methods:{
    },
    computed:{
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
    }
}
</script>

<style scoped lang="scss">
#donutChart{
    margin-bottom: 180px;
}
h1{
    font-style: italic;
}
h3{
    color: whitesmoke;
    font-style: italic;
}
h4{
    color: whitesmoke;
    font-style: italic;
}
@media only screen and (max-width: 620px) {
  .left-col{
    display: none;
  }
  .right-col{
    display:none;
  }
  #donutChart{
      display: none;
  }
  #donutChart_2{
      display: none;
  }
  h3{
      margin-bottom: 45px;
  }
}
</style>