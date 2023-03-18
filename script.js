document.getElementById("season").value = sessionStorage.getItem("season");

if (document.getElementById("season").value != "") { 
	document.getElementById("carousel").style.display = "flex";
	document.getElementById("season").setAttribute("style", "border-top-right-radius: 0px;");
}

if (document.getElementById("season").value == "") {
	document.getElementById("carousel").style.display = "none";
	document.getElementById("season").setAttribute("style", "border-top-right-radius: 10px;");
	document.getElementById("container").setAttribute("style", "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;");
	document.getElementById("player").style.height = "auto";
	document.getElementById("season").value = "0";
	document.getElementById("infoText").style.display = "block";
	document.getElementById("scrollbtnTop").style.display = "none";
	document.getElementById("scrollbtnBottom").style.display = "none";
	document.getElementById("controlbtnPrev").style.display = "none";
	document.getElementById("controlbtnNext").style.display = "none";
	document.getElementById("outerDiv").style.width = "600px";
	document.getElementById("synopsisDiv").style.display = "none";
	document.getElementById("outerProgress").style.display = "block";
	var t = localStorage.getItem("duration");
	var s = localStorage.getItem("timestamp");
	var p = (s/t)*100;
	document.getElementById("progress-bar").style.width = p + "%";
	var xa = window.matchMedia("(max-width: 980px)")
	if (xa.matches) {
		document.getElementById("season").setAttribute("style", "position: relative; left: -10px; border-top-right-radius: 10px;");
		document.getElementById("container").setAttribute("style", "position: relative; left: -10px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;");
		document.getElementById("outerDiv").setAttribute("style", "max-width: 550px;");
	}
	var xc = window.matchMedia("(max-width: 670px)")
	if (xc.matches) {
		document.getElementById("outerDiv").setAttribute("style", "max-width: 350px;");
	}
}

var id;
var url;
var season = sessionStorage.getItem("season");
var filename = "episodes.json";

function getFocus() {
  document.querySelector(".plyr").focus();
}

if (localStorage.getItem("progress-title")) {
	document.getElementById("progress-thumbnail").src = localStorage.getItem("progress-thumbnail");
	document.getElementById("progress-title").innerHTML = localStorage.getItem("progress-title");
	document.getElementById("progress-synopsis").innerHTML = localStorage.getItem("progress-synopsis");
	document.getElementById("progress").onclick = function n() {
		id = localStorage.getItem("progress-id");
		var currentVideoUrl = "https://www.youtube.com/embed/" + id;
		document.getElementById("player").setAttribute("data-plyr-embed-id", currentVideoUrl);
		const player = new Plyr('#player');
		window.player = player;
		player.poster = "https://img.youtube.com/vi/" + id + "/0.jpg";
		var time = localStorage.getItem("timestamp");
		player.on('ready', (event) => {
			player.currentTime = +time;
		});
		player.on('play', () => {
			setInterval( function() {
				localStorage.setItem("timestamp", player.currentTime);
			}, 30000);
		});
		player.on('ended', (event) => {
			localStorage.setItem("timestamp", "0");
			nextVideo();
		});
		getFocus();
		sessionStorage.setItem("video", currentVideoUrl);
		document.getElementById("outerProgress").style.display = "none";
		document.getElementById("synopsisDiv").style.display = "block";
		document.getElementById("infoText").style.display = "none";
		document.getElementById("controlbtnPrev").style.display = "block";
		document.getElementById("controlbtnNext").style.display = "block";
		var xd = window.matchMedia("(max-width: 980px)")
		if (!xd.matches) {
			document.getElementById("scrollbtnTop").style.display = "block";
			document.getElementById("scrollbtnBottom").style.display = "block";
			document.getElementById("carousel").style.display = "flex";
			document.getElementById("outerDiv").style.width = "820px";
			document.getElementById("season").setAttribute("style", "border-top-right-radius: 0px;");
		} else {
			document.getElementById("bottombtns").setAttribute("style", "margin-left: -10px;");
			document.getElementById("carousel").setAttribute("style", "display: flex; margin-left: -10px;");
		}
		document.getElementById("season").value = localStorage.getItem("season");
		season = localStorage.getItem("season");
		sessionStorage.setItem("season", season);
		sessionStorage.setItem("playingEp", localStorage.getItem("progress-episode"));
		sessionStorage.setItem("progressBool", "true");
		loadContent();
	}
} else {
	document.getElementById('outerProgress').style.display = "none";
}

