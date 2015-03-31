(function(){
	var coordsArray = null;
	var row = null;
	var col = null;
	this.onmessage = function(e){
	    switch(e.data.command){
			case 'loadMap':
				loadMap(e.data.mapArray, e.data.url, e.data.zoom);
				break;
			case 'loadTile':
				loadTile(e.data.tileX, e.data.tileY, e.data.imgId, e.data.url, e.data.zoom);
				break;
			case 'updateArray':
				updateArray(e.data.coordsArray);
				break;
	    }
	};

	function updateArray (coords_array) {
		coordsArray = coords_array;
		row = coordsArray.length;
		col = coordsArray[0].length;
	}

	function loadMap (mapArray, url, zoom) {
		var self = this;
		for(var i = 0, n = mapArray.length; i < n; i++) {
			XHR(url + '/tile/'+ zoom + '/' + mapArray[i].x + '/' + mapArray[i].y + '/s', mapArray[i].itemNum, function(tile, index) {
					var result = {
						tile: tile,
						tileNumber: index
					}
					self.postMessage(result);
			});
		}
	}

	function loadTile(tileX, tileY, imgId, url, zoom) {
		var self = this;
		XHR(url + '/tile/'+ zoom + '/' + tileX + '/' + tileY + '/s', imgId, function(tile, imgId) {
			var found = false;
			for (var j = 0; j < row; j++) {
				for (var i = 0; i < col; i++) {
					if (tileY === coordsArray[j][i].y && tileX === coordsArray[j][i].x) {
						found = true;
					}
				};
			}
			if (found) {
				var result = {
					tile: tile,
					imgId: imgId
				}
				self.postMessage(result);
			}
		});
	}

	function XHR (url, index, callback) {
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onreadystatechange = function() {
			if (req.readyState != 4) return;
			callback(JSON.parse(req.responseText), index);
		}
		req.setRequestHeader('Access-Control-Allow-Origin', '*');
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.send();
	}

})();