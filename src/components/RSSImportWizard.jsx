import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import RSSFeed from 'library/RSSFeed';

import RSSURLImporter from 'components/import/RSSURLImporter';
import RSSPasteImporter from 'components/import/RSSPasteImporter';

const RSSImportTool = ({ onImport }) => {

	return (
		<>
			<Typography component="h2" variant="h3" color="textPrimary" className="configTitle">
				How do you want to continue?
			</Typography>


			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					I want to import RSS from a link
				</AccordionSummary>
				<AccordionDetails>
					<RSSURLImporter onImportFinished={onImport} />
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					I want to copy & paste my existing RSS
				</AccordionSummary>
				<AccordionDetails>
					<RSSPasteImporter onImportFinished={onImport} />
				</AccordionDetails>
			</Accordion>

			<p style={{ marginTop: 20}}>Or...</p>

			<Button onClick={() => { onImport(new RSSFeed()); }} variant="contained" color="primary"  style={{ marginTop: 0}}>Start with a blank podcast</Button>
		</>
	);
};
export default RSSImportTool;