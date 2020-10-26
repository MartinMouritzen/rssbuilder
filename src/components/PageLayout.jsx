import React from 'react';

// import logo from 'images/podcastindex-logo.svg';

import { ThemeProvider } from '@material-ui/core/styles'
import 'components/PageLayout.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import theme from 'theme/Theme';

const PageLayout = ({children}) => {


	return (
		<div className="page">
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AppBar position="absolute">
					<Toolbar>
						<Typography component="h2" variant="h6" noWrap color="inherit">
							Podcast Index RSS Builder
						</Typography>
					</Toolbar>
				</AppBar>

				<Grid item xs={12} md={8} lg={6} className="root">
					<Paper className='introduction'>
						<Typography component="h1" variant="h1" color="textPrimary">
							Build a Podcast RSS feed, without knowing code!
						</Typography>
						<p>Using this tool you can craft an RSS file that supports the cutting edge of Podcasting.</p>
					</Paper>

					{children}
				</Grid>
			</ThemeProvider>
		</div>
	)
};

export default PageLayout;