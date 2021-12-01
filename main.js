const url = "https://github.com/topics";

const cheerio = require("cheerio");
const request = require("request");
const getReposPageHtml = require("./reposPage");

request(url, cb);
function cb(err, response, html) {
	if (err) {
		console.log(err);
	} else if (response.statusCode == 404) {
		console.log("Page Not Found ");
	} else {
		getTopicLinks(html);
	}
}
function getTopicLinks(html) {
	let $ = cheerio.load(html);
	let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

	for (let i = 0; i < linkElemArr.length; i++) {
		let href = $(linkElemArr[i]).attr("href");
		let topic = href.split("/").pop();
		// console.log(topic);
		let fullLink = `https://github.com${href}`;
		// console.log(fullLink);
		getReposPageHtml(fullLink, topic);
	}
}