window.addEventListener('resize', function(event) {
	if (document.getElementById("carousel").style.display != "none") {
		document.getElementById("carousel").setAttribute("style", "margin-left: 10px;");
	}
	var xl = window.matchMedia("(max-width: 1280px)")
	if (xl.matches) {
		document.getElementById("outerDiv").setAttribute("style", "width: 600px;");
		document.getElementById("container").setAttribute("style", "margin-left: 0px;");
	}
	document.getElementById("season").setAttribute("style", "margin-left: 10px;");
	var xe = window.matchMedia("(max-width: 980px)")
	if (!xe.matches) {
		if (document.getElementById("carousel").style.display != "none") {
			document.getElementById("scrollbtnTop").style.display = "block";
			document.getElementById("scrollbtnBottom").style.display = "block";
			document.getElementById("outerDiv").setAttribute("style", "margin: auto;");
		}
	} else {
		document.getElementById("scrollbtnTop").style.display = "none";
		document.getElementById("scrollbtnBottom").style.display = "none";
		document.getElementById("bottombtns").setAttribute("style", "margin-left: 0px;");
		if (document.getElementById("controlbtnPrev").style.display != "none") {
			document.getElementById("controlbtnPrev").setAttribute("style", "min-width: 275px;");
			document.getElementById("controlbtnNext").setAttribute("style", "min-width: 275px;");
		}
		document.getElementById("container").setAttribute("style", "margin-left: 0px;");
		document.getElementById("outerDiv").setAttribute("style", "margin: auto;");
		if (document.getElementById("carousel").style.display != "none") {
			document.getElementById("carousel").setAttribute("style", "margin-left: 0px;");
		}
	}
	var xh = window.matchMedia("(max-width: 670px)")
	if (xh.matches) {
		if (document.getElementById("controlbtnPrev").style.display != "none") {
			document.getElementById("controlbtnPrev").setAttribute("style", "min-width: 175px;");
			document.getElementById("controlbtnNext").setAttribute("style", "min-width: 175px;");
		}
		document.getElementById("container").setAttribute("style", "margin-left: 0px;");
		document.getElementById("outerDiv").setAttribute("style", "margin: auto;");	
	}
	if (document.getElementById("controlbtnPrev").style.display == "none") {
		document.getElementById("container").setAttribute("style", "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;");
	}
	if (document.getElementById("carousel").style.display != "none") {
		document.getElementById("season").setAttribute("style", "border-top-right-radius: 0px;");
	}
}, true);

