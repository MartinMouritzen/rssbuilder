import React, { useState } from 'react';

import 'components/RSSBuilder.scss';

import RSSImportTool from 'components/RSSImportTool';
import FeedConfig from 'components/FeedConfig';

import RSSFeed from 'library/RSSFeed';

const App = () => {
	const [rssFeed,setRssFeed] = useState(new RSSFeed());

	const onImport = (rssFile) => {
		setRssFeed(rssFile);
	};

	return (
		<div className="RSSBuilder">
			<RSSImportTool rssFeed={rssFeed} onImport={onImport}/>

			<FeedConfig rssFeed={rssFeed} />

		</div>
	);
}

export default App;
