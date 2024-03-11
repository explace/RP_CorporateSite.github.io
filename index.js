import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

window.addEventListener("DOMContentLoaded", init);

function init() {
// ここに処理を追加していきます
//width / height = 1720 / 900;

//レンダラー作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas")
});
//renderer.setSize(width, height,false);
renderer.setSize(window.innerWidth/2, window.innerHeight/2, false);
renderer.setPixelRatio(`window`.devicePixelRatio);
document.body.appendChild( renderer.domElement );


// カメラ作成：new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 1, 10000
);
// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
camera.position.set(0, 0, 4000);
//カメラコントローラーを作成
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //摩擦効果
controls.dampingFactor = 0.2;
controls.zoomSpeed = 0.5;

//シーン作成
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x2f4f4f );//背景色を指定

// 見やすいようにヘルパー（網目）を設定
//let gridHelper = new THREE.GridHelper();
//scene.add(gridHelper);

//Cube作成
// new THREE.BoxGeometry(幅, 高さ, 奥行き)
const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshPhongMaterial({
  color: 0x44aa88
});

const box = new THREE.Mesh(geometry, material);
//物体の位置を指定
//box.position.set(0, 0, 0);
// シーンに追加
scene.add(box);

//平行光源
// new THREE.DirectionalLight(色)
const light = new THREE.DirectionalLight(0xffffff);
//const light = new THREE.AmbientLight(0xffffff);
light.intensity = 3; // 光の強さを倍に
light.position.set(-1, 2, 4); // ライトの方向
// シーンに追加
scene.add(light);

//3Dモデル読み込み
const loader = new GLTFLoader();


// 初回実行
tick()
function tick() {
  controls.update();
  requestAnimationFrame(tick);

  // 箱を回転させる
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  //レンダリング
  renderer.render(scene, camera);
}

//ユーザーブラウザでのWebGL互換性確認
if ( WebGL.isWebGLAvailable() ) {
	// Initiate function or other initializations here
	tick()

} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
}
}
