<template>
  <div class="posts-listing">
    <div class="container">
      <h1>{{item.fields.title}}</h1>

      <template v-for="post in posts">
        <div class="post" :key="post.key">
          <img v-if="post.image != null" :src="post.image.url" :alt="post.image.label" />
          <h2>
            <nuxt-link :to="post.to">{{post.title}}</nuxt-link>
          </h2>
          <p v-html="post.excerpt"></p>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import truncate from 'truncate-html'

export default {
  props: {
    contentID: Number,
    item: Object,
    page: Object,
    sitemapFlat: Object,
    sharedContent: Object
  },
  computed: {
    posts: function() {
      let sitemap = this.sitemapFlat

      let contentListResult = this.sharedContent.posts

      //if we hit this on the first load, this could be null
      if (!contentListResult) return null
      const dynamicUrls = this.resolvePostUrls(sitemap, contentListResult.items)

      let posts = []
      contentListResult.items.forEach((item) => {
        let img = null
        if (item.fields.image) {
          img = {
            url: item.fields.image.url + '?w=400&h=200',
            label: item.fields.image.label
          }
        }

        posts.push({
          key: 'post-' + item.contentID,
          contentID: item.contentID,
          to: dynamicUrls[item.contentID],
          title: item.fields.title,
          excerpt: truncate(item.fields.details, {
            stripTags: true,
            length: 160
          }),
          image: img
        })
      })
      return posts
    }
  },

  methods: {
    resolvePostUrls(sitemap, posts) {
      let dynamicUrls = {}
      posts.forEach((post) => {
        Object.keys(sitemap).forEach((path) => {
          if (sitemap[path].contentID === post.contentID) {
            dynamicUrls[post.contentID] = path
          }
        })
      })
      return dynamicUrls
    }
  }
}
</script>


<style scoped>
.posts-listing {
  padding: 16px;
}

.posts-listing .post img {
  max-width: 100%;
}
</style>