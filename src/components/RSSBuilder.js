import React, { useState } from 'react';

import 'components/RSSBuilder.scss';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import RSSImportWizard from 'components/RSSImportWizard';
import FeedConfig from 'components/FeedConfig';

import RSSFeed from 'library/RSSFeed';

const App = () => {
	const [rssFeed,setRssFeed] = useState(new RSSFeed());

	const [activeStep,setActiveStep] = useState(0);

	const resetSteps = () => {
		setRssFeed(new RSSFeed());
		setActiveStep(0);
	};

	const onImport = (rssFile) => {
		setRssFeed(rssFile);
		setActiveStep(1);
	};

	return (
		<div className="RSSBuilder">

			<Stepper activeStep={activeStep} style={{ marginBottom: 20 }}>
				<Step onClick={resetSteps} style={{ cursor: 'pointer' }}>
					<StepLabel>Import, paste or start from scratch</StepLabel>
				</Step>
				<Step>
					<StepLabel>Edit the information</StepLabel>
				</Step>
				<Step>
					<StepLabel>Download the RSS file</StepLabel>
				</Step>
			</Stepper>

			{ activeStep === 0 &&
				<RSSImportWizard rssFeed={rssFeed} onImport={onImport}/>
			}
			{ activeStep === 1 &&
				<FeedConfig rssFeed={rssFeed} />
			}
		</div>
	);
}

export default App;
