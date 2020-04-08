 https://blog.csdn.net/caozl1132/article/details/90257043
 https://blog.csdn.net/weitaming1/article/details/95067688
 https://zhuanlan.zhihu.com/p/44767866
 
 
 
##  ScreenSpaceEventType

- Cesium.ScreenSpaceEventType.LEFT_CLICK: 鼠标左键单击击事件
- Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK:  鼠标左键双击事件
- Cesium.ScreenSpaceEventType.LEFT_DOWN ：鼠标左键按下事件
- Cesium.ScreenSpaceEventType.LEFT_UP ：鼠标左键抬起事件
- Cesium.ScreenSpaceEventType.MIDDLE_CLICK ：鼠标中键单击事​​件
- Cesium.ScreenSpaceEventType.MIDDLE_DOWN ：鼠标中键按下事件
- Cesium.ScreenSpaceEventType.MIDDLE_UP：鼠标中键抬起事件
- Cesium.ScreenSpaceEventType.MOUSE_MOVE ：鼠标移动事件
- Cesium.ScreenSpaceEventType.PINCH_END ：触摸表面上的双指事件的结束
- Cesium.ScreenSpaceEventType.PINCH_MOVE ：触摸表面上双指移动事件
- Cesium.ScreenSpaceEventType.PINCH_START ：触摸表面上双指事件的开始
- Cesium.ScreenSpaceEventType.RIGHT_CLICK ：鼠标右键单击事件
- Cesium.ScreenSpaceEventType.RIGHT_DOWN ：鼠标右键按下事件
- Cesium.ScreenSpaceEventType.WHEEL ：鼠标滚轮事件
 
 
 
 
### 制鼠标的视图控制
 // 禁用放大缩小和自由旋转视图
 viewer.scene.screenSpaceCameraController.enableZoom = false;
 viewer.scene.screenSpaceCameraController.enableTilt = false;
 
 
### 修改视图默认鼠标操作方式
 // 修改默认的鼠标视图控制方式。
 viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];
 viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG];
 
 
 
## 拾取

### scene.drillPick(windowPosition, limit, width, height) → Array.<Object>
 
- windowPosition: Cartesian2	,屏幕平面坐标
- limit: Number， If supplied, stop drilling after collecting this many picks.
- width: Number	3	optionalWidth of the pick rectangle.
- height: Number	3	optionalHeight of the pick rectangle.
 
 
### scene.pick(windowPosition, width, height) → Object

- windowPosition: Cartesian2	,屏幕平面坐标
- width: Number	3	optionalWidth of the pick rectangle.
- height: Number	3	optionalHeight of the pick rectangle.
 
 
### scene.pickPosition(windowPosition, result) → Cartesian3
 返回从深度缓冲区和窗口位置重建的笛卡尔位置    
- windowPosition： Cartesian2  ,屏幕平面坐标
- result： Cartesian3	 


### camera.getPickRay(windowPosition, result) → Ray

- windowPosition： Cartesian2  ,屏幕平面坐标
- result: Ray	 


### camera.pickEllipsoid(windowPosition, ellipsoid, result) → Cartesian3

- windowPosition:Cartesian2		,屏幕平面坐标
- ellipsoid:Ellipsoid,默认 Ellipsoid.WGS84 
- result: Cartesian3		 


### globe.pick(ray, scene, result) → Cartesian3|undefined

- ray: Ray	 
- scene: Scene	 
- result: Cartesian3	 



### 拾取总结
 
#### 1、拾取的方式    
- scene中有pick、rillPick、pickPosition；
- camera中有getPickRay、pickEllipsoid；
- globe中有pick 
 
#### 2、scene中拾取（一般用来获取entity对象）
 
 - pick：scene.pick可以通过此方法获取到pick对象，通过pick.id即可拾取当前的entity对象，也可以获取Cesium3DTileFeature对象；
 
 - drillPick：scene.drillPick(click.position)是从当前鼠标点击位置获取entity的集合，然后通过for循环可以获取当前坐标下的所有entity；
 
 - pickPosition：通过viewer.scene.pickPosition(movement.position)获取，可以获取场中任意点击处的对应的世界坐标。（高程不精确）
 
 pick与drillPick的区别：pick只可获取一个entity对象（如该位置存在多个entity，哪怕面点线不在同一高度，面entity都可能会盖住点线entity），但drillPick可获取当前坐标下的多个对象；
 
 ```
 //通过pick获取entity 
  handler.setInputAction(function (movement) {
         var pick = viewer.scene.pick(movement.endPosition);  //获取的pick对象
         var pickedEntity = Cesium.defined(pick) ? pick.id : undefined; //pick.id即为entity
     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
 
 ```
 
 
#### 3、camera 和globel中的pick 
- camera.getPickRay 和 globe.pick常用来组合使用，通过camera中的getPickRay获取ray（射线），然后通过globel中的pick方法，获取世界坐标，
如下面的地形坐标的获取：
 
```

//通过camera的getPickRay，将当前的屏幕坐标转为ray（射线）；
var ray = scene.camera.getPickRay(movement.endPosition, tempRay);

//找出ray和地形的交点，即可求出三维世界坐标
var cartesian2 = scene.globe.pick(ray, scene, tempPos);

```

#### 结论

- camera.pickEllipsoid：获取鼠标点的对应椭球面位置，地形和模型等高度均获取不到
- camera.getPickRay + globe.pick，可获取地形，模型等高度获取不到
- scene.pickPosition，可获取地形，模型等高度
 
- globe.pick的结果相对稳定准确，不论地形深度检测开启与否，不论加载的是默认地形还是别的地形数据；  
- scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。  
- globe.getHeight,镜头高度太高获取的高度会为错误的负数，镜头高度要足够低
 
```
var cartographic = Cesium.Cartographic.fromDegrees(lon,lat);
var height = viewer.scene.globe.getHeight(cartographic);
```

  
  
  
 
 
 
## Cesium.Ray(origin, direction) 
 
- origin： Cartesian3 ，默认Cartesian3.ZERO	      The origin of the ray.
- direction	： Cartesian3 ，默认Cartesian3.ZERO	 The direction of the ray.
 
 
 
 
 /**
  * 根据两点生成一个射线
  * @param {egis.sfs.Point}startPosition 射线起点
  * @param {egis.sfs.Point}endPosition 射线朝向方向上一点
  * @returns {egis.sfs.Ray} 返回一条射线
  */
 globe.prototype.toRay = function (startPosition, endPosition) {
     var start = Cesium.Cartesian3.fromDegrees(startPosition.x, startPosition.y, startPosition.z);
     var end = Cesium.Cartesian3.fromDegrees(endPosition.x, endPosition.y, endPosition.z);
     var direction = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(end, start, cartesian), cartesian);
     var vector = new Vector3({
         x: direction.x,
         y: direction.y,
         z: direction.z
     })
     var ray = new Ray({
         origin: startPosition,
         direction: vector
     });
     return ray;
 }
 
 
 
 
 
 
 
 
 
 