function search() {
	$.getJSON("episodes.json", function(data) {
		let input = document.getElementById('searchbar').value
		input = input.toLowerCase().normalize('NFKD').replace(/[^\w\s.-_\/]/g, '');
		let x = document.querySelector('#list-holder');
		x.innerHTML = ""
		for (var j = 1; j < 35; j++) {
			for (i = 0; i < data[j].length; i++) {
				let obj = data[j][i];
				let ep = i + 1;
				let currentSeason = j;
				let currentEpisode = i;
				if (obj.episodename.toLowerCase().normalize('NFKD').replace(/[^\w\s.-_\/]/g, '').includes(input)) {
					const elem = document.createElement("li");
					elem.innerHTML = "Sezonul " + j + " Episodul " + ep + " - " + `${obj.episodename}`;
					elem.onclick = function f() {
						if (document.querySelector('.plyr')) {
							document.querySelector('.plyr').parentNode.removeChild(document.querySelector('.plyr'));
						}
						sessionStorage.setItem("season", currentSeason);
						localStorage.setItem("search-episode", currentEpisode);
						id = `${obj.id}`;
						var currentVideoUrl = "https://www.youtube.com/embed/" + id;
						if (!document.querySelector('.plyr')) {
							var p = document.createElement("DIV");
							p.setAttribute("id", "player");
							document.getElementById("container").appendChild(p);
							p.setAttribute("data-plyr-provider", "youtube");
						}
						document.getElementById("player").setAttribute("data-plyr-embed-id", currentVideoUrl);
						const player = new Plyr('#player');
						window.player = player;
						player.poster = "https://img.youtube.com/vi/" + id + "/0.jpg";
						player.on('play', () => {
							setInterval( function() {
								localStorage.setItem("timestamp", player.currentTime);
							}, 30000);
						});
						getFocus();
						sessionStorage.setItem("video", currentVideoUrl);
						document.getElementById("outerProgress").style.display = "none";
						document.getElementById("synopsisDiv").style.display = "block";
						document.getElementById("infoText").style.display = "none";
						document.getElementById("controlbtnPrev").style.display = "block";
						document.getElementById("controlbtnNext").style.display = "block";
						var xd = window.matchMedia("(max-width: 980px)")
						if (!xd.matches) {
							document.getElementById("scrollbtnTop").style.display = "block";
							document.getElementById("scrollbtnBottom").style.display = "block";
							document.getElementById("carousel").style.display = "flex";
							document.getElementById("outerDiv").style.width = "820px";
							document.getElementById("season").setAttribute("style", "border-top-right-radius: 0px;");
						} else {
							document.getElementById("bottombtns").setAttribute("style", "margin-left: -10px;");
							document.getElementById("carousel").setAttribute("style", "display: flex; margin-left: -10px;");
						}
						document.getElementById("season").value = currentSeason;
						season = currentSeason;
						let currentEp = currentEpisode + 1;
						let progress_title = "Sezonul " + currentSeason + " Episodul " + currentEp + " - " + `${obj.episodename}`;
						sessionStorage.setItem("searchBool", "true");
						localStorage.setItem("search-title", progress_title);
						localStorage.setItem("search-synopsis", `${obj.synopsis}`);
						localStorage.setItem("progress-thumbnail", "https://img.youtube.com/vi/" + `${obj.id}` + "/0.jpg");
						localStorage.setItem("progress-synopsis", `${obj.synopsis}`);
						localStorage.setItem("progress-id", `${obj.id}`);
						localStorage.setItem("progress-title", progress_title);
						localStorage.setItem("progress-episode", currentEpisode);
						localStorage.setItem("season", currentSeason);
						localStorage.setItem("episode", currentEpisode);
						localStorage.removeItem("timestamp");
						document.getElementById('searchbar').style.display = "none";
						document.getElementById('list-holder').style.display = "none";
						loadContent();
					}
					x.appendChild(elem)
				}
				if (document.getElementById('searchbar').value == "") {
					x.innerHTML = "";
				}
			}
		}
	});
}

function setSessionStorage() {
	sessionStorage.setItem("season", document.getElementById("season").value);
}

$('.season select').change(function () {
	location.reload();
});

function clearSessionStorage() {
	sessionStorage.setItem("season", "");
}

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

