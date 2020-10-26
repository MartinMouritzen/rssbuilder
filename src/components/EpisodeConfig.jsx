import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

import RSSCodeItem from 'components/RSSCodeItem';

import Paper from '@material-ui/core/Paper';

const RSSItem = ({ rssFeed, index, episode, onEpisodeChange }) => {
	/*
	const [title,setTitle] = useState(episode.title);
	const [description,setDescription] = useState(episode.description);
	const [link,setLink] = useState(episode.link);
	*/

	const onValueChange = (event) => {
		rssFeed.items[index][event.target.id] = event.target.value;
		rssFeed = Object.assign({}, rssFeed);
		onEpisodeChange();
	};

	return (
		<Paper className="episodeCard configElement">
			<FormControl fullWidth>

				<Typography component="h2" variant="h4" color="primary" style={{ marginBottom: 10 }}>
					Episode #{(index + 1)}
				</Typography>

				<TextField
					label="Episode title (eg. &quot;My favorite bunny&quot;)"
					id="title"
					value={episode.title}
					required
					onChange={onValueChange}
				/>

				<TextField
					label="Description (eg. &quot;This episode is about...&quot;)"
					id="description"
					value={episode.description}
					multiline
					required
					onChange={onValueChange}
				/>

				<TextField
					label="Link to view episode information (eg. &quot;https://www.example.com/mypodcastepisode/&quot;)"
					id="link"
					value={episode.link}
					onChange={onValueChange}
				/>

				<TextField
					label="Author name (eg. &quot;Martin Mouritzen&quot;)"
					id="author"
					value={episode.author}
					onChange={onValueChange}
				/>


			</FormControl>
		</Paper>
	);
};
export default RSSItem;