import React from 'react';

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';

import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('xml', xml);

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