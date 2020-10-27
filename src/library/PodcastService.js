const searchHost = 'https://api.podcastindex.org/api/1.0/';
const authUrl = 'https://www.podfriend.com/simpleplayer/apigenerator.php';

var abortController = new AbortController();
var abortSignal = abortController.signal;

class PodcastService {
	/**
	* Get auth headers from server (to hide our api secret)
	*/
	static async getAuthHeaders() {
		var authResponse = await fetch(authUrl);
		let authInfo = await authResponse.json();
		return {
			'User-Agent': 'Podfriend Simple 1.0',
			'X-Auth-Date': authInfo.authDate,
			'X-Auth-Key': authInfo.authKey,
			'Authorization': authInfo.authString
		};
	}
	static async abortSearch() {
		abortController.abort();
	}
	/**
	* Search for a podcast
	*/
	static async search(query) {
		var authHeaders = await this.getAuthHeaders();

		var searchUrl = searchHost + 'search/byterm?q=' + encodeURIComponent(query) + '&max=20';

		abortController = new AbortController();
		abortSignal = abortController.signal;

		var searchResponse = await fetch(searchUrl,{
			headers: authHeaders,
			signal: abortSignal
		});
		return await searchResponse.json();
	}
	/**
	* Look up info about a podcast
	*/
	static async lookUp(podcastId) {
		var authHeaders = await this.getAuthHeaders();

		var lookUpUrl = searchHost + 'podcasts/byfeedid?id=' + encodeURIComponent(podcastId);

		var podcastInfoResponse = await fetch(lookUpUrl,{
			headers: authHeaders
		});
		return await podcastInfoResponse.json();
	}
}
export default PodcastService;