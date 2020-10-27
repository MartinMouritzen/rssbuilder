import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import PodcastService from 'library/PodcastService';

let timeoutId = false;

function PodcastSearch({ searchQuery, onPodcastSelected, selectedPodcast }) {
	const [searchResults, setSearchResults] = useState(false);

	useEffect(() => {
		PodcastService.abortSearch();
		setSearchResults(false);

		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			PodcastService.search(searchQuery)
			.then((returnedSearchResults) => {
				setSearchResults(returnedSearchResults);
			});
		},500);
	},[searchQuery]);

	return (
		<div className="searchPane">
			<h1>Searching for &quot;{searchQuery}&quot;</h1>

			{ searchResults === false &&
				<div className="loading">
					<div>
						Loading search results
					</div>

					<CircularProgress />
				</div>
			}
			{ searchResults !== false &&
				<div>
					<h2>Found {searchResults.count} result{searchResults.count !== 1 ? 's' : ''}, select your podcast and press &quot;Import&quot; to continue</h2>
				</div>
			}
			{ searchResults !== false && searchResults.count > 0 &&
				searchResults.feeds.map((searchResult,index) => {
					return (
						<div className={'searchResult' + (selectedPodcast.id === searchResult.id ? ' selectedPodcast' : '')} onClick={() => { onPodcastSelected(searchResult); } }>
							<img src={searchResult.artwork ? searchResult.artwork : searchResult.image} alt={searchResult.title + ' artwork'} />

							<div className="title">{searchResult.title}</div>
							<div className="author">{searchResult.author}</div>
						</div>
					);
				})
			}
		</div>
	);
}
export default PodcastSearch;