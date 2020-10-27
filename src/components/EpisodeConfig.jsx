import React, { useState, useEffect } from 'react';


import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
	const onCheckChange = (event) => {
		rssFeed.items[index][event.target.id] = event.target.checked ? true : false;
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
					onChange={onValueChange}
				/>

				<FormControl fullWidth style={{ marginTop: 20 }}>
					<TextField
						label="Description (eg. &quot;This episode is about...&quot;)"
						id="description"
						value={episode.description}
						multiline
						rows={10}
						variant="outlined"
						onChange={onValueChange}
					/>
				</FormControl>

				<TextField
					label="Link to view episode information (eg. &quot;https://www.example.com/mypodcastepisode/&quot;)"
					id="link"
					value={episode.link}
					onChange={onValueChange}
				/>

				<TextField
					label="Unique ID for episode"
					id="guid"
					value={episode.guid}
					onChange={onValueChange}
				/>

				<FormControl style={{marginTop: 5}}>
					<InputLabel htmlFor="guidIsPermaLink">Is the unique ID a link to the episode?</InputLabel>
					<Select
						native
						value={episode.guidIsPermaLink}
						onChange={onValueChange}
						inputProps={{
							name: 'Is the unique ID a link to the episode?',
							id: 'guidIsPermaLink',
						}}
						>
						<option>Yes</option>
						<option>No</option>
					</Select>
				</FormControl>

				<TextField
					label="Author name (eg. &quot;Martin Mouritzen&quot;)"
					id="author"
					value={episode.author}
					onChange={onValueChange}
				/>


				<TextField
					label="Short description (max 255 characters)"
					id="subtitle"
					value={episode.subtitle}
					onChange={onValueChange}
				/>

				<Grid container>
					<Grid item xs={8} md={8} lg={8}>
						<FormControl fullWidth>
							<TextField
								label="Link to cover art for the episode"
								id="imageUrl"
								value={episode.imageUrl}
								onChange={onValueChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={1} md={1} lg={1} />
					<Grid item xs={3} md={3} lg={3}>
						{ rssFeed.imageUrl &&
							<img src={episode.imageUrl} style={{ width: '90%', height: 'auto', maxWidth: 300, maxHeight: 300 }}/>
						}
					</Grid>
				</Grid>

			</FormControl>
		</Paper>
	);
};
export default RSSItem;