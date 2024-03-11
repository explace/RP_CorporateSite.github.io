import WebGL from 'three/addons/capabilities/WebGL.js';

//ユーザーブラウザでのWebGL互換性確認
if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	//tick()
  animate();

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