function previousVideo() {
	$.getJSON(filename, function(data) {
		let videoUrl = sessionStorage.getItem("video");
		const array = videoUrl.split("https://www.youtube.com/embed/");
		let currentId = array[1];
		for (var i = 0; i < data[season].length; i++) {
			if (currentId == data[season][i].id) {
				if (i != 0) {
					var index = i - 1;
					var newId = `${data[season][index].id}`;
					var newUrl = "https://www.youtube.com/embed/" + `${data[season][index].id}`;
					var playerdiv = document.querySelectorAll('div');
					playerdiv[10].parentNode.removeChild(playerdiv[10]);
					var p = document.createElement("DIV");
					p.setAttribute("id", "player");
					document.getElementById("container").appendChild(p);
					p.setAttribute("data-plyr-provider", "youtube");
					p.setAttribute("data-plyr-embed-id", newUrl);			
					const player = new Plyr('#player');
					window.player = player;
					player.poster = "https://img.youtube.com/vi/" + `${data[season][index].id}` + "/0.jpg";
					player.on('play', () => {
						setInterval( function() {
							localStorage.setItem("timestamp", player.currentTime);
						}, 30000);
					});
					player.on('ended', (event) => {
						localStorage.setItem("timestamp", "0");
						nextVideo();
					});
					getFocus();
					sessionStorage.setItem("video", newUrl);
					for (var j = 0; j < document.getElementsByClassName("episodebox").length; j++) {
						document.getElementsByClassName("episodebox")[j].style.backgroundColor = "#4C4637";
					}
					document.getElementById("box" + index).style.backgroundColor = "#4AA573";
					var xb = window.matchMedia("(max-width: 980px)")
					var xbc = window.matchMedia("(max-width: 670px)")
					if (!xb.matches) {
						var myOffSet = index * 167;
						scrollTo(document.getElementById('carousel'), myOffSet, 600);
					} else if (xbc.matches) {
						document.getElementById('carousel').scrollLeft = index * 150;
					} else {
						document.getElementById('carousel').scrollLeft = index * 200;
					}
					var newCount = index + 1;
					if (`${data[season][index].episodename}` != "") {
						document.getElementById("title").innerHTML = "Episodul " + newCount + " - " + `${data[season][index].episodename}`;
					} else {
						document.getElementById("title").innerHTML = "Episodul " + newCount;
					}
					document.getElementById("synopsis").innerHTML = `${data[season][index].synopsis}`;
					if (`${data[season][index].episodename}` != "") {
					localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + newCount + " - " + `${data[season][index].episodename}`);
					} else {
						localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + newCount);
					}
					player.on('ready', (event) => {
						localStorage.setItem("duration", player.duration);
					});
					localStorage.setItem("progress-thumbnail", "https://img.youtube.com/vi/" + `${data[season][index].id}` + "/0.jpg");
					localStorage.setItem("progress-synopsis", `${data[season][index].synopsis}`);
					localStorage.setItem("progress-id", `${data[season][index].id}`);
					localStorage.setItem("progress-episode", index);
					localStorage.setItem("season", season);
					localStorage.setItem("episode", index);
					sessionStorage.setItem("playingEp", index);
					localStorage.removeItem("timestamp");
				} else {
					season = +sessionStorage.getItem("season") - +1;
					sessionStorage.setItem("season", season);
					sessionStorage.setItem("last", "true");
					window.location.reload();
				}
			}
		}
	});
}

function nextVideo() {
	$.getJSON(filename, function(data) {
		let videoUrl = sessionStorage.getItem("video");
		const array = videoUrl.split("https://www.youtube.com/embed/");
		let currentId = array[1];
		for (var i = 0; i < data[season].length; i++) {
			if (currentId == data[season][i].id) {
				if (i+1 != data[season].length) {
					var index = i + 1;
					var newId = `${data[season][index].id}`;
					var newUrl = "https://www.youtube.com/embed/" + newId;
					var playerdiv = document.querySelectorAll('div');
					playerdiv[10].parentNode.removeChild(playerdiv[10]);
					var p = document.createElement("DIV");
					p.setAttribute("id", "player");
					document.getElementById("container").appendChild(p);
					p.setAttribute("data-plyr-provider", "youtube");
					p.setAttribute("data-plyr-embed-id", newUrl);			
					const player = new Plyr('#player');
					window.player = player;
					player.poster = "https://img.youtube.com/vi/" + newId + "/0.jpg";
					player.on('play', () => {
						setInterval( function() {
							localStorage.setItem("timestamp", player.currentTime);
						}, 30000);
					});
					player.on('ended', (event) => {
						localStorage.setItem("timestamp", "0");
						nextVideo();
					});
					getFocus();
					sessionStorage.setItem("video", newUrl);
					for (var j = 0; j < document.getElementsByClassName("episodebox").length; j++) {
						document.getElementsByClassName("episodebox")[j].style.backgroundColor = "#4C4637";
					}
					document.getElementById("box" + index).style.backgroundColor = "#4AA573";
					var xb = window.matchMedia("(max-width: 980px)")
					var xbc = window.matchMedia("(max-width: 670px)")
					if (!xb.matches) {
						var myOffSet = index * 167;
						scrollTo(document.getElementById('carousel'), myOffSet, 600);
					} else if (xbc.matches) {
						document.getElementById('carousel').scrollLeft = index * 150;
					} else {
						document.getElementById('carousel').scrollLeft = index * 200;
					}
					var newCount = index + 1;
					if (`${data[season][index].episodename}` != "") {
						document.getElementById("title").innerHTML = "Episodul " + newCount + " - " + `${data[season][index].episodename}`;
					} else {
						document.getElementById("title").innerHTML = "Episodul " + newCount;
					}
					document.getElementById("synopsis").innerHTML = `${data[season][index].synopsis}`;
					if (`${data[season][index].episodename}` != "") {
					localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + newCount + " - " + `${data[season][index].episodename}`);
					} else {
						localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + newCount);
					}
					player.on('ready', (event) => {
						localStorage.setItem("duration", player.duration);
					});
					localStorage.setItem("progress-thumbnail", "https://img.youtube.com/vi/" + `${data[season][index].id}` + "/0.jpg");
					localStorage.setItem("progress-synopsis", `${data[season][index].synopsis}`);
					localStorage.setItem("progress-id", `${data[season][index].id}`);
					localStorage.setItem("progress-episode", index);
					localStorage.setItem("season", season);
					localStorage.setItem("episode", index);
					sessionStorage.setItem("playingEp", index);
					localStorage.removeItem("timestamp");
				} else {
					season = +sessionStorage.getItem("season") + +1;
					sessionStorage.setItem("season", season);
					sessionStorage.setItem("last", "");
					window.location.reload();
				}
			}
		}
	});
}

