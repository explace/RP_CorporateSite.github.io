window.addEventListener("DOMContentLoaded", init);

function init() {
// ここに処理を追加していきます
const width = 1720;
const height = 900;
//960,540

//レンダラー作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas")
});
renderer.setSize(width, height);
renderer.setPixelRatio(`window`.devicePixelRatio);

// カメラ作成：new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
const camera = new THREE.PerspectiveCamera(
  45, width / height, 1, 10000
);
// カメラの初期座標を設定（X座標:0, Y座標:0, Z座標:0）
camera.position.set(0, 0, 4000);

//シーン作成
const scene = new THREE.Scene();

//Cube作成
// new THREE.BoxGeometry(幅, 高さ, 奥行き)
const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshPhongMaterial({
  color: 0x44aa88
});

// new THREE.Mesh(ジオメトリ,マテリアル)
const box = new THREE.Mesh(geometry, material);
//物体の位置を指定
//box.position.set(0, 0, 0);
// シーンに追加
scene.add(box);

//平行光源
// new THREE.DirectionalLight(色)
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 3; // 光の強さを倍に
light.position.set(-1, 2, 4); // ライトの方向
// シーンに追加
scene.add(light);

// 初回実行
tick()
function tick() {
  requestAnimationFrame(tick);

  // 箱を回転させる
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  //レンダリング
  renderer.render(scene, camera);
}
}
