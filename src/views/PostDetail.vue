<template>
  <div v-if="post">
    <PostShelter :info="post" :showcomments="true"/>
  </div>
</template>

<script>
import PostShelter from "@/components/PostShelter.vue";
import store from "@/store.js";

export default {
  props: ['id'],
  data() {
    return {
      post: null
    }
  },
  mounted() {
    console.log(this.id);
    db.collection("posts")
      .doc(this.id).get().then(doc => {
        this.post = doc.data();
        this.post.id = doc.id;
      })

  },
  name: "post-detail",
  components: {
      PostShelter
  },
}
</script>

<style scoped lang="scss">
  
</style>