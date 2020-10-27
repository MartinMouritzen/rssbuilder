import React, { useState, useEffect } from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Grid from '@material-ui/core/Grid';

import languages from 'library/languageCodes';

import Typography from '@material-ui/core/Typography';

import RSSCodeItem from 'components/RSSCodeItem';

const PodcastConfig = ({ rssFeed, episodes, showCodePreview }) => {
	const [code,setCode] = useState('');

	const [usingFeed,setUsingFeed] = useState(rssFeed);

	const [showAdvancedPeopleFields,setShowAdvancedPeopleFields] = useState(false);

	const onValueChange = (event) => {
		rssFeed[event.target.id] = event.target.value;
		rssFeed = Object.assign({}, rssFeed);
		setUsingFeed(rssFeed);
	};

	useEffect(() => {
		var code = rssFeed.generatePodcastInfoXML(true);
		setCode(code);
	// },[rssFeed,episodes]);
	},[rssFeed,usingFeed,episodes]);
	

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
					rows={10}
					variant="outlined"
					multiline
					required
					onChange={onValueChange}
				/>

				<TextField
					label="Short summary about your podcast"
					id="summary"
					value={rssFeed.summary}
					multiline
					onChange={onValueChange}
				/>

				<TextField
					label="Keywords for your podcast, separated by comma &quot;,&quot;"
					id="keywords"
					value={rssFeed.keywords}
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

				<FormControl style={{marginTop: 5}}>
				<InputLabel htmlFor="language">Language</InputLabel>
				<Select
					native
					value={rssFeed.language}
					onChange={onValueChange}
					inputProps={{
						name: 'Language',
						id: 'language',
					}}
					>
					{ languages.map((language) => {
						return (
							<option value={language[1]} key={language[1]}>{language[0]}</option>
						)
					} ) }
				</Select>
				</FormControl>

				<TextField
					label="Copyright (eg. &quot;John Doe&quot;)"
					id="copyright"
					value={rssFeed.copyright}
					onChange={onValueChange}
				/>

				<FormControl style={{marginTop: 5}}>
					<InputLabel htmlFor="explicit">Is the podcast explicit?</InputLabel>
					<Select
						native
						value={rssFeed.explicit}
						onChange={onValueChange}
						inputProps={{
							name: 'Is the podcast explicit?',
							id: 'explicit',
						}}
						>
						<option key='yes'>Yes</option>
						<option key='no'>No</option>
					</Select>
				</FormControl>

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

				<FormControl fullWidth style={{ display: 'inline-flex', height: showAdvancedPeopleFields ? 'auto' : 0, overflow: 'hidden', transition: 'all 0.3s' }}>
					<TextField
						label="Webmaster"
						id="webMaster"
						value={rssFeed.webMaster}
						onChange={onValueChange}
					/>

					<TextField
						label="Author"
						id="author"
						value={rssFeed.author}
						onChange={onValueChange}
					/>

					<TextField
						label="Owner"
						id="owner"
						value={rssFeed.owner}
						onChange={onValueChange}
					/>

					<TextField
						label="Owner e-mail"
						id="ownerEmail"
						value={rssFeed.ownerEmail}
						onChange={onValueChange}
					/>
				</FormControl>

				<Typography component="h2" variant="h4" color="primary" style={{ marginTop: 30, marginBottom: 10 }}>
					The image representing your podcast
				</Typography>

				<p>This image will be displayed in podcast apps to represent your podcast.</p>

				<Grid container>
					<Grid item xs={8} md={8} lg={8}>
						<FormControl fullWidth>
							<TextField
								label="Link to cover art for the podcast"
								id="imageUrl"
								value={rssFeed.imageUrl}
								onChange={onValueChange}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={1} md={1} lg={1} />
					<Grid item xs={3} md={3} lg={3}>
						{ rssFeed.imageUrl &&
							<img src={rssFeed.imageUrl} style={{ width: '90%', height: 'auto', maxWidth: 300, maxHeight: 300 }} alt="" />
						}
					</Grid>
				</Grid>

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