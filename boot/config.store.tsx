import CONTENTSTORE from "../app/store/content.store";
import CATEGORY from "../app/store/category.store";
import ADS from "../app/store/ads.store";
import BOOKMARK from "../app/store/save.store";
import MessagingStore from "../app/store/messaging.store";
import SearchContent from "../app/store/search.store";
import ContactStore from "../app/store/contact.store";


export default function () {
	return {
		content: new CONTENTSTORE(),
		category: new CATEGORY(),
		ads: new ADS(),
		bookmark:new BOOKMARK(),
		messaging: new MessagingStore(),
		searchContent: new SearchContent(),
		contact: new ContactStore(),
	};
}
