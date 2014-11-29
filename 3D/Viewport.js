function Viewport(options){ return this.constructor(options); }

Viewport.prototype = {

	constructor: function(options){
		// Configurable Properties
		this.width = 256;
		this.height = 256;
		this.horzMargin = 0;
		this.vertMargin = 0;
		this.fitToWindow = true;
		this.renderTo = null;
		this.frustrumNear = 0.0001;
		this.frustrumFar = 1000000;
		this.fieldOfView = 45;
		
		// Configure
		for(var k in options){ this[k] = options[k] };
		
		// Public Properties
		this.renderer = null;
		this.camera = null;
		this.scene = null;
		this.controls = null;
		this.container = $(this.renderTo);
		this.listeners = {"refresh": []};
		
		// Determine viewport dimensions
		if(this.fitToWindow){
			$(window).resize($.proxy(this.onWindowResize, this));
			this.width = $(window).width();
			this.height = $(window).height();
		}
		
		this.width -= this.horzMargin;
		this.height -= this.vertMargin;
		
		var aspectRatio = this.width / this.height;
		
		this.container.css({
			overflow: "hidden",
			position: "relative",
			width: this.width,
			height: this.height
		});
		
		this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio, this.frustrumNear, this.frustrumFar);
		this.scene = new THREE.Scene();
		
		this.scene.add(this.camera);
		
		this.renderer.setSize(this.width, this.height);
		
		this.controls = new THREE.OrbitControls(this.camera, this.container[0]);
		this.controls.followTarget = true; // The camera will maintain its distance and angle
		this.controls.noPan = true; // The user cannot change the target arbitrarily
		this.controls.target.x = 0;
		this.controls.target.y = 0;
		this.controls.target.z = 0;
		
		this.container.append(this.renderer.domElement);
		
		var ambientLight = new THREE.AmbientLight(0x404040);
		this.scene.add(ambientLight);
		
		this.refresh();
		
		return this;
	},
	
	/** 
		Refresh the viewport continuously. This function is called by THREE every frame. It does not need to be called manually
		@returns {Undefined}
	*/
	refresh: function(){
		requestAnimationFrame($.proxy(this.refresh, this));
		//updateCameraPosition();
		this.renderer.render(this.scene, this.camera);
		//updateSpritePositions();
		
		for(var i=0; i<this.listeners["refresh"].length; i++){
			this.listeners["refresh"][i]();
		}
	},
	
	/** 
		Update the viewport when the window is resized
		@returns {Undefined}
	*/
	onWindowResize: function(){
		this.width = $(window).width() - this.horzMargin;
		this.height = $(window).height() - this.vertMargin;
		
		this.container.css({
			width: this.width,
			height: this.height
		});
		
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		
		this.renderer.setSize(this.width, this.height);
	},
	
	/** 
		Update the viewport when the window is resized
		@returns {Undefined}
	*/
	addListener: function(event, callback){
		this.listeners[event].push(callback);
	}
	
}