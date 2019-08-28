/**
 * Storage for any shared data we want to populate before the layout is rendered.
 */
export const state = function () {
	return {
		sharedContent: null,
		page: null,
		pageInSitemap: null,
		dynamicPageItem: null,
		sitemapFlat: null,
		sitemapNested: null,
	}
}

export const mutations = {
	addSharedContent(state, { name, value }) {
		if (!state.sharedContent) state.sharedContent = {}
		state.sharedContent[name] = value;
	},

	setSitemapFlat(state, sitemapFlat) {
		state.sitemapFlat = sitemapFlat;
	},
	setSitemapNested(state, sitemapNested) {
		state.sitemapNested = sitemapNested;
	},
	setPageInSitemap(state, pageInSitemap) {
		state.pageInSitemap = pageInSitemap;
	},
	setPage(state, page) {
		state.page = page;
	},
	setDynamicPageItem(state, dynamicPageItem) {
		state.dynamicPageItem = dynamicPageItem;
	}
}