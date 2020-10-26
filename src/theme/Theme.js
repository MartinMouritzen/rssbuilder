import { createMuiTheme } from '@material-ui/core/styles';

// Color inspiration from https://flatuicolors.com/palette/defo

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgba(26, 188, 156,1.0)',
			contrastText: '#FFFFFF'
		},
		secondary: {
			main: '#272c34',
		},
	},
	typography: {
		h1: {
			fontSize: '1.5rem',
			fontWeight: 500
		},
		h2: {
			
		},
		h3: {
			fontSize: '1.1rem',
			fontWeight: 500,
			lineHeight: '1.6',
			letterSpacing: '0.0075em'
		},
		h4: {
			fontSize: '1.1rem'
		},
		h5: {
			fontSize: '1.2rem'
		},
		h6: {
			fontSize: '1.1rem'
		}
	}
});

export default theme;