<template>
  <section class="jumbotron">
    <h1>{{item.fields.title}}</h1>
    <h2>{{item.fields.subTitle}}</h2>
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
  }
};
</script>

<style scoped>
.jumbotron {
  text-align: center;
  background: #000;
  color: #fff;
  padding: 16px;
}

.jumbotron h1,
.jumbotron h2 {
  margin: 16px;
}
</style>