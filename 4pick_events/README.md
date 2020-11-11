参考资料：  
 https://blog.csdn.net/caozl1132/article/details/90257043
https://blog.csdn.net/weitaming1/article/details/95067688
https://zhuanlan.zhihu.com/p/44767866

## 1 ScreenSpaceEventType

- Cesium.ScreenSpaceEventType.LEFT_CLICK: 鼠标左键单击击事件
- Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK: 鼠标左键双击事件
- Cesium.ScreenSpaceEventType.LEFT_DOWN ：鼠标左键按下事件
- Cesium.ScreenSpaceEventType.LEFT_UP ：鼠标左键抬起事件
- Cesium.ScreenSpaceEventType.MIDDLE_CLICK ：鼠标中键单击事 ​​ 件
- Cesium.ScreenSpaceEventType.MIDDLE_DOWN ：鼠标中键按下事件
- Cesium.ScreenSpaceEventType.MIDDLE_UP：鼠标中键抬起事件
- Cesium.ScreenSpaceEventType.MOUSE_MOVE ：鼠标移动事件
- Cesium.ScreenSpaceEventType.PINCH_END ：触摸表面上的双指事件的结束
- Cesium.ScreenSpaceEventType.PINCH_MOVE ：触摸表面上双指移动事件
- Cesium.ScreenSpaceEventType.PINCH_START ：触摸表面上双指事件的开始
- Cesium.ScreenSpaceEventType.RIGHT_CLICK ：鼠标右键单击事件
- Cesium.ScreenSpaceEventType.RIGHT_DOWN ：鼠标右键按下事件
- Cesium.ScreenSpaceEventType.WHEEL ：鼠标滚轮事件

## 2 Cesium.ScreenSpaceEventHandler(element)

- element： Canvas， The element to add events to.

### 2.1 setInputAction(action, type, modifier)

- action : function , Function to be executed when the input event occurs.
- type : Number , The ScreenSpaceEventType of input event.
- modifier : Number, optionalA KeyboardEventModifier key that is held when a type event occurs.

### 2.2 removeInputAction(type, modifier)

- type : Number , The ScreenSpaceEventType of input event.
- modifier : Number, optionalA KeyboardEventModifier key that is held when a type event occurs.

## 拾取

### scene.drillPick(windowPosition, limit, width, height) → Array.<Object>

- windowPosition: Cartesian2 ,屏幕平面坐标
- limit: Number， If supplied, stop drilling after collecting this many picks.
- width: Number 3 optionalWidth of the pick rectangle.
- height: Number 3 optionalHeight of the pick rectangle.

### scene.pick(windowPosition, width, height) → Object

- windowPosition: Cartesian2 ,屏幕平面坐标
- width: Number 3 optionalWidth of the pick rectangle.
- height: Number 3 optionalHeight of the pick rectangle.

### scene.pickPosition(windowPosition, result) → Cartesian3

返回从深度缓冲区和窗口位置重建的笛卡尔位置

- windowPosition： Cartesian2 ,屏幕平面坐标
- result： Cartesian3

### camera.getPickRay(windowPosition, result) → Ray

- windowPosition： Cartesian2 ,屏幕平面坐标
- result: Ray

### camera.pickEllipsoid(windowPosition, ellipsoid, result) → Cartesian3

- windowPosition:Cartesian2 ,屏幕平面坐标
- ellipsoid:Ellipsoid,默认 Ellipsoid.WGS84
- result: Cartesian3

### globe.pick(ray, scene, result) → Cartesian3|undefined

- ray: Ray
- scene: Scene
- result: Cartesian3

### 拾取总结

#### 1、拾取的方式

- scene 中有 pick、drillPick、pickPosition；
- camera 中有 getPickRay、pickEllipsoid；
- globe 中有 pick

#### 2、scene 中拾取（一般用来获取 entity 对象）

- pick：scene.pick 可以通过此方法获取到 pick 对象，通过 pick.id 即可拾取当前的 entity 对象，也可以获取 Cesium3DTileFeature 对象；

- drillPick：scene.drillPick(click.position)是从当前鼠标点击位置获取 entity 的集合，然后通过 for 循环可以获取当前坐标下的所有 entity；

- pickPosition：通过 viewer.scene.pickPosition(movement.position)获取，可以获取场中任意点击处的对应的**世界坐标**。（高程不精确）

pick 与 drillPick 的区别：pick 只可获取一个 entity 对象（如该位置存在多个 entity，哪怕面点线不在同一高度，面 entity 都可能会盖住点线 entity），但 drillPick 可获取当前坐标下的多个对象；

```
//通过pick获取entity 
 handler.setInputAction(function (movement) {
        var pick = viewer.scene.pick(movement.endPosition);  //获取的pick对象
        var pickedEntity = Cesium.defined(pick) ? pick.id : undefined; //pick.id即为entity
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

```

#### 3、camera 和 globel 中的 pick

- camera.getPickRay 和 globe.pick 常用来组合使用，通过 camera 中的 getPickRay 获取 ray（射线），然后通过 globel 中的 pick 方法，获取世界坐标，
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

- globe.pick 的结果相对稳定准确，不论地形深度检测开启与否，不论加载的是默认地形还是别的地形数据；
- scene.pickPosition 只有在开启地形深度检测，且不使用默认地形时是准确的。
- globe.getHeight,镜头高度太高获取的高度会为错误的负数，镜头高度要足够低

```
var cartographic = Cesium.Cartographic.fromDegrees(lon,lat);
var height = viewer.scene.globe.getHeight(cartographic);
```

## Cesium.Ray(origin, direction)

- origin： Cartesian3 ，默认 Cartesian3.ZERO The origin of the ray.
- direction ： Cartesian3 ，默认 Cartesian3.ZERO The direction of the ray.

/\*\*

- 根据两点生成一个射线
- @param startPosition 射线起点
- @param endPosition 射线朝向方向上一点
- @returns Ray 返回一条射线
  \*/
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
