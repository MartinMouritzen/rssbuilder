
import React, { useState, useRef } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import RSSParser from 'library/RSSParser';

import PodcastSearch from 'components/import/PodcastSearch';

const RSSURLImporter = ({ onImportFinished }) => {
	const [podcast,setPodcast] = useState(false);
	const [podcastName,setPodcastName] = useState('');
	const [importing,setImporting] = useState(false);
	const [error,setError] = useState(false);

	const scrollToImportButton = () => window.scrollTo(0, importButtonRef.current.offsetTop);
	const importButtonRef = useRef(null)

	const startImport = async() => {
		setImporting(true);
		setError(false);

		let response = false;

		try {
			response = await fetch(podcast.url);
		}
		catch (exception) {
			// Probably failed because of cors. Let's try our fallback!
			try {
				response = await fetch('https://www.podfriend.com/tmp/rssproxy.php?rssUrl=' + encodeURI(podcast.url));
			}
			catch(exception) {
				console.log(exception);
				setError(true);
			}
		}
		if (response) {
			var responseText = await response.text();
			
			var rssParser = new RSSParser(responseText);
			var rssFeed = rssParser.parse();

			// We'll give it a bit of extra time so the user actually sees something. Otherwise the UI seems confusing
			setTimeout(() => {
				onImportFinished(rssFeed);
			},2000);
		}
	};

	const onPodcastNameChange = (event) => {
		setPodcastName(event.target.value);
	};

	const restartImport = () => {
		setError(false);
		setImporting(false);
	};

	const onPodcastSelected = (podcast) => {
		setPodcast(podcast);
		scrollToImportButton();
	};

	return (
		<>
			{ error !== false &&
				<div>
					<div>
						<b>Sorry, there was an error parsing your feed. The tool improves every day. Please file a bug report on <a href="https://github.com/MartinMouritzen/rssbuilder">Github!</a></b>
					</div>

					<Button onClick={restartImport} variant="contained" color="primary" style={{ marginTop: 10 }}>Start over</Button>
				</div>
			}
			{ error === false &&
				<>
					{ importing !== false &&
						<div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
							<CircularProgress />
							<div style={{ marginTop: 10 }}>Importing your RSS feed</div>
						</div>
					}
					{ importing === false &&
						<FormControl fullWidth>
							<Typography component="h2" variant="h4" color="primary" style={{ marginBottom: 10 }}>
								Find your podcast by searching below
							</Typography>

							<TextField
								label="Your podcast name"
								value={podcastName}
								required
								onChange={onPodcastNameChange}
							/>

							{ podcastName &&
								<PodcastSearch searchQuery={podcastName} onPodcastSelected={onPodcastSelected} selectedPodcast={podcast} />
							}

							<Button ref={importButtonRef} onClick={startImport} variant="contained" color="primary" disabled={(podcast ? false : true )} style={{ marginTop: 10 }}>Import</Button>
						</FormControl>
					}
				</>
			}
		</>
	);
};
export default RSSURLImporter;