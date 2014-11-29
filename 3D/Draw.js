var Draw = {

	/** 
		Create a line from one point to another.
		@param {Vector} The starting point.
		@param {Vector} The ending point.
		@param {Hex} The color of the line
		@returns {Object} The object that was created
	*/
	line: function(view, p1, p2, color){
		var geometry = new THREE.Geometry();
		geometry.vertices.push(p1);
		geometry.vertices.push(p2);
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({color: color}));
		view.scene.add(line);
		return line;
	}

}