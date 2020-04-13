<template>
  <div>
    <component
      :is="componentToRender"
      :page="page"
      :pageInSitemap="pageInSitemap"
      :dynamicPageItem="dynamicPageItem"
      :sharedContent="sharedContent"
      :sitemapFlat="sitemapFlat"
      :sitemapNested="sitemapNested"
    />
  </div>
</template>

<script>
import AgilityComponents from "../agility.components";

export default {
  props: {
    agility: Object
  },
  data: function() {
    return {
      loading: true,
      isError: false,
      isPageNotFound: false,
      errorMessage: null,
      path: null
    };
  },
  head() {
    return {
      title: this.pageInSitemap.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.page.seo.metaDescription
        }
      ]
    };
  },
  computed: {
    sitemapFlat: function() {
      return this.$store.state.agilityState.sitemapFlat;
    },
    sitemapNested: function() {
      return this.$store.state.agilityState.sitemapNested;
    },
    pageInSitemap: function() {
      return this.$store.state.agilityState.pageInSitemap;
    },
    page: function() {
      return this.$store.state.agilityState.page;
    },
    sharedContent: function() {
      const sc = this.$store.state.agilityState.sharedContent;

      return sc;
    },
    dynamicPageItem: function() {
      return this.$store.state.agilityState.dynamicPageItem;
    },
    pageTemplateName: function() {
		if (! this.page.templateName) return null;
		return this.page.templateName.replace(/[^0-9a-zA-Z]/g, "");
    },
    componentToRender: function() {
      const component =
        AgilityComponents.pageTemplateComponents[this.pageTemplateName];

      return component;
    }
  },
  asyncData: async function(context) {},

  handleError: function(msg, error) {
    console.error(msg, error);
    this.setState({
      page: null,
      pageInSitemap: null,
      loading: false,
      isError: true,
      isPageNotFound: false,
      errorMessage: msg
    });
    if (
      this.props.onPageRoutingError &&
      typeof this.props.onPageRoutingError === "function"
    ) {
      this.props.onPageRoutingError(msg, error);
    }
  },

  pageNotFound: function() {
    this.setState({
      page: null,
      pageInSitemap: null,
      loading: false,
      isError: false,
      isPageNotFound: true,
      errorMessage: "page NOT found in sitemap :("
    });

    //TODO: handle page not found...
    // if (
    //   this.props.onPageNotFound &&
    //   typeof this.props.onPageNotFound === "function"
    // ) {
    //   this.props.onPageNotFound(this.errorMessage);
    // }
  }
};
</script>