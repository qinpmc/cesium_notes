
##  核心类CesiumWidget



CesiumWidget内部创建的对象主要有以下几个部分，如图所示:
![widget](./widget.png)

CesiumWidget:

- clock用来记录时间，三维场景需要进行动态展示，需要通过时间来确定某一帧的绘制内容。 
- container则是构造函数的参数，也就是传入的div。 
- canvas则是在container上构建的Canvas类的对象，可以据此获取WebGL绘制的画笔。 
- screenSpaceEventHandler则是对Canvas对象上各种鼠标的交互事件的封装，方便传递给三维场景。三维场景干之后可以据此改变相机姿态等。 
- scene则承载着整个三维场景中的对象。



## 场景 Scene 

Scene中有一些内置的图元对象：
- globe（地球）  Globe  
       -- imageryLayers : ImageryLayerCollection  
       -- terrainProvider : TerrainProvider  
- skyBox（天空盒）  SkyBox
- skyAtmosphere(大气层)   SkyAtmosphere
- sun（太阳）  Sun
- sunBloom     Boolean
- sunColor  Cartesian3
- moon（月亮） Moon
- backgroundColor   Color
- primitives
- groundPrimitives


## Scene属性

- scene.backgroundColor 
- scene.camera : Camera
- scene.canvas : Canvas
- scene.globe : Globe 
 
- scene.light : Light
- scene.moon : Moon
- scene.sun : Sun 
- scene.sunBloom : Boolean 
- scene.sunColor : Cartesian3
 
- scene.skyAtmosphere : SkyAtmosphere 
- scene.skyBox : SkyBox

- scene.fog : Fog 
- scene.shadowMap : ShadowMap 
 
- scene.groundPrimitives : PrimitiveCollection
- scene.imageryLayers : ImageryLayerCollection
- scene.terrainProvider : TerrainProvider


- scene.requestRenderMode:开启后（true）仅在scene变化后才渲染
- scene.debugShowFramePerSecond：开启后（true）查看性能，显示每秒帧数和帧之间的时间
- scene.globe.enableLighting: 是否开启光照，默认false
- scene.debugShowFramesPerSecond: 查看性能,默认false
- scene.requestRenderMode: 开启后只有在scene变化时才渲染 ,默认false
- scene.postRender： Event
 
### scene.fog:Fog

- scene.fog.enabled : 是否开启
- scene.fog.density: 雾气密度
- scene.fog.screenSpaceErrorFactor: 当地形瓦片部分处于雾中时，用于增加其屏幕空间误差的因子
- scene.fog.minimumBrightness :最小亮度
 
在Cesium中，雾是大气颜色和地平线上地形的混合。部分处于雾中的地形瓦片会增加其屏幕空间误差（SSE），这样可以渲染低分辨率的地形。     
完全在雾中的瓦片将被完全剔除，甚至不被请求。这些优化将地平线视图中渲染的瓦片和从服务器请求的瓦片的数量减少。       



### scene.skyAtmosphere :SkyAtmosphere
- scene.skyAtmosphere.brightnessShift 
- scene.skyAtmosphere.hueShift 
- scene.skyAtmosphere.saturationShift 
- scene.skyAtmosphere.show : 是否显示Boolean


### scene.globe ： Globe

- scene.globe.imageryLayers : ImageryLayerCollection
- scene.globe.terrainProvider : TerrainProvider
- scene.globe.ellipsoid : Ellipsoid 

- scene.globe.enableLighting : Boolean

// 饱和度，亮度，色相
- scene.globe.atmosphereHueShift : Number
- scene.globe.atmosphereBrightnessShift : Number
- scene.globe.atmosphereSaturationShift : Number
- scene.globe.

- scene.globe.show : Boolean

// 性能相关
- scene.globe.tileCacheSize : Number ，A larger number will consume more memory but will show detail faster 
- scene.globe.maximumScreenSpaceError : Number ， Higher values will provide better performance but lower visual quality.   
  较高的maximumScreenSpaceError将会渲染更少的贴图，进而可以提高性能，而较低的值将提高视觉质量。   

//方法
- scene.globe.getHeight(cartographic) → Number|undefined, Get the height of the surface at a given cartographic.

- scene.globe.pick(ray, scene, result) → Cartesian3|undefined

```
// find intersection of ray through a pixel and the globe
var ray = viewer.camera.getPickRay(windowCoordinates);
var intersection = globe.pick(ray, scene);
```
 
 
## Scene 方法

