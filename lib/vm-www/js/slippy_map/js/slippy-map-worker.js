(function(){
	var coordsArray = null;
	var row = null;
	var col = null;
	var ajaxPull = [];
	this.onmessage = function(e){
	    switch(e.data.command){
			case 'loadMap':
				loadMap(e.data.coordsArray, e.data.url, e.data.zoom, e.data.mapType);
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

	function loadMap (coords_array, url, zoom, mapType) {
		abortAll();
		var self = this;
		for(var i = 0, n = coords_array.length; i < n; i++) {
			xhrTile(url + '/tile/'+ zoom + '/' + coords_array[i].x + '/' + coords_array[i].y + '/' + mapType, coords_array[i].itemNum, function(result) {
				self.postMessage(result);
			});
		}

		
	}

	function loadTile(tileX, tileY, imgId, url, zoom, mapType) {
		var self = this;
		xhrTile(url + '/tile/'+ zoom + '/' + tileX + '/' + tileY + '/' + mapType, imgId, function(result) {
			var found = false;
			for (var j = 0; j < row; j++) {
				for (var i = 0; i < col; i++) {
					if (tileY === coordsArray[j][i].y && tileX === coordsArray[j][i].x) {
						found = true;
					}
				};
			}
			if (found) {
				self.postMessage(result);
			}
		});
	}

	function xhrTile (url, index, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'blob';
		xhr.onload = function(e) {
			if (this.status == 200) {
				var blob = this.response;
				var result = {
					tileNumber: index,
					blob: blob
				}
				removeFromArray(this);
				callback(result);
			}
		}
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send();
		ajaxPull.push(xhr);
	}

	function abortAll () {
		for (var i in ajaxPull) {
			ajaxPull[i].abort();
		}

		ajaxPull = [];
	}

	function removeFromArray (value) {
	    var idx = ajaxPull.indexOf(value);
	    if (idx !== -1) {
	        ajaxPull.splice(idx, 1);
	    }
	}
	
})();