import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const RSSFeedCodePreview = ({ code }) => {
	return (
		<div className="codePreviewContainer">
			<div className="codePreviewHeader">RSS Preview</div>
			<SyntaxHighlighter language="xml"  style={hybrid}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
};
export default RSSFeedCodePreview;