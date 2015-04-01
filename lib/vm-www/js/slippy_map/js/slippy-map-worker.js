(function(){
	var coordsArray = null;
	var row = null;
	var col = null;
	var ajaxPull = [];
	this.onmessage = function(e){
	    switch(e.data.command){
			case 'loadMap':
				//loadMap(e.data.mapArray, e.data.mapWidth, e.data.mapHeight, e.data.url, e.data.zoom, e.data.mapType);
				loadMap(e.data.mapArray, e.data.url, e.data.zoom, e.data.mapType);
				break;
			case 'loadTile':
				loadTile(e.data.tileX, e.data.tileY, e.data.imgId, e.data.url, e.data.zoom, e.data.mapType);
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

	/*function loadMap (mapArray, mapWidth, mapHeight, url, zoom, mapType) {
		var self = this;
		XHR(url + '/tile/'+ zoom + '/' + coordsArray[0][0].x + '/' + coordsArray[0][0].y + '/' + mapWidth + '/' + mapHeight + '/' + mapType, 0, function(tileArray, index) {
			for(var i = 0, n = mapArray.length; i < n; i++) {
				var result = {
					dir: tileArray[0].dir,
					zoom: zoom,
					x: mapArray[i].x,
					y: mapArray[i].y,
					tileNumber: mapArray[i].itemNum
				}
				self.postMessage(result);
			}
		});
	}*/

	function loadMap (mapArray, url, zoom, mapType) {
		abortAll(ajaxPull);
		var self = this;
		for(var i = 0, n = mapArray.length; i < n; i++) {
			xhrTile(url + '/tile/'+ zoom + '/' + mapArray[i].x + '/' + mapArray[i].y + '/' + mapType, mapArray[i].itemNum, function(tile, index) {
					xhrTileImage(tile, index, function(result){
						self.postMessage(result);
					});
			});
		}

		
	}

	function loadTile(tileX, tileY, imgId, url, zoom, mapType) {
		var self = this;
		xhrTile(url + '/tile/'+ zoom + '/' + tileX + '/' + tileY + '/' + mapType, imgId, function(tile, img_Id) {
			var found = false;
			for (var j = 0; j < row; j++) {
				for (var i = 0; i < col; i++) {
					if (tileY === coordsArray[j][i].y && tileX === coordsArray[j][i].x) {
						found = true;
					}
				};
			}
			if (found) {
				xhrTileImage(tile, img_Id, function(result){
					self.postMessage(result);
				});
			}
		});
	}

	function xhrTile (url, index, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function() {
			if (this.status == 200) {
				callback(JSON.parse(this.response), index);
			}
		}
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send();
		ajaxPull.push(xhr);
	}

	function xhrTileImage (tile, index, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:3000' + tile.dir+ tile.name, true);
		xhr.responseType = 'blob';

		xhr.onload = function(e) {
			if (this.status == 200) {
				var blob = this.response;
				var result = {
					tileNumber: index,
					blob: blob
				}
				callback(result);
			}
		};
		xhr.send();
		ajaxPull.push(xhr);
	}

	function abortAll (ajaxArray) {
		for(var i in ajaxArray){
			ajaxArray[i].abort();
		}
		ajaxArray = [];
	}
	
})();