import Vue from 'vue'
import AgilityClient from "../agility/agility-client"


export default async function (context) {


	// const agilityContext = {
	// 	sitemapFlat: null,
	// 	sitemapNested: null,
	// 	pageInSitemap: null,
	// 	page: null,
	// 	dynamicPageItem: null
	// };

	const agilityClient = new AgilityClient();
	Vue.prototype.$agility = agilityClient;

	context.$agility = agilityClient;
	const api = agilityClient.client;


	//get all the shared content items defined globally...
	if (agilityClient.config.sharedContent) {

		const promises = agilityClient.config.sharedContent.map(async function (referenceName) {

			let contentListResult = await api.getContentList({
				referenceName: referenceName,
				languageCode: agilityClient.config.languageCode
			})


			//add this shared content to the store...
			context.store.commit("agilityState/addSharedContent", { name: referenceName, value: contentListResult });

			return contentListResult;

		});

		await Promise.all(promises);

	}


	//meta, title, seo etc
	/*
	titleTemplate: '%s - agility-nuxt-1',
     title: 'agility-nuxt-1',
     meta: [ [Object], [Object], [Object] ],
     link: [ [Object], [Object], [Object] ],
     style: [],
     script: [] }
	*/

	//get the agilityState information we'll need for this request


	//TODO: figure out how to avoid repeated requests to the sitemap...
	const sitemapFlat = await api.getSitemapFlat({
		channelName: agilityClient.config.channelName,
		languageCode: agilityClient.config.languageCode
	});
	context.store.commit("agilityState/setSitemapFlat", sitemapFlat);

	const sitemapNested = await api.getSitemapNested({
		channelName: agilityClient.config.channelName,
		languageCode: agilityClient.config.languageCode
	});
	context.store.commit("agilityState/setSitemapNested", sitemapNested);

	const path = context.route.path
	let pageInSitemap = sitemapFlat[path]

	//if we are on the root page, grab the first page in the sitemap
	let firstPagePathInSitemap = Object.keys(sitemapFlat)[0]

	if (path === '/') {
		pageInSitemap = sitemapFlat[firstPagePathInSitemap]
	} else if (path === firstPagePathInSitemap) {
		//if we are on the FIRST page in the sitemap, redirect to /
		return context.redirect('/');
	}

	if (pageInSitemap != null) {
		context.store.commit("agilityState/setPageInSitemap", pageInSitemap);

		//GET PAGE
		let page = await api.getPage({
			pageID: pageInSitemap.pageID,
			languageCode: agilityClient.config.languageCode
		})

		if (page != null) {
			context.store.commit("agilityState/setPage", page);


			let dynItem = null
			if (pageInSitemap.contentID > 0) {
				//this is a dynamic page... grab the content item
				let dynamicPageItem = await api.getContentItem({
					contentID: pageInSitemap.contentID,
					languageCode: agilityClient.config.languageCode
				});

				context.store.commit("agilityState/setDynamicPageItem", dynamicPageItem);
			}
		}
	}

}