<template>
  <section class="post-details">
    <div class="container">
      <div class="post">
        <h1>{{dynamicPageItem.fields.title}}</h1>
        <img
          v-if="dynamicPageItem.fields.image "
          :src="dynamicPageItem.fields.image.url + '?w=860'"
          :alt="dynamicPageItem.fields.image.label"
        />
        <div class="post-content" v-html="dynamicPageItem.fields.details"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    contentID: Number,
    item: Object,
    page: Object,
    pageInSitemap: Object,
    dynamicPageItem: Object
  },
  mounted() {},
computed: {
  title: function() {
    if (! this.dynamicPageItem) return "no title";
    return this.dynamicPageItem.fields.title;
  }
}
};
</script>

<style scoped>
.post-details {
  padding: 16px;
}
.post-details .post img {
  max-width: 100%;
}
</style>