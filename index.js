var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');

var jsonArray = [];
var anchors = [];
var counter = 0;


var cnm = new Crawler({
	maxConnections: 10,
	strictSSL: false,
	
	callback: function (err, res, done) {
		counter++;
		console.log('counter: ' + counter);
		
		var $ = res.$;
		
		var alts = findImageAlts($);
		console.log("title: " + $('title').first().text())
		console.log(alts);
		var altsEqalsTitle = altsEqualsTitle(alts,$('title').first().text());
		
		
		console.log(altsEqalsTitle);
		
		$('a').each((index, value) =>{
			if ($(value).attr('href').includes("https://www.cnm.edu")) {
				var href = $(value).attr('href');
				con
				if (!anchors.includes(href)) {
					anchors.push(href);
					console.log(href);
				}
				
			}
		})
		

		// if (counter < 500) {
			for (let a of anchors) {
				cnm.queue({
					uri: a,
					strictSSL: false
				})
			}
			
		// }
	}
})

var findImageAlts = function ($) {
	var alts = [];
	$('img').each((index, value) => {
		// console.log($(value).attr('alt'))
		alts.push($(value).attr('alt'))
		//console.log('**********')
	})
	
	return alts;
}

var altsEqualsTitle = (alts,title) => {
	for (alt in alts) {
		if (alt === title) return true;
	}
	
	return false;
}



cnm.queue({
	uri: 'https://cnm.edu',
	strictSSL: false
})

// var craigslist = new Crawler({
// 	maxConnections : 10,
// 	callback : function (error, res, done) {
// 		var $ = res.$;
//
// 		$('a').each(function(index, a) {
// 			var jsonOutput = {};
//
// 			var dataSplit = $(a).text().split(' ');
// 			jsonOutput.price = dataSplit[1];
// 			jsonOutput.date = dataSplit[5] + dataSplit[6];
// 			jsonOutput.siteLink = "http://sfbay.craigslist.org" + $(a).children().attr('href');
//
// 			console.log("price:" + jsonOutput.price + "  date:" + jsonOutput.date
// 				+ "   date:" + jsonOutput.siteLink)
//
// 			jsonArray.push(jsonOutput)
//
// 		});
//
// 		var rangeNumber = $($('.range')[0]).text().split(' ')[2]
//
// 		console.log("We are on item range: " + rangeNumber)
//
// 		var toQueueUrl = 'http://sfbay.craigslist.org/search/bia?s=' + rangeNumber
//
// 		if (parseInt(rangeNumber) < 1000) {
// 			craigslist.queue(toQueueUrl);
// 		} else {
// 			fs.appendFile('craigsListData.txt', JSON.stringify(jsonArray), function (err) {
// 				if (err) throw err;
// 				console.log('The "data to append" was appended to file!');
// 			});
// 		}
// 	}
// });
//
// craigslist.queue('https://cnm.edu')