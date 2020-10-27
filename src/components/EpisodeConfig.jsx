import React from 'react';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

const RSSItem = ({ rssFeed, index, episode, onEpisodeChange }) => {
	const onValueChange = (event) => {
		rssFeed.items[index][event.target.attributeid] = event.target.value;
		rssFeed = Object.assign({}, rssFeed);
		onEpisodeChange();
	};

	return (
		<Paper className="episodeCard configElement">
			<FormControl fullWidth>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>

					<Typography component="h2" variant="h4" color="primary" style={{ marginBottom: 10 }}>
						Episode #{(index + 1)}
					</Typography>

					<TextField
						label="Episode title (eg. &quot;My favorite bunny&quot;)"
						attributeid="title"
						value={episode.title}
						onChange={onValueChange}
					/>

					<FormControl fullWidth style={{ marginTop: 20 }}>
						<TextField
							label="Description (eg. &quot;This episode is about...&quot;)"
							attributeid="description"
							value={episode.description}
							multiline
							rows={10}
							variant="outlined"
							onChange={onValueChange}
						/>
					</FormControl>

					<TextField
						label="Short description of the episode (max 255 characters)"
						attributeid="subtitle"
						value={episode.subtitle}
						onChange={onValueChange}
					/>

					<TextField
						label="Keywords for the episode, separated by comma &quot;,&quot;"
						attributeid="keywords"
						value={episode.keywords}
						onChange={onValueChange}
					/>

					<TextField
						label="Link to view episode information (eg. &quot;https://www.example.com/mypodcastepisode/&quot;)"
						attributeid="link"
						value={episode.link}
						onChange={onValueChange}
					/>

					<DateTimePicker
						label="Publish date"
						inputVariant="outlined"
						value={episode.date}
						onChange={onValueChange}
					/>

					<TextField
						label="Unique ID for episode"
						attributeid="guid"
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
								attributeid: 'guidIsPermaLink',
							}}
							>
							<option key='yes'>Yes</option>
							<option key='no'>No</option>
						</Select>
					</FormControl>

					<TextField
						label="Author name (eg. &quot;Martin Mouritzen&quot;)"
						attributeid="author"
						value={episode.author}
						onChange={onValueChange}
					/>

					<FormControl style={{marginTop: 5}}>
						<InputLabel htmlFor="explicit">Is the episode explicit?</InputLabel>
						<Select
							native
							value={episode.explicit}
							onChange={onValueChange}
							inputProps={{
								name: 'Is the episode explicit?',
								attributeid: 'explicit',
							}}
							>
							<option key='yes'>Yes</option>
							<option key='no'>No</option>
						</Select>
					</FormControl>

					<Grid container>
						<Grid item xs={8} md={8} lg={8}>
							<FormControl fullWidth>
								<TextField
									label="Link to cover art for the episode"
									attributeid="imageUrl"
									value={episode.imageUrl}
									onChange={onValueChange}
								/>

<TextField
									label="Link to audio or video file"
									attributeid="enclosureUrl"
									value={episode.enclosureUrl}
									onChange={onValueChange}
								/>

								<TextField
									label="Audio or video type (most likely &quot;audio/mpeg&quot;)"
									attributeid="enclosureType"
									value={episode.enclosureType}
									onChange={onValueChange}
								/>

								<TextField
									label="Audio/video file length. Leave blank if unsure."
									attributeid="enclosureLength"
									value={episode.enclosureLength}
									onChange={onValueChange}
								/>

								<TextField
									label="Link to chapters file"
									attributeid="chaptersUrl"
									value={episode.chaptersUrl}
									onChange={onValueChange}
								/>

							</FormControl>
						</Grid>
						<Grid item xs={1} md={1} lg={1} />
						<Grid item xs={3} md={3} lg={3}>
							{ rssFeed.imageUrl &&
								<img src={episode.imageUrl} style={{ width: '90%', height: 'auto', maxWidth: 300, maxHeight: 300 }} alt="" />
							}
						</Grid>
					</Grid>
				</MuiPickersUtilsProvider>
			</FormControl>
		</Paper>
	);
};
export default RSSItem;