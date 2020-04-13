import queryString from 'query-string'
import agilityContentFetch from '@agility/content-fetch'
import agilityConfig from '../agility.config'

class AgilityClient {

	constructor(context) {
		this.config = agilityConfig;
		this.client = this.createClient();

		this.context = context || null;

	}

	createClient() {

		//check whether preview has been enabled via query string / local storage
		this.checkPreviewModeAndLanguageCode();

		//build the client
		let apiKey = agilityConfig.fetchAPIKey;
		if (agilityConfig.isPreview) {
			apiKey = agilityConfig.previewAPIKey;
		}

		console.log("ispreview", agilityConfig.isPreview);

		return agilityContentFetch.getApi({
			guid: agilityConfig.guid,
			apiKey: apiKey,
			caching: agilityConfig.caching,
			isPreview: agilityConfig.isPreview
		})
	}

    /**
     * Check whether the site is in preview mode, and also set the language     
     *      
     * @memberof AgilityApp
     */
	checkPreviewModeAndLanguageCode() {

		//don't run this in server mode
		if (process.server || process.static) {
			return;
		}

		//don't run this in "generate" mode
		if (process.argv.includes("generate")) {
			return;
		}

		//lang=en-us                --set the language code
		//agilitypreviewkey=xyz     --set previewMode = true
		//AgilityPreview=0          -- set previewMode = false
		const parsed = queryString.parse(document.location.search);
		let storageKey = "agility-config";
		let storedConfigWasAltered = false;

		let storedConfig = {
			languageCode: agilityConfig.languageCode,
			isPreview: agilityConfig.isPreview
		};


		if (window && window.sessionStorage) {
			//pull the stored config values from local storage if we can
			let str = window.sessionStorage.getItem(storageKey);
			if (str && str.length > 4) {
				try {
					let newConfig = JSON.parse(str);

					if (newConfig && newConfig.languageCode) {
						storedConfig = newConfig;
					}
				} catch (parseError) {
					if (console) console.warn("Error parsing json from session storage", str);
				}
			}
		}

		if (parsed.lang && parsed.lang.length > 0) {

			if (storedConfig.languageCode !== parsed.lang) {
				if (console) console.log("[Agility] Setting language code to", parsed.lang);
				storedConfig.languageCode = parsed.lang;
				storedConfigWasAltered = true;
			}
		}
		if (parsed.AgilityPreview && parsed.AgilityPreview === "0") {
			if (storedConfig.isPreview !== false) {
				if (console) console.log("[Agility] Setting preview mode to false");
				storedConfig.isPreview = false;
				storedConfigWasAltered = true;
			}

		} else if (parsed.agilitypreviewkey) {
			if (storedConfig.isPreview !== true) {
				if (console) console.log("[Agility] Setting preview mode to true");
				storedConfig.isPreview = true;
				storedConfigWasAltered = true;
			}
		}


		//set the config vals
		agilityConfig.languageCode = storedConfig.languageCode;
		agilityConfig.isPreview = storedConfig.isPreview;

		if (storedConfigWasAltered) {
			if (window && window.sessionStorage) {
				//put the value in storage
				window.sessionStorage.setItem(storageKey, JSON.stringify(storedConfig));
			}
		}

	}

}

export default AgilityClient;