var step = 25;
var scrolling = false;

$("#scrollbtnTop").bind("click", function(event) {
	event.preventDefault();
	$("#carousel").animate({
		scrollTop: "-=" + step + "px"
	});
}).bind("mouseover", function(event) {
	scrolling = true;
	scrollContent("up");
}).bind("mouseout", function(event) {
	scrolling = false;
});


$("#scrollbtnBottom").bind("click", function(event) {
	event.preventDefault();
	$("#carousel").animate({
		scrollTop: "+=" + step + "px"
	});
}).bind("mouseover", function(event) {
	scrolling = true;
	scrollContent("down");
}).bind("mouseout", function(event) {
	scrolling = false;
});

function scrollContent(direction) {
	var amount = (direction === "up" ? "-=10px" : "+=10px");
	$("#carousel").animate({
		scrollTop: amount
	}, 1, function() {
		if (scrolling) {
			scrollContent(direction);
		}
	});
}

function loadContent() {
	$.getJSON(filename, function(data) {
		let l = data[season].length - 1;
		if (sessionStorage.getItem("playingEp")) {
			var playingEp = sessionStorage.getItem("playingEp");
			id = `${data[season][playingEp].id}`;
			var currentVideoUrl = "https://www.youtube.com/embed/" + id;
			document.getElementById("player").setAttribute("data-plyr-embed-id", currentVideoUrl);
			const player = new Plyr('#player');
			window.player = player;
			player.poster = "https://img.youtube.com/vi/" + id + "/0.jpg";
			player.on('play', () => {
				setInterval( function() {
					localStorage.setItem("timestamp", player.currentTime);
				}, 30000);
			});
			player.on('ended', (event) => {
				localStorage.setItem("timestamp", 0);
				nextVideo();
			});
			getFocus();
			sessionStorage.setItem("video", currentVideoUrl);
		} else if (sessionStorage.getItem("last") === "true") {
			id = `${data[season][l].id}`;
			var currentVideoUrl = "https://www.youtube.com/embed/" + id;
			document.getElementById("player").setAttribute("data-plyr-embed-id", currentVideoUrl);
			const player = new Plyr('#player');
			window.player = player;
			player.poster = "https://img.youtube.com/vi/" + id + "/0.jpg";
			player.on('play', () => {
				setInterval( function() {
					localStorage.setItem("timestamp", player.currentTime);
				}, 30000);
			});
			player.on('ended', (event) => {
				localStorage.setItem("timestamp", "0");
				nextVideo();
			});
			getFocus();
			sessionStorage.setItem("video", currentVideoUrl);
		} else if (sessionStorage.getItem("progressBool") === "true") {	
		} else if (sessionStorage.getItem("searchBool") === "true") {	
		} else {
			id = `${data[season][0].id}`;
			var currentVideoUrl = "https://www.youtube.com/embed/" + id;
			document.getElementById("player").setAttribute("data-plyr-embed-id", currentVideoUrl);
			const player = new Plyr('#player');
			window.player = player;
			player.poster = "https://img.youtube.com/vi/" + id + "/0.jpg";
			player.on('play', () => {
				setInterval( function() {
					localStorage.setItem("timestamp", player.currentTime);
				}, 30000);
			});
			player.on('ended', (event) => {
				localStorage.setItem("timestamp", "0");
				nextVideo();
			});
			if (`${data[season][0].episodename}` != "") {
				var progress_title = "Sezonul " + season + " Episodul 1 " + " - " + `${data[season][0].episodename}`;
			} else {
				var progress_title = "Sezonul " + season + " Episodul 1";
			}
			player.on('play', () => {
				localStorage.setItem("progress-thumbnail", "https://img.youtube.com/vi/" + `${data[season][0].id}` + "/0.jpg");
				localStorage.setItem("progress-synopsis", `${data[season][0].synopsis}`);
				localStorage.setItem("progress-id", `${data[season][0].id}`);
				localStorage.setItem("progress-title", progress_title);
				localStorage.setItem("progress-episode", "0");
				localStorage.setItem("season", season);
				localStorage.setItem("episode", "0");
				localStorage.removeItem("timestamp");
			}, {once : true});
			getFocus();
			sessionStorage.setItem("video", currentVideoUrl);
		}
		for (let i = 0; i < data[season].length; i++) { 
			var epname = `${data[season][i].episodename}`
			var synopsis = `${data[season][i].synopsis}`
			let count = i + 1;
			var img = "https://img.youtube.com/vi/" + `${data[season][i].id}` + "/0.jpg";
			var x = document.createElement("DIV");
			var y = document.createElement("IMG");
			x.setAttribute("class", "episodebox");
			x.setAttribute("id", "box" + i);
			x.onclick = function n() { 
				var playerdiv = document.querySelectorAll('div');
				playerdiv[10].parentNode.removeChild(playerdiv[10]);
				var p = document.createElement("DIV");
				p.setAttribute("id", "player");
				document.getElementById("container").appendChild(p);
				currentVideoUrl = "https://www.youtube.com/embed/" + `${data[season][i].id}`;
				p.setAttribute("data-plyr-provider", "youtube");
				p.setAttribute("data-plyr-embed-id", currentVideoUrl);
				const player = new Plyr('#player');
				window.player = player;
				player.poster = "https://img.youtube.com/vi/" + `${data[season][i].id}` + "/0.jpg";
				player.on('play', () => {
					setInterval( function() {
						localStorage.setItem("timestamp", player.currentTime);
					}, 30000);
				});
				player.on('ended', (event) => {
					localStorage.setItem("timestamp", "0");
					nextVideo();
				});
				getFocus();
				sessionStorage.setItem("video", currentVideoUrl);
				for (var j = 0; j < document.getElementsByClassName("episodebox").length; j++) {
					document.getElementsByClassName("episodebox")[j].style.backgroundColor = "#4C4637";
				}
				document.getElementById("box" + i).style.backgroundColor = "#4AA573";
				if (`${data[season][i].episodename}` != "") {
					document.getElementById("title").innerHTML = "Episodul " + count + " - " + `${data[season][i].episodename}`;
				} else {
					document.getElementById("title").innerHTML = "Episodul " + count;
				}
				document.getElementById("synopsis").innerHTML = `${data[season][i].synopsis}`;
				if (epname != "") {
					localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + count + " - " + `${data[season][i].episodename}`);
				} else {
					localStorage.setItem("progress-title", "Sezonul " + season + " Episodul " + count);
				}
				player.on('ready', (event) => {
					localStorage.setItem("duration", player.duration);				
				});
				localStorage.setItem("progress-thumbnail", "https://img.youtube.com/vi/" + `${data[season][i].id}` + "/0.jpg");
				localStorage.setItem("progress-synopsis", `${data[season][i].synopsis}`);
				localStorage.setItem("progress-id", `${data[season][i].id}`);
				localStorage.setItem("progress-episode", i);
				localStorage.setItem("season", season);
				localStorage.setItem("episode", i);
				sessionStorage.setItem("playingEp", i);
				localStorage.removeItem("timestamp");
			};
			y.setAttribute("class", "thumbnails");
			y.setAttribute("src", img);
			y.setAttribute("alt", "Poster");
			var text = document.createElement("DIV");
			text.setAttribute("class", "textdiv");
			if (epname != "") {
				text.innerHTML = "Episodul " + count + " - " + epname;
			} else {
				text.innerHTML = "Episodul " + count;
			}
			x.appendChild(y);
			x.appendChild(text);
			document.getElementById("carousel").appendChild(x);
			document.getElementById("title").innerHTML = "Episodul " + count + " - " + `${data[season][i].episodename}`;
			document.getElementById("synopsis").innerHTML = `${data[season][i].synopsis}`;
		}
		if (sessionStorage.getItem("playingEp")) {
			var playingEp = sessionStorage.getItem("playingEp");
			var count = +playingEp + 1;
			document.getElementById("box" + playingEp).style.backgroundColor = "#4AA573";
			if (`${data[season][playingEp].episodename}` != "") {
				document.getElementById("title").innerHTML = "Episodul " + count + " - " + `${data[season][playingEp].episodename}`;
			} else {
				document.getElementById("title").innerHTML = "Episodul " + count;
			}
			document.getElementById("synopsis").innerHTML = `${data[season][playingEp].synopsis}`;
			var xq = window.matchMedia("(max-width: 980px)")
			var xqr = window.matchMedia("(max-width: 670px)")
			if (!xq.matches) {
				var myOffSet = +playingEp * 167;
				scrollTo(document.getElementById('carousel'), myOffSet, 600);
			} else if (xqr.matches) {
				document.getElementById('carousel').scrollLeft = +playingEp * 150;
			} else {
				document.getElementById('carousel').scrollLeft = +playingEp * 200;
			}
		} else if (sessionStorage.getItem("last") === "true") {
			document.getElementById("box" + l).style.backgroundColor = "#4AA573";
			var myOffSet = l * 167;
			scrollTo(document.getElementById('carousel'), myOffSet, 600);
			sessionStorage.removeItem("last");
		} else if (sessionStorage.getItem("progressBool") === "true") {	
			document.getElementById("box" + localStorage.getItem("episode")).style.backgroundColor = "#4AA573";
			document.getElementById("title").innerHTML = localStorage.getItem("progress-title");
			document.getElementById("synopsis").innerHTML = localStorage.getItem("progress-synopsis");
			var xq = window.matchMedia("(max-width: 980px)")
			var xqr = window.matchMedia("(max-width: 670px)")
			if (!xq.matches) {
				var myOffSet = +localStorage.getItem("episode") * 167;
				scrollTo(document.getElementById('carousel'), myOffSet, 600);
			} else if (xqr.matches) {
				document.getElementById('carousel').scrollLeft = +localStorage.getItem("episode") * 150;
			} else {
				document.getElementById('carousel').scrollLeft = +localStorage.getItem("episode") * 200;
			}
			sessionStorage.removeItem("progressBool");
		} else if (sessionStorage.getItem("searchBool") === "true") {	
			document.getElementById("box" + localStorage.getItem("search-episode")).style.backgroundColor = "#4AA573";
			document.getElementById("title").innerHTML = localStorage.getItem("search-title");
			document.getElementById("synopsis").innerHTML = localStorage.getItem("search-synopsis");
			var xq = window.matchMedia("(max-width: 980px)")
			var xqr = window.matchMedia("(max-width: 670px)")
			if (!xq.matches) {
				var myOffSet = +localStorage.getItem("search-episode") * 167;
				scrollTo(document.getElementById('carousel'), myOffSet, 600);
			} else if (xqr.matches) {
				document.getElementById('carousel').scrollLeft = +localStorage.getItem("search-episode") * 150;
			} else {
				document.getElementById('carousel').scrollLeft = +localStorage.getItem("search-episode") * 200;
			}
			sessionStorage.removeItem("searchBool");
		} else {
			document.getElementById("box0").style.backgroundColor = "#4AA573";
			if (`${data[season][0].episodename}` != "") {
				document.getElementById("title").innerHTML = "Episodul " + 1 + " - " + `${data[season][0].episodename}`;
			} else {
				document.getElementById("title").innerHTML = "Episodul " + 1;
			}
			document.getElementById("synopsis").innerHTML = `${data[season][0].synopsis}`;
		}
	});
}

if (season) {
	loadContent();
}
