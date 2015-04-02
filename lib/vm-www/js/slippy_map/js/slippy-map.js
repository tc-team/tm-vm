var localLatitude = 50.450574;
var localLongitude = 30.522981;
var zoom = 4;
var tileSize = 256;
var map_type = 'r';
var WORKER_PATH = 'js/slippy-map-worker.js';

var SlippyMap = function (map, options) {

	var latitude = options.latitude || localLatitude;
	var longitude = options.longitude || localLongitude;
	var zoomLevel = options.zoom || zoom;
	var mapType = options.mapType || map_type;
	var worker_path = options.worker || WORKER_PATH;

	var xTotal = Math.pow(2, zoomLevel);
	var tileY = lat2tile(latitude, zoomLevel);
	var tileX = long2tile(longitude, zoomLevel);

	var mapWidth = map.offsetWidth;
	var mapHeight = map.offsetHeight;
	
	var columns = Math.ceil(mapWidth / tileSize) + 2;
	var rows = Math.ceil(mapHeight / tileSize) + 2;
	var centerMapI = Math.floor(columns / 2);
	var centerMapJ = Math.floor(rows / 2);
	var coordsArray = createCoordsArray(rows, columns, tileX, tileY, centerMapI, centerMapJ);

	var mapOffsetX = -(((columns * tileSize) - mapWidth) / 2);
	var mapOffsetY = -(((rows * tileSize) - mapHeight) / 2 );
	
	var offsetY = mapOffsetY;
	var offsetX = mapOffsetX;
	
	var centerMapX = coordsArray[0][0].x + (coordsArray[0][columns - 1].x - coordsArray[0][0].x + 1)/ 2;
	var centerMapY = coordsArray[0][0].y + (coordsArray[rows - 1][0].y - coordsArray[0][0].y + 1) / 2;

	var defaultOffsetX = (tileX - centerMapX) * tileSize;
	var defaultOffsetY = (tileY - centerMapY) * tileSize;
	
	mapOffsetX -= defaultOffsetX;
	mapOffsetY -= defaultOffsetY;

	var centermapOffsetX = 0;
	var centermapOffsetY = 0;

	var allowableOffsetTop = tileSize + defaultOffsetY;
	var allowableOffsetLeft = tileSize + defaultOffsetX;
	var allowableOffsetRight = tileSize - defaultOffsetX;
	var allowableOffsetBottom = tileSize - defaultOffsetY;
	
	var draging = false;

	var tile_container = document.createElement('DIV');
	tile_container.setAttribute('id', 'tile_container');
	map.appendChild(tile_container);

	tile_container.style.width = columns * tileSize + 'px';
	tile_container.style.height = rows * tileSize + 'px';
	tile_container.style.top = mapOffsetY + 'px';
	tile_container.style.left = mapOffsetX + 'px';
	
	var tilesNodes = createTiles(tile_container, coordsArray, columns, rows, tileSize);
	var orderedArray = sort(coordsArray, columns, rows);

	var mapStart = false;
	var mapEnd = false;

	var worker = new Worker(worker_path);
	var url = 'http://localhost:3000';
	
	var oldZoom = zoomLevel;
	mapOffsetX = 0;
	mapOffsetY = 0;

	map.addEventListener('mousedown', function(evt) {
		draging = true;
		this.style.cursor='pointer';
	});

	map.addEventListener('mouseup', function(evt) {
		draging = false;
		this.style.cursor='initial';
	});

	map.addEventListener('mouseout', function(evt) {
		draging = false;
		this.style.cursor='initial';
	});

	map.addEventListener('mousemove', function(evt) {
		if (!draging) return;			
		centermapOffsetX += evt.movementX;
		centermapOffsetY += evt.movementY;
		if (centermapOffsetX > 0) {
			if (Math.abs(centermapOffsetX) > allowableOffsetLeft) {
				leftScroll();
			}			
		} else if (centermapOffsetX < 0) {
			if (Math.abs(centermapOffsetX) > allowableOffsetRight) {
				rightScroll();
			}	
		}

		if (centermapOffsetY > 0) {
			if (Math.abs(centermapOffsetY) > allowableOffsetTop) {
				topScroll();
				mapEnd = false;
			}	
		} else if (centermapOffsetY < 0) {
			if (Math.abs(centermapOffsetY) > allowableOffsetBottom) {
				bottomScroll();
				mapStart = false;
			}
		}

		tile_container.style.transform = 'translate(' + centermapOffsetX + 'px, ' + centermapOffsetY + 'px)';
	});
	
	map.addEventListener('wheel', function(evt) {
		oldZoom = zoomLevel;
		if (evt.deltaY > 0) {
			if (zoomLevel > 0) {
				zoomLevel -= 1;
			}
		} else if (evt.deltaY < 0) {
			if (((mapType === 'r') && (zoomLevel < 22)) || ((mapType === 's') && (zoomLevel < 20))) {
				zoomLevel += 1;
			}
		}
		if (oldZoom != zoomLevel) {
			changeZoom(oldZoom, evt.offsetX, evt.offsetY);
		}
	});
	var draw = true;
	
	map.addEventListener("transitionend", function () {
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			tilesNodes.item(i).firstElementChild.setAttribute("style", '-webkit-filter: blur(5px)');
		};
		loadMap(zoomLevel, zoomOffsetX, zoomOffsetY, function() {
			tile_container.style.transition = '';
			tile_container.style.transform = '';

			tile_container.style.top = mapOffsetY + centermapOffsetY + 'px';
			tile_container.style.left = mapOffsetX + centermapOffsetX + 'px';
			
			centermapOffsetX = 0;
			centermapOffsetY = 0;
			draw = false;
			for(var i = 0, n = tilesNodes.length; i < n; i++) {
				tilesNodes.item(i).firstElementChild.setAttribute("style", '-webkit-filter: none');
			};
		});
	}, false);

	var scale = 2;
	var translateX = 0;
	var translateY = 0;
	var zoomOffsetX = 0;
	var zoomOffsetY = 0;
	function changeZoom(oldZoom, mouseX, mouseY) {
		console.log('------------------------------------------');
		console.log('zoom: ' + zoomLevel);
		tile_container.style.transition = 'transform .2s linear';

		var tileXzoomed = mouseX2TileX(mouseX);
		var tileYzoomed = mouseY2TileY(mouseY);
		console.log(tileYzoomed, tileXzoomed);
		
		var mouseLat = tile2lat(tileYzoomed, oldZoom);
		var mouseLong = tile2long(tileXzoomed, oldZoom);
		
		tileY = lat2tile(mouseLat, zoomLevel);
		tileX = long2tile(mouseLong, zoomLevel);
		console.log('tileY= ' + tileY, 'tileX=' + tileX);
		
		var i = mouseX2I(tileXzoomed);
		var j = mouseY2J(tileYzoomed);
		if (i === 0) {
			i++;
		} else if (i === columns - 1) {
			i--;
		}
		if (j === 0) {
			j++;
		} else if (j === rows - 1) {
			j--;
		}
		console.log('j= ' + j, 'i=' + i);
		xTotal = Math.pow(2, zoomLevel);
		coordsArray = createCoordsArray(rows, columns, tileX, tileY, i, j);
		

		var tileXinPX = tileX2px(tileX);
		var tileYinPX = tileY2px(tileY);
		// console.log(tileYinPX , tileXinPX);

		var tileXmouse = mouseX2TileX(mouseX);
		var tileYmouse = mouseY2TileY(mouseY);
		// console.log(tileYmouse, tileXmouse);

		var mouseXinPX = tileX2px(tileXmouse);
		var mouseYinPX = tileY2px(tileYmouse);
		// console.log(mouseYinPX , mouseXinPX);
		if (oldZoom < zoomLevel) {			
			translateX = - mouseXinPX + centermapOffsetX;
			translateY = - mouseYinPX + centermapOffsetY;
			tile_container.style.transform = 'matrix('+ scale +', 0, 0, '+ scale +',' + translateX + ', '+ translateY +')';
		} else {
			translateX = mouseXinPX / scale + centermapOffsetX;
			translateY = mouseYinPX / scale + centermapOffsetY;
			tile_container.style.transform = 'matrix('+ 1/scale +', 0, 0, '+ 1/scale +',' + translateX + ', '+ translateY +')';
		}		

		zoomOffsetX = tileXinPX - mouseXinPX;
		zoomOffsetY = tileYinPX - mouseYinPX;

		mapOffsetY = tile_container.offsetTop - zoomOffsetY;
		mapOffsetX = tile_container.offsetLeft - zoomOffsetX;
		
		if (Math.abs(mapOffsetY) > Math.abs(offsetY * 2)) {
			j--;
			rebuildCoordsArray (rows, columns, tileX, tileY, i, j, mouseX, mouseY);
		} else if (mapOffsetY >= 0) {
			j++;
			rebuildCoordsArray (rows, columns, tileX, tileY, i, j, mouseX, mouseY);
		}

		if (Math.abs(mapOffsetX) > Math.abs(offsetX * 2)) {
			i--;
			rebuildCoordsArray (rows, columns, tileX, tileY, i, j, mouseX, mouseY);
		} else if (mapOffsetX >= 0) {
			i++;
			rebuildCoordsArray (rows, columns, tileX, tileY, i, j, mouseX, mouseY);
		}
		
		addCoordinates(tilesNodes, coordsArray);

		defaultOffsetY = offsetY - mapOffsetY - centermapOffsetY;
		defaultOffsetX = offsetX - mapOffsetX - centermapOffsetX;

		allowableOffsetTop = tileSize + defaultOffsetY;
	 	allowableOffsetLeft = tileSize + defaultOffsetX;
	 	allowableOffsetRight = tileSize - defaultOffsetX;
		allowableOffsetBottom = tileSize - defaultOffsetY;
	}

	
	loadMap(zoomLevel, zoomOffsetX, zoomOffsetY, function(msg) {
		
	});

	function loadMap (zoom, zoomOffsetX, zoomOffsetY, callback) {
		
		var count = 0;
		orderedArray = sort(coordsArray, columns, rows);
		worker.postMessage({
		    command: 'loadMap',
		    coordsArray: orderedArray,
		    url: url,
		    zoom: zoom,
		    mapType: mapType
		});

		worker.onmessage = function (e) {
			var img = tilesNodes.item(e.data.tileNumber).firstElementChild;
		//	img.setAttribute("style", '-webkit-filter: blur(5px)')
		    img.src = window.URL.createObjectURL(e.data.blob);
		    img.onload = function () {
    	  		window.URL.revokeObjectURL(img.src);
    	  		//this.setAttribute("style", '-webkit-filter: none');
		    }
			    count++;
			    if (count === columns * rows) {
			    	callback();
			    }
		};
	}

	function rebuildCoordsArray (rows, columns, tileX, tileY, i, j, mouseX, mouseY) {
		coordsArray = createCoordsArray(rows, columns, tileX, tileY, i, j);

		var tileXinPX = tileX2px(tileX);
		var tileYinPX = tileY2px(tileY);
		// console.log(tileYinPX , tileXinPX);

		var tileXmouse = mouseX2TileX(mouseX);
		var tileYmouse = mouseY2TileY(mouseY);
		// console.log(tileYmouse, tileXmouse);

		var mouseXinPX = tileX2px(tileXmouse);
		var mouseYinPX = tileY2px(tileYmouse);
		// console.log(mouseYinPX , mouseXinPX);

		var zoomOffsetX = tileXinPX - mouseXinPX;
		var zoomOffsetY = tileYinPX - mouseYinPX;

		mapOffsetY = tile_container.offsetTop - zoomOffsetY;
		mapOffsetX = tile_container.offsetLeft - zoomOffsetX;
	}

	function tileX2px (tileX) {
		return ((tileX - coordsArray[0][0].x) * tileSize);
	}

	function tileY2px (tileY) {
		return ((tileY - coordsArray[0][0].y) * tileSize);
	}


	function mouseX2TileX (mouseX) {
		var pointX = Math.abs(tile_container.offsetLeft) + mouseX - centermapOffsetX;
		return (pointX / tileSize + coordsArray[0][0].x);
	}

	function mouseY2TileY (mouseY) {
		var pointY = Math.abs(tile_container.offsetTop) + mouseY - centermapOffsetY;
		return (pointY / tileSize + coordsArray[0][0].y);
	}

	function mouseX2I (mouseX) {
		return Math.floor(mouseX - coordsArray[0][0].x);
	}

	function mouseY2J (mouseY) {
		return Math.floor(mouseY - coordsArray[0][0].y);
	}

	function long2tile(lon, zoom) { 
		return ((lon + 180) / 360 * Math.pow(2, zoom)); 
	}

	function lat2tile(lat, zoom) { 
		return ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)); 
	}

	function tile2long(x, z) {
	  	return (x / Math.pow(2, z) * 360 - 180);
	}

	function tile2lat(y, z) {
	  	var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
		return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
	}

	function createCoordsArray(rows, columns, tileX, tileY, i, j) {
		var x = Math.floor(tileX) - i;
		var y = Math.floor(tileY) - j;

		var arr = new Array(rows);
		var yPosition = y;
		var number = 0;
		for(var i = 0; i < rows; i++) {
			var xPosition = x;
			arr[i] = new Array(columns);
			for(var j = 0; j < columns; j++) {
				if (yPosition < 0) {
					xTotal - 1
				}
	  			arr[i][j] = {
	  				y: yPosition,
	  				x: xPosition,
	  				itemNum: number
	  			};
	  			xPosition++;
	  			number++;
			}
			yPosition++;
		}
		return arr;
	}

	function createTiles (tileContainer, positionArray, col, row, tileSize) {
		var top = 0;
		var left = 0;
		var count = 0;
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				var div = document.createElement('DIV');
				var span = document.createElement('SPAN');
				span.innerHTML = '(' + positionArray[i][j].y +' : ' + positionArray[i][j].x +')';
				div.style.top = top + 'px';
				div.style.left = left + 'px';
				tileContainer.appendChild(div);
				var img = new Image();
				img.setAttribute('id', 'tile_img_' + count++);
				div.appendChild(img);
				div.appendChild(span);
				left += tileSize;
			}		
			top += tileSize;
			left = 0;
		}
		return tileContainer.childNodes;
	}
	
	function leftScroll () {
		var j = 1;
		var div = null;
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			if (i === (columns * j - 1)) {
				tilesNodes.item(i).style.left = '0px';
				div = tilesNodes.item(i);
				div.parentNode.insertBefore(div, div.parentNode.childNodes[(j - 1) * columns]);
				div.firstElementChild.src = '';
				j++;
			} else {
				var left = tilesNodes.item(i).offsetLeft;
				tilesNodes.item(i).style.left = (left + tileSize) + 'px';
			}
		};
		centermapOffsetX = defaultOffsetX;
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].x === 0) {
					coordsArray[i][j].x = xTotal - 1;	
				} else {
		  			coordsArray[i][j].x--;				
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		var self = this;
		var nodeIndex = 0;
		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var j = 0; j < rows; j++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[j][0].x,
			    tileY: coordsArray[j][0].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoomLevel,
			    mapType: mapType
			});

			worker.onmessage = function (e) {
				var img = document.querySelector('#' + e.data.tileNumber);
			    img.src = window.URL.createObjectURL(e.data.blob);
			    img.onload = function () {
	    	  		window.URL.revokeObjectURL(img.src);
			    }
			};	
			nodeIndex += columns;
		}
	}

	function rightScroll () {
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var left = tilesNodes.item(i).offsetLeft;
			tilesNodes.item(i).style.left = (left - tileSize) + 'px';
		};

		var left = columns * tileSize - tileSize;
		for (var i = 0; i < rows; i++) {
			var child = (i * columns) + 1;
			var div = tilesNodes.item(child - 1);
			div.style.left = left + 'px';
			div.parentNode.insertBefore(div, div.parentNode.childNodes[((i+1)*columns)]);
			div.firstElementChild.src = '';
		}
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].x === xTotal - 1) {
					coordsArray[i][j].x = 0;
				} else {
		  			coordsArray[i][j].x++;				
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		centermapOffsetX = defaultOffsetX;

		var self = this;
		var nodeIndex = columns;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var j = 0; j < rows; j++) {
			var imgId = tilesNodes.item(nodeIndex - 1).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[j][columns - 1].x,
			    tileY: coordsArray[j][columns - 1].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoomLevel,
			    mapType: mapType
			});

			worker.onmessage = function (e) {
			  	var img = document.querySelector('#' + e.data.tileNumber);
			    img.src = window.URL.createObjectURL(e.data.blob);
			    img.onload = function () {
	    	  		window.URL.revokeObjectURL(img.src);
			    }
			};
			nodeIndex += columns;
		}
	}

	function bottomScroll () {
		if (coordsArray[rows - 1][0].y === xTotal - 1) {
			mapEnd = true;
			return;
		}
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var top = tilesNodes.item(i).offsetTop;
			tilesNodes.item(i).style.top = (top - tileSize) + 'px';
		};

		var top = rows * tileSize - tileSize;
		for (var i = 0; i < columns; i++) {
			var div = tilesNodes.item(0);
			div.style.top = top + 'px';
			div.parentNode.insertBefore(div, null);
			div.firstElementChild.src = '';
		}
		
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
	  			coordsArray[i][j].y++;
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		centermapOffsetY = defaultOffsetY;
		
		var self = this;
		var nodeIndex = columns * rows - columns;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var i = 0; i < columns; i++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[rows - 1][i].x,
			    tileY: coordsArray[rows - 1][i].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoomLevel,
			    mapType: mapType
			});

			worker.onmessage = function (e) {
			    var img = document.querySelector('#' + e.data.tileNumber);
			    img.src = window.URL.createObjectURL(e.data.blob);
			    img.onload = function () {
	    	  		window.URL.revokeObjectURL(img.src);
			    }
			};
			nodeIndex++;			
		}
	}

	function topScroll () {
		if (coordsArray[0][0].y === 0) {
			mapStart = true;
			return;
		}
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var top = tilesNodes.item(i).offsetTop;
			tilesNodes.item(i).style.top = (top + tileSize) + 'px';
		};
		var top = 0;
		var firstChildOfLastRow = rows * columns - columns + 1;

		for (var i = 0; i < columns; i++) {
			var child = firstChildOfLastRow + i;
			var div = tilesNodes.item(child - 1);
			
			div.style.top = top + 'px';
			div.parentNode.insertBefore(div, div.parentNode.childNodes[i]);
			div.firstElementChild.src = '';
		}

		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].y === 0) {
					coordsArray[i][j].y = xTotal - 1;	
				} else {
		  			coordsArray[i][j].y--;
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		centermapOffsetY = defaultOffsetY;
		
		var self = this;
		var nodeIndex = 0;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});
		
		for(var i = 0; i < columns; i++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[0][i].x,
			    tileY: coordsArray[0][i].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoomLevel,
			    mapType: mapType
			});

			worker.onmessage = function (e) {
			    var img = document.querySelector('#' + e.data.tileNumber);
			    img.src = window.URL.createObjectURL(e.data.blob);
			    img.onload = function () {
	    	  		window.URL.revokeObjectURL(img.src);
			    }
			};
			nodeIndex++;
		}
	}

	function addCoordinates (tilesNodes, mapArray) {
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + mapArray[i][j].y +' : ' + mapArray[i][j].x +')';
	  			num++;
  			}
		}
	}

	function sort (mapArray, col, row) {
		var loadMapX = Math.floor(col / 2);
		var loadMapY = Math.floor(row / 2);
		var left = true;
		var right = true;
		var top = true;
		var bottom = true;
		var step = 1;
		var turnCounter = 0;
		var count = 0;
		var array = []
		array.push(mapArray[loadMapY][loadMapX]);
		var h = 0, n = col * row - 1;
		while (h < n) {
			if (turnCounter < 2) {
				if (left) {
					loadMapX--;
					count++;
					if (count === step) {
						left = false;
						top = true;
						turnCounter++;
						count = 0;	
					}
				} else if (top) {
					loadMapY--;
					count++;
					if (count === step) {
						top = false;
						right = true;
						turnCounter++;
						count = 0;
					}
				} else if (right) {
					loadMapX++;
					count++;
					if (count === step) {
						right = false;
						bottom = true;
						turnCounter++;
						count = 0;
					} 					
				} else if (bottom) {
					loadMapY++;
					count++;
					if (count === step) {
						bottom = false;
						left = true;
						turnCounter++;
						count = 0;
					}
				}
				h++;
				array.push(mapArray[loadMapY][loadMapX]);
			} else {
				step++;
				turnCounter = 0;
			}
		}
		return array;
	}
}