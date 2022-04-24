- https://blog.csdn.net/qq_19689967/article/details/119642190 (基于 Cesium 使高德地图、百度地图、腾讯地图与天地图无偏移叠加)

## Cesium.ImageryProvider 接口

- ArcGisMapServerImageryProvider
- BingMapsImageryProvider
- OpenStreetMapImageryProvider
- TileMapServiceImageryProvider
- GoogleEarthEnterpriseImageryProvider
- GoogleEarthEnterpriseMapsProvider
- GridImageryProvider
- MapboxImageryProvider
- MapboxStyleImageryProvider
- SingleTileImageryProvider
- TileCoordinatesImageryProvider
- UrlTemplateImageryProvider: 通过使用指定的 URL 模板请求图块来提供图像。方便用户实现自己的 Provider，比如国内的高德，腾讯等影像服务，url 都是一个固定的规范，都可以通过该 Provider 轻松实现。而 OSM 也是通过该类实现的
- WebMapServiceImageryProvider : wms
- WebMapTileServiceImageryProvider : wmts

### Cesium.OpenStreetMapImageryProvider(options)

```
Cesium.OpenStreetMapImageryProvider({
           url : url
 });
```

### Cesium.ArcGisMapServerImageryProvider(options)

```

var imageryProvider = new Cesium.ArcGisMapServerImageryProvider({
       url:
         "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", // 3857坐标系
       tilingScheme: tilingScheme
});

```

### Cesium.MapboxStyleImageryProvider(options)

### Cesium.WebMapTileServiceImageryProvider(options)

options：

- url: Resource | String
- format: String, 'image/jpeg' op
- layer: String
- style: String
- tileMatrixSetID:String
- tileMatrixLabels:Array
- tileWidth: Number,默认 256
- tileHeight: Number,默认 256
- tilingScheme: TilingScheme
- rectangle: Rectangle
- minimumLevel: Number，最小层级
- maximumLevel: Number ，最大层级
- ellipsoid: Ellipsoid
- credit: Credit | String
- subdomains : String | Array.<String> ,如'abc'

### Cesium.WebMapServiceImageryProvider(options)

options：

- url: Resource | String
- layers: String
- parameters: Object，optionalAdditional parameters to pass to the WMS server in the GetMap URL.
- rectangle: Rectangle
- tilingScheme: TilingScheme
- ellipsoid: Ellipsoid
- tileWidth: Number 256
- tileHeight: Number 256
- minimumLevel: Number
- maximumLevel: Number
- crs: String WMS specification >= 1.3.0.
- srs: String WMS specification 1.1.0 or 1.1.1
- credit: Credit | String
- subdomains: String | Array.<String> 'abc'

## Cesium.ImageryLayer(imageryProvider, options)

imageryProvider：ImageryProvider

options:Object ：

- rectangle: Rectangle
- alpha: Number | function
- brightness: Number | function ，默认 1.0
- hue : Number | function
- saturation: Number | function ，1.0
- gamma: Number | function ，1.0
- show: Boolean true

## Cesium.ImageryLayerCollection()

- add(layer, index) layer： ImageryLayer index: Number
- addImageryProvider(imageryProvider, index) → ImageryLayer
- contains(layer) → Boolean
- get(index) → ImageryLayer
- indexOf(layer) → Number
- lower(layer)
- lowerToBottom(layer)
- pickImageryLayerFeatures(ray, scene) → Promise.<Array.<ImageryLayerFeatureInfo>>|undefined
- raise(layer)
- raiseToTop(layer)
- remove(layer, destroy) → Boolean
- removeAll(destroy) destroy: Boolean,默认 true

注：有 2 种添加图层的方法：
（1）add(layer, index) layer： ImageryLayer index: Number  
（2）addImageryProvider(imageryProvider, index) → ImageryLayer


