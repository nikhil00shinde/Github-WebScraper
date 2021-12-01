const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuesPageHtml(url, topic, repoName) {
	request(url, cb);
	function cb(err, response, html) {
		if (err) {
			console.log(err);
		} else if (response.statusCode == 404) {
			console.log("Page Not Found ");
		} else {
			getIssues(html);
		}
	}
	function getIssues(html) {
		let $ = cheerio.load(html);

		let issueElemArr = $(
			".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
		);

		let arr = [];
		for (let i = 0; i < issueElemArr.length; i++) {
			let link = $(issueElemArr[i]).attr("href");
			// console.log(link);
			arr.push("https://github.com" + link);
		}
		// console.log(topic, "        ", arr);
		let folderPath = path.join(__dirname, topic);
		dirCreater(folderPath);
		let filePath = path.join(folderPath, repoName + ".pdf");
		let text = JSON.stringify(arr);
		let pdfDoc = new pdfkit();
		pdfDoc.pipe(fs.createWriteStream(filePath));
		pdfDoc.text(text);
		pdfDoc.end();
		// fs.writeFileSync(filePath, );
	}
}

function dirCreater(folderPath) {
	if (fs.existsSync(folderPath) == false) {
		fs.mkdirSync(folderPath);
	}
}

module.exports = getIssuesPageHtml;
