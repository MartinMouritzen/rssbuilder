import RSSFeed from 'library/RSSFeed';

import XMLParser from 'fast-xml-parser';

/**
* A simple RSS Parser
*/
class RSSParser {
	rssContent = false;
	constructor(rssContent = '') {
		this.rssContent = rssContent;
	}
	/**
	* Converts itunes duration to seconds
	*/
	convertDurationToSeconds(duration) {
		if (Number.isInteger(duration)) {
			return duration;
		}
		if (!duration) {
			return false;
		}
		var timePieces = duration.split(':');
		
		if (timePieces.length === 1) {
			return timePieces[0];
		}
		if (timePieces.length === 2) {
			timePieces = [
				"00",
				timePieces[0],
				timePieces[1]
			];
		}
		return (+timePieces[0]) * 60 * 60 + (+timePieces[1]) * 60 + (+timePieces[2]); 
	}
	/**
	* Parses a RSS body
	*/
	parse() {
		if (!this.rssContent) {
			throw new Error('No RSS content to parse');
		}
		var rssFeed = new RSSFeed();


		var xml = XMLParser.parse(this.rssContent,{
			attributeNamePrefix: '',
			ignoreAttributes: false
		});

		var podcast = xml.rss.channel;

		rssFeed.title = podcast.title;
		rssFeed.description = podcast.description;

		if (Array.isArray(rssFeed.link)) {
			rssFeed.link = podcast['link'][0];
			podcast['link'].shift();
			rssFeed.extraLinks = podcast['link'];
		}
		else {
			rssFeed.link = podcast['link'];
		}
		rssFeed.docs = podcast['docs'];
		rssFeed.generator = podcast['generator'];
		rssFeed.language = podcast['language'] ? podcast['language'] : 'en';
		rssFeed.copyright = podcast['copyright'];
		rssFeed.pubDate = podcast['pubDate'];
		rssFeed.lastBuildDate = podcast['lastBuildDate'];

		rssFeed.imageUrl = podcast['image'] ? podcast['image']['url'] : false;
		rssFeed.imageWidth = podcast['image'] ? podcast['image']['width'] : false;
		rssFeed.imageHeight = podcast['image'] ? podcast['image']['height'] : false;

		rssFeed.managingEditor = podcast['managingEditor'];
		rssFeed.webMaster = podcast['webMaster'];
		rssFeed.locked = podcast['locked'];

		rssFeed.keywords = podcast['itunes:keywords'];

		rssFeed.summary = podcast['itunes:summary'];

		rssFeed.author = podcast['itunes:author'];

		rssFeed.explicit = podcast['itunes:explicit'];

		if (podcast['itunes:category']) {
			var categories = [];
			if (Array.isArray(podcast['itunes:category'])) {
				for(var i=0;i<podcast['itunes:category'].length;i++) {
					categories.push(podcast['itunes:category'][i].text);
				}
			}
			rssFeed.categories = categories;
		}

		if (podcast['itunes:owner']) {
			rssFeed.owner = podcast['itunes:owner']['itunes:name'];
			rssFeed.ownerEmail = podcast['itunes:owner']['itunes:email'];
		}

		let episodes = [];
		podcast.item.forEach((episode) => {
			if (!episode['itunes:duration']) {
				episode['itunes:duration'] = '00:00';
			}

			episodes.push({
				uid: Math.random() * 99999999999, // We just use this to generate keys in React
				title: episode.title,
				description: episode['itunes:summary'] ? episode['itunes:summary'] : episode['itunes:subtitle'] ? episode['itunes:subtitle'] : episode['description'] ? episode['description'] : '',
				author: episode.author ? episode.author : episode['itunes:author'] ? episode['itunes:author'] : false,
				imageUrl: episode['itunes:image'] ? episode['itunes:image']['href'] : false,
				explicit: episode['itunes:explicit'],
				keywords: episode['itunes:keywords'],
				subtitle: episode['itunes:subtitle'],
				itunesSummary: episode['itunes:summary'],
				pubDate: episode.pubDate,
				date: new Date(Date.parse(episode.pubDate)),
				link: episode.link,
				guid: episode.guid ? episode.guid['#text'] : false,
				guidIsPermaLink: episode.guid ? episode.guid['isPermaLink'] === 'true' ? true : false : false,
				enclosureType: episode.enclosure ? episode.enclosure.type : '',
				enclosureLength: episode.enclosure ? episode.enclosure.length : '',
				enclosureUrl: episode.enclosure ? episode.enclosure.url : '',
				duration: this.convertDurationToSeconds(episode['itunes:duration']),
				transcript: episode['podcast:transcript'],
				chaptersUrl: episode['podcast:chapters'] ? episode['podcast:chapters']['url'] : '',
				chaptersType: episode['podcast:chapters'] ? episode['podcast:chapters']['type'] : ''
			});
		});
		rssFeed.items = episodes;
		return rssFeed;
	}
}
export default RSSParser;