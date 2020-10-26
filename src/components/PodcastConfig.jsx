import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

import RSSCodeItem from 'components/RSSCodeItem';

const PodcastConfig = ({ rssFeed, episodes, showCodePreview }) => {
	const [code,setCode] = useState('');

	const [usingFeed,setUsingFeed] = useState(rssFeed);

	const [title,setTitle] = useState(rssFeed.title);
	const [description,setDescription] = useState(rssFeed.description);
	const [link,setLink] = useState(rssFeed.link);
	const [language,setLanguage] = useState(rssFeed.language);
	const [copyright,setCopyright] = useState(rssFeed.copyright);
	const [editor,setEditor] = useState(rssFeed.managingEditor);
	const [editorEmail,setEditorEmail] = useState(rssFeed.editorEmail);
	

	const [webMaster,setWebMaster] = useState(rssFeed.webMaster);

	const [showAdvancedPeopleFields,setShowAdvancedPeopleFields] = useState(false);

	const onValueChange = (event) => {
		rssFeed[event.target.id] = event.target.value;
		rssFeed = Object.assign({}, rssFeed);
		setUsingFeed(rssFeed);
	};

	useEffect(() => {
		var code = rssFeed.generatePodcastInfoXML();
		setCode(code);
	// },[rssFeed,episodes]);
	},[usingFeed,episodes]);
	

	const visualElement = (
		<div className="configElement">
			<FormControl fullWidth>

				<Typography component="h2" variant="h4" color="primary" style={{ marginBottom: 10 }}>
					Required information
				</Typography>

				<TextField
					label="Podcast name (eg. &quot;My amazing podcast&quot;)"
					id="title"
					value={rssFeed.title}
					required
					onChange={onValueChange}
				/>

				<TextField
					label="Description for your podcast"
					id="description"
					value={rssFeed.description}
					multiline
					required
					onChange={onValueChange}
				/>

				<Typography component="h2" variant="h4" color="primary" style={{ marginTop: 30, marginBottom: 10  }}>
					Extra information
				</Typography>

				<TextField
					label="Website URL (eg. &quot;https://www.example.com&quot;)"
					id="link"
					value={rssFeed.link}
					onChange={onValueChange}
				/>

				<TextField
					label="Language (eg. &quot;en&quot;)"
					id="language"
					value={rssFeed.language}
					onChange={onValueChange}
				/>

				<TextField
					label="Copyright (eg. &quot;John Doe&quot;)"
					id="copyright"
					value={rssFeed.copyright}
					onChange={onValueChange}
				/>

				{ showAdvancedPeopleFields === false &&
					<Typography component="h2" variant="h4" color="primary" style={{ marginTop: 30, marginBottom: 10 }}>
						A bit about you
						</Typography>
				}
				{ showAdvancedPeopleFields !== false &&
					<Typography component="h2" variant="h4" color="primary" style={{ marginTop: 30, marginBottom: 10 }}>
						About the people managing your podcast
					</Typography>
				}

				<FormControlLabel
					control={<Switch checked={showAdvancedPeopleFields} onChange={(event) => { setShowAdvancedPeopleFields(event.target.checked); }} />}
					label="There's more than one person managing the podcast"
				/>

				<TextField
					label="Editor"
					id="managingEditor"
					value={rssFeed.managingEditor}
					onChange={onValueChange}
				/>

				<TextField
					label="Editor e-mail"
					id="editorEmail"
					value={rssFeed.editorEmail}
					onChange={onValueChange}
				/>

				<FormControl fullWidth style={{ display: 'inline-flex', height: showAdvancedPeopleFields ? 'auto' : 0, overflow: 'hidden', transition: 'all 0.3s' }}>
					<TextField
						label="Webmaster"
						id="webMaster"
						value={rssFeed.webMaster}
						onChange={onValueChange}
					/>
				</FormControl>

			</FormControl>
		</div>
	);

	if (showCodePreview) {
		return (
			<RSSCodeItem
				visual={visualElement}
				code={code}
			/>
		);
	}
	else {
		return visualElement;
	}

};
export default PodcastConfig;