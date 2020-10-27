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
		
		// console.log(timePieces);
		
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
		var result = (+timePieces[0]) * 60 * 60 + (+timePieces[1]) * 60 + (+timePieces[2]); 
		// console.log(result);
		return result;
	}
	/**
	* Parses a RSS body
	*/
	parse() {
		if (!this.rssContent) {
			throw 'No RSS content to parse';
		}
		var rssFeed = new RSSFeed();


		var xml = XMLParser.parse(this.rssContent,{
			attributeNamePrefix: '',
			ignoreAttributes: false
		});

		var podcast = xml.rss.channel;
		console.log(podcast);
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
		rssFeed.language = podcast['language'];
		rssFeed.copyright = podcast['copyright'];
		rssFeed.pubDate = podcast['pubDate'];
		rssFeed.lastBuildDate = podcast['lastBuildDate'];

		rssFeed.imageUrl = podcast['image'] ? podcast['image']['url'] : false;
		rssFeed.imageWidth = podcast['image'] ? podcast['image']['width'] : false;
		rssFeed.imageHeight = podcast['image'] ? podcast['image']['height'] : false;

		rssFeed.managingEditor = podcast['managingEditor'];
		rssFeed.webMaster = podcast['webMaster'];
		rssFeed.locked = podcast['locked'];

		let episodes = [];
		podcast.item.forEach((episode) => {
			if (!episode['itunes:duration']) {
				episode['itunes:duration'] = '00:00';
			}

			episodes.push({
				title: episode.title,
				description: episode['itunes:summary'] ? episode['itunes:summary'] : episode['itunes:subtitle'] ? episode['itunes:subtitle'] : episode['description'] ? episode['description'] : '',
				author: episode.author ? episode.author : episode['itunes:author'] ? episode['itunes:author'] : false,
				imageUrl: episode['itunes:image'] ? episode['itunes:image']['href'] : false,
				explicit: episode['itunes:explicit'],
				keywords: episode['itunes:keywords'],
				subtitle: episode['itunes:subtitle'],
				itunesSummary: episode['itunes:summary'],
				date: new Date(Date.parse(episode.pubDate)),
				link: episode.link,
				guid: episode.guid ? episode.guid['#text'] : false,
				guidIsPermaLink: episode.guid ? episode.guid['isPermaLink'] == 'true' ? true : false : false,
				enclosureType: episode.enclosure ? episode.enclosure.type : false,
				enclosureLength: episode.enclosure ? episode.enclosure.length : false,
				encloseUrl: episode.enclosure ? episode.enclosure.url : false,
				duration: this.convertDurationToSeconds(episode['itunes:duration']),
				transcript: episode['podcast:transcript'],
				chapters: episode['podcast:chapters']
			});
		});
		rssFeed.items = episodes;

		console.log(rssFeed);
		return rssFeed;
	}
}
export default RSSParser;