### 高度取样

#### 3D Tiles、primitives和地球globe上对象高度取样
May be used to clamp objects to the globe, 3D Tiles, or primitives in the scene.
- scene.clampToHeight(cartesian, objectsToExclude, width, result) → Cartesian3
- scene.clampToHeightMostDetailed(cartesians, objectsToExclude, width) → Promise.<Array.<Cartesian3>>
- scene.sampleHeight(position, objectsToExclude, width) → Number
- scene.sampleHeightMostDetailed(positions, objectsToExclude, width) → Promise.<Array.<Number>>
 
* scene.clampToHeightSupported : Boolean
* scene.sampleHeightSupported : Boolean


#### 地形高度取样

- Cesium.sampleTerrainMostDetailed(terrainProvider, positions) → Promise.<Array.<Cartographic>>

```
// Query the terrain height of two Cartographic positions
var terrainProvider = Cesium.createWorldTerrain();
var positions = [
    Cesium.Cartographic.fromDegrees(86.925145, 27.988257),
    Cesium.Cartographic.fromDegrees(87.0, 28.0)
];
var promise = Cesium.sampleTerrainMostDetailed(terrainProvider, positions);
Cesium.when(promise, function(updatedPositions) {
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
});
```







 

 


//scene.pickFromRay

globe.prototype.pick = function (ray) {
            ray = convertRay(ray);
            var result = this._cesiumWidget.scene.pickFromRay(ray);
            if (!!result && !!result.object) {
                cartographic = Cesium.Cartographic.fromCartesian(result.position, undefined, cartographic);
                pickResult.x = Cesium.Math.toDegrees(cartographic.longitude);
                pickResult.y = Cesium.Math.toDegrees(cartographic.latitude);
                pickResult.z = cartographic.height;
                return pickResult;
            }
        }
 
 
        
    
        
        
        
//scene.camera.getPickRay(pixels);     
// scene.globe.pick(ray, scene);
        
globe.prototype.pickSurfacePosition = function (pixels) {
var scene = this._cesiumWidget.scene;
var ray = scene.camera.getPickRay(pixels);
var cartesian = scene.globe.pick(ray, scene);
if (Cesium.defined(cartesian)) {
    return BindMapEvent.cartesian2Position.call(this, cartesian);
}
}

 

scene.camera.getPickRay(pixels);
scene.globe.pick(ray, scene);
scene.sampleHeightSupported
scene.sampleHeight(cartographic)


/**
 * 获取贴模型表面的坐标点
 * @param {Array<Number>} [pixels] 屏幕坐标例如：[0,0]
 * @returns {egis.sfs.Point} 返回地表的地理坐标
 */
globe.prototype.pickSamplePosition = function (pixels) {

    var result = this.pickSurfacePosition(pixels, function (cartesian, scene) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var height = 0;
        if (!!scene.sampleHeightSupported) {
            height = scene.sampleHeight(cartographic);
        }
        if (!height) {
            height = 0;
        }
        cartographic.height = height;
        cartesian = Cesium.Cartographic.toCartesian(cartographic, Cesium.Ellipsoid.WGS84);
        return cartesian;
    });
    return result;
}



//wgs84ToWindowCoordinates(scene, cartesian, result);

globe.prototype.getPixelFromCoordinate = function (coordinate) {
    cartesian = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], coordinate[2] || 0, undefined, cartesian);
    var scene = this._cesiumWidget.scene;
    result = WgstoWindowCoordinate.wgs84ToWindowCoordinates(scene, cartesian, result);
    if (!!result) {
        return [Math.round(result.x), Math.round(result.y)];
    }
    return [0, 0];
}
var pixelPos = new Cesium.Cartesian2();
var coordinates = Cesium.Cartesian4.clone(Cesium.Cartesian4.UNIT_W);





//scene.camera.pickEllipsoid(pixelPos, scene.globe.ellipsoid, coordinates);
 
globe.prototype.getCoordinateFromPixel = function (pixel) {
    if (pixel.x == undefined || pixel.y == undefined)
        return null;
    pixelPos.x = pixel.x;
    pixelPos.y = pixel.y;
    var scene = this._cesiumWidget.scene;
    var cartesian = scene.camera.pickEllipsoid(pixelPos, scene.globe.ellipsoid, coordinates);
    if (cartesian) {
        return BindMapEvent.cartesian2Position.call(this, cartesian);
    }
}








 












