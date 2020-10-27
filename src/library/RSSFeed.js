/**
* A Javascript representation of a RSS Feed
*/
class RSSFeed {
	title = '';
	description = '';

	link = '';
	language = 'en';
	copyright = '';

	managingEditor = '';
	editorEmail = '';
	webMaster = '';

	items = [];

	generateXML() {
		var xml = '';

		xml += this.generatePodcastInfoXML();
		xml += this.generatePodcastItemXML();

		return xml;
	}
	/**
	*
	*/
	generatePodcastInfoXML() {
		let code = '';
		code += '<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">\n';
		code += '\t<channel>\n';
			code += `\t\t<title>${this.title}</title>\n`;
			code += `\t\t<description>${this.description}</description>\n`;

			if (this.link) {
				code += `\t\t<link>${this.link}</link>\n`;
			}
			if (Array.isArray(this.extraLinks)) {
				for(var i=0;i<this.extraLinks.length;i++) {
					code += `\t\t<link`;
					for (const [key, value] of Object.entries(this.extraLinks[i])) {
						code += ` ${key}=${value}`;
					}
					code += `>\n`;
				}
			}
			if (this.docs) {
				code += `\t\t<docs>${this.docs}</docs>\n`;
			}
			if (this.language) {
				code += `\t\t<language>${this.language}</language>\n`;
			}
			code += `\t\t<generator>Podcast Index RSS Builder</generator>\n`;

			if (this.pubDate) {
				code += `\t\t<pubDate>${this.pubDate}</pubDate>\n`;
			}
			if (this.lastBuildDate) {
				code += `\t\t<lastBuildDate>${this.lastBuildDate}</lastBuildDate>\n`;
			}
			
			if (this.copyright) {
				code += `\t\t<copyright>${this.copyright}</copyright>\n`;
			}
			if (this.managingEditor) {
				code += `\t\t<managingEditor>${this.managingEditor}`;
				/*
				if (this.editorEmail && this.editorEmail.length > 0) {
					code += ` (${this.editorEmail})`;
				}
				*/
				code += '</managingEditor>\n';
			}

			if (this.imageUrl) {
				code += `\t\t<image>\n`;
					code += `\t\t\t<url>${this.imageUrl}</url>\n`;
					if (this.imageWidth) {
						code += `\t\t\t<width>${this.imageWidth}</width>\n`;
					}
					if (this.imageHeight) {
						code += `\t\t\t<height>${this.imageHeight}</height>\n`;
					}
				code += `\t\t</image>\n`;
			}

			if (this.webMaster) {
				code += `\t\t<webMaster>${this.webMaster}</webMaster>\n`;
			}

			code += this.generatePodcastItemsXML();

			code += '\t</channel>\n';
			code += '</rss>';
		return code;
	}
	/**
	*
	*/
	generatePodcastItemsXML() {
		return this.items.map((item,index) => {
			return this.generatePodcastItemXML(item);
		});
	}
	addEpisodeLine(item,tagName,attributeName = tagName) {
		if (item[attributeName]) {
			return `\t\t\t<${tagName}>${item[attributeName]}</${tagName}>\n`;
		}
		else {
			return '';
		}
	}
	/**
	*
	*/
	generatePodcastItemXML(item) {
		let code = '';
		code += '\t\t<item>\n';
		code += this.addEpisodeLine(item,'title');
		code += this.addEpisodeLine(item,'description');
		code += this.addEpisodeLine(item,'link');
		code += this.addEpisodeLine(item,'itunes:subtitle','subtitle');

		if (item.imageUrl) {
			code += `\t\t\t<itunes:image href="${item.imageUrl}" />\n`;
		}
		

		if (item.enclosureUrl) {
			code += `\t\t\t<enclosure url="'${item.enclosureUrl}'"`;
				if (item.enclosureLength) {
					code += ` length="${item.enclosureLength}"`;
				}
				if (item.enclosureType) {
					code += ` type="${item.enclosureType}"`;
				}
			code += ' />\n';
		}
		if (item.guid) {
			code += '\t\t\t<guid';
			if (item.guidIsPermaLink) {
				code += ' isPermaLink="true"';
			}
			code += `>${item.guid}</guid>\n`;
		}
		code += this.addEpisodeLine(item,'pubDate');

		if (item.author) {
			code += `\t\t\t<author>${item.author}</author>\n`;
			code += `\t\t\t<itunes:author>${item.author}</itunes:author>\n`;
		}
		code += '\t\t</item>\n';
		return code;
	}
}
export default RSSFeed;