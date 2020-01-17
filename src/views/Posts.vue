<template>
  <div v-if="authenticated">
    <div :key="post.id" v-for="post in filteredPostShelter">
      <PostShelter :info="post"/>
    </div>
  </div>
</template>

<script>
import PostShelter from "@/components/PostShelter.vue";
import store from "@/store.js";

export default {
  data() {
    return store;
  },
  mounted(){
    
  },
  computed: {
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
  name: "posts",
  methods: {
    gotoDetails(post) {
      this.$router.push({path: `post/${post.id}`})
    }
  },
  components: {
    PostShelter
  },
}
</script>

<style scoped lang="scss">
  
</style>