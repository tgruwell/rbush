function SceneManager(options){ return this.constructor(options); }

SceneManager.prototype = {

	constructor: function(options){
		this.viewport = null;
		
		// Configure
		for(var k in options){ this[k] = options[k] };

	},
	
	attachTo: function(viewport){
		this.viewport = viewport;


		// Lights
		var pointLight1 = new THREE.PointLight(0xffffff, 1.2, 100);
		pointLight1.position.set(4, 2, 4);
		this.viewport.scene.add(pointLight1);


		var pointLight2 = new THREE.PointLight(0xffffff, 1.2, 100);
		pointLight2.position.set(-4, 2, -4);
		this.viewport.scene.add(pointLight2);
	},
	
	getScale: function(){
		return 0.02;
	},

	addBox: function(params, color){
		if(!color || color == "0,0,255"){
			var color = 0x0000FF;
		}else if(color == "255,0,0"){
			var color = 0xFF0000;
		}else if(color == "0,255,0"){
			var color = 0x00FF00;
		}else if(color == "220,220,220"){
			var color = 0xDDDDDD;
		}
		var material = new THREE.MeshBasicMaterial({
				transparent: true,
				opacity: 0
			});
		
		var scale = this.getScale();

		var x1 = params[0]*scale;
		var y1 = params[1]*scale;
		var z1 = params[2]*scale;
		var x2 = params[3]*scale;
		var y2 = params[4]*scale;
		var z2 = params[5]*scale;
		var w = x1-x2;
		var h = y1-y2;
		var l = z1-z2;

		var geometry = new THREE.BoxGeometry( w, h, l );
		var cube = new THREE.Mesh( geometry, material );
		this.viewport.scene.add( cube );

		cube.translateX(-x1+w/2);
		cube.translateY(-y1+h/2);
		cube.translateZ(-z1+l/2);

		var edgeHelper = new THREE.EdgesHelper( cube, color);
		edgeHelper.material.linewidth = 1;
	 	this.viewport.scene.add( edgeHelper );
	}
		
}