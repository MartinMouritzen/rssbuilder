
import React, { useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import RSSParser from 'library/RSSParser';

const RSSPasteImporter = ({ onImportFinished }) => {
	const [feedText,setFeedText] = useState('');
	const [importing,setImporting] = useState(false);
	const [error,setError] = useState(false);

	const startImport = async() => {
		setImporting(true);
		setError(false);

		var rssParser = new RSSParser(feedText);

		try {
			var rssFeed = rssParser.parse();

			// We'll give it a bit of extra time so the user actually sees something. Otherwise the UI seems confusing
			setTimeout(() => {
				onImportFinished(rssFeed);
			},2000);
		}
		catch (exception) {
			console.log(exception);
			setError(true);
		}
	};

	const onFeedTextChange = (event) => {
		setFeedText(event.target.value);
	};

	const restartImport = () => {
		setError(false);
		setImporting(false);
	};

	return (
		<>
			{ error !== false &&
				<div>
					<div>
						<b>We could not parse your feed. Did you paste correct XML?</b>
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
								Import your RSS feed
							</Typography>
							<p>
								To import your RSS feed to the editor, please fill in the URL (link) below.<br />
								You can typically find this at your existing podcast host.
							</p>

							<TextField
								label="your RSS content"
								value={feedText}
								multiline
								rows={10}
								variant="outlined"
								required
								onChange={onFeedTextChange}
							/>

							<Button onClick={startImport} variant="contained" color="primary" disabled={(feedText.length > 0 ? false : true )} style={{ marginTop: 10 }}>Import</Button>
						</FormControl>
					}
				</>
			}
		</>
	);
};
export default RSSPasteImporter;