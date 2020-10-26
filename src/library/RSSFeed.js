/**
* A Javascript representation of a RSS Feed
*/
class RSSFeed {
	title = '';
	description = '';

	link = '';
	language = '';
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
			if (this.language) {
				code += `\t\t<language>${this.language}</language>\n`;
			}
			if (this.copyright) {
				code += `\t\t<copyright>${this.copyright}</copyright>\n`;
			}
			if (this.managingEditor) {
				code += `\t\t<managingEditor>${this.managingEditor} (${this.editorEmail})</managingEditor>\n`;
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
		if (item.author) {
			code += `\t\t\t<author>${item.author}</author>`;
			code += `\t\t\t<itunes:author>${item.author}</itunes:author>`;
		}
		code += '\t\t</item>\n';
		return code;
	}
}
export default RSSFeed;