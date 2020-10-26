import React from 'react';

import Grid from '@material-ui/core/Grid';

import CodePreview from 'components/CodePreview';

const RSSCodeItem = ({visual, code }) => {
	return (
		<Grid container>
			<Grid item xs={12} md={6} lg={6}>
				{visual}
			</Grid>
			<Grid item xs={12} md={6} lg={6}>
				<CodePreview code={code} />
			</Grid>
		</Grid>
	);
};
export default RSSCodeItem;