 

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
- UrlTemplateImageryProvider:
- WebMapServiceImageryProvider : wms
- WebMapTileServiceImageryProvider : wmts


### Cesium.OpenStreetMapImageryProvider(options)

 ``` 
 Cesium.OpenStreetMapImageryProvider({
            url : url
  });
```
 
###  Cesium.ArcGisMapServerImageryProvider(options)
 
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
- format: String, 'image/jpeg'	op 
- layer: String		 
- style: String	 
- tileMatrixSetID:String		 
- tileMatrixLabels:Array
- tileWidth: Number,默认256	 
- tileHeight: Number,默认256	 
- tilingScheme: TilingScheme		 
- rectangle: Rectangle	 
- minimumLevel: Number，最小层级
- maximumLevel: Number	，最大层级	 
- ellipsoid: Ellipsoid		 
- credit:  Credit | String		 
- subdomains	: String | Array.<String>	,如'abc'
 
### Cesium.WebMapServiceImageryProvider(options)
 options：  
 
- url: Resource | String		 
- layers: String		 
- parameters: Object，optionalAdditional parameters to pass to the WMS server in the GetMap URL. 
- rectangle: Rectangle	 
- tilingScheme: TilingScheme	 
- ellipsoid: Ellipsoid		 
- tileWidth: Number	256 
- tileHeight: Number	256	 
- minimumLevel: Number	   
- maximumLevel: Number	 
- crs: String		  WMS specification >= 1.3.0.
- srs: String		  WMS specification 1.1.0 or 1.1.1
- credit: Credit | String		 
- subdomains: String | Array.<String>	'abc'	  
 
 
 
 
##  Cesium.ImageryLayer(imageryProvider, options)

imageryProvider：ImageryProvider   

options:Object  ：

- rectangle: Rectangle	  
- alpha: Number | function	    
- brightness: Number | function	，默认1.0
- hue	: Number | function	  
- saturation: 	Number | function	，1.0	    
- gamma: Number | function	，1.0
- show: Boolean	true


## Cesium.ImageryLayerCollection()

- add(layer, index)  layer： ImageryLayer	 index: Number
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
- removeAll(destroy)   destroy: Boolean,默认true
- 
















