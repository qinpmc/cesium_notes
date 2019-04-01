// Get your own Bing Maps API key at https://www.bingmapsportal.com, prior to publishing your Cesium application:
// Cesium.BingMapsApi.defaultKey = 'put your API key here';

// Construct the default list of terrain sources.
var terrainModels = Cesium.createDefaultTerrainProviderViewModels();

// Construct the viewer with just what we need for this base application
var viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false,
    vrButton: true,
    sceneModePicker: false,
    infoBox: true,
    // scene3DOnly:true,
    // terrainProviderViewModels: terrainModels,
    // selectedTerrainProviderViewModel: terrainModels[1]  // Select STK high-res terrain
});

// No depth testing against the terrain to avoid z-fighting
viewer.scene.globe.depthTestAgainstTerrain = false;

// Bounding sphere
//var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 1297.500143), 143.6271004);
var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 100.500143), 143.6271004);

// Override behavior of home button
viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
    // Fly to custom position
    viewer.camera.flyToBoundingSphere(boundingSphere);

    // Tell the home button not to do anything
    commandInfo.cancel = true;
});

// Set custom initial position
viewer.camera.flyToBoundingSphere(boundingSphere, { duration: 0 });

// Add tileset. Do not forget to reduce the default screen space error to 2
// var origin = Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 200000.0);
// var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(origin);
var x = 360.0;
var y = -920.0;
var z = -820.0;
// var x = 0;
// var y = 0;
// var z = 0;
var m = Cesium.Matrix4.fromArray([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, z, 1.0
]);

var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: 'Scene/testm3DTiles.json',
    maximumScreenSpaceError: 2,
    maximumNumberOfLoadedTiles: 1000,
    modelMatrix: m  //方法一，动态修改modelMatrix
}));

var boundingSphere = null; // = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(111.5652101, 38.70350851, 100.500143), 143.6271004);

function zoomToTileset() {
    boundingSphere = tileset.boundingSphere;
    viewer.camera.viewBoundingSphere(boundingSphere, new Cesium.HeadingPitchRange(0, -2.0, 0));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    //changeHeight(0);
}

tileset.readyPromise.then(zoomToTileset);
// scene.morphComplete.addEventListener(zoomToTileset);
var step = 10;

function changeStep(stepin) {
    step = stepin;
}

function change(type) {
    switch (type) {
        case 0:
            x += step;
            break;
        case 1:
            x -= step;
            break;
        case 2:
            y += step;
            break;
        case 3:
            y -= step;
            break;
        case 4:
            z += step;
            break;
        case 5:
            z -= step;
            break;
    }

    //创建平移矩阵方法一
    // m = Cesium.Matrix4.fromArray([
    //     1.0, 0.0, 0.0, 0.0,
    //     0.0, 1.0, 0.0, 0.0,
    //     0.0, 0.0, 1.0, 0.0,
    //     x, y, z, 1.0
    // ]);

    //创建平移矩阵方法二
    var translation=Cesium.Cartesian3.fromArray([x, y, z]);
    m= Cesium.Matrix4.fromTranslation(translation);

    document.getElementById("result").innerText = "x:" + x + " y:" + y + " z:" + z;

    tileset.modelMatrix = m;
}

function changevisible() {
    tileset.show = !tileset.show;
}

//方法二，直接调用函数，调整高度,height表示物体离地面的高度
function changeHeight(height) {
    height = Number(height);
    if (isNaN(height)) {
        return;
    }
    
    var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
    var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude,height);
    var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
}