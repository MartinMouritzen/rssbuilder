import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import RSSFeed from 'library/RSSFeed';

const RSSImportTool = ({ onImport }) => {
	const parseRSSFeed = () => {

	};

	const startImport = () => {
		var newRssFeed = new RSSFeed();
		newRssFeed.title = 'aloha';
		newRssFeed.description = 'I am imported';
		onImport(newRssFeed);
	};

	return (
		<Paper className="importTool">
			RSSImportTool

			paste or url (fallback to proxy if cors)

			<Button onClick={startImport}>Import</Button>
		</Paper>
	);
};
export default RSSImportTool;