- https://blog.csdn.net/xtfge0915/article/details/104653730
- https://blog.csdn.net/xtfge0915/article/details/105277427

- https://blog.csdn.net/qq_24641385/article/details/106085428
- https://blog.csdn.net/xiaohuanhuandog/article/details/104037094
- https://www.cxyzjd.com/article/d351064378/111998325

//

- https://xiaozhuanlan.com/topic/1425369780
- https://www.cnblogs.com/onsummer/p/14059220.html

-
- https://its201.com/article/youlinhuanyan/104703870
- https://daimajiaoliu.com/daima/6cba4d0e24a2804
- https://www.codetd.com/article/1805831
- https://blog.csdn.net/youlinhuanyan/article/details/104703870
- https://github.com/panergongzi/cesiumWork
- https://www.jianshu.com/p/0b0df0eb791b
- https://blog.katastros.com/a?ID=01700-4a590fde-d73d-4dc9-a60a-bfc7fcbdcf5d
- https://www.cnblogs.com/mazhenyu/p/13856411.html

- https://blog.katastros.com/a?ID=01700-4a590fde-d73d-4dc9-a60a-bfc7fcbdcf5dystem
- https://blog.actorsfit.com/a?ID=00650-4dd4c6b5-fff8-489d-b735-1eb3e6560660
- https://blog.csdn.net/youlinhuanyan/article/details/103242162
- https://programs.wiki/wiki/use-cesium-to-load-3dfiles-and-adjust-them.html

### Model 添加

```
// entity方式
  var entities = new Cesium.EntityCollection();
  var entity = entities.add({
      name: url,
      position: position,
      orientation: orientation,
      model: {
          uri: url,
          minimumPixelSize: 128,
          maximumScale: 20000,
          silhouetteColor: Cesium.Color.BLUE, //轮廓线颜色
          silhouetteSize: 3
      }
  })
```

```
//  entity方式-ModelGraphics
  var modelGraphics = new Cesium.ModelGraphics({
    uri: url,
    minimumPixelSize: 128,
    maximumScale: 20000,
    colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
    color: Cesium.Color.GREEN
})


var entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: modelGraphics
});

```

```
// primitive方式
  var model = Cesium.Model.fromGltf({
    url: "../sampleData/model/Cesium_Air.glb",
    modelMatrix: modelMatrix,
    minimumPixelSize: 128,
    maximumScale: 20000,
  });
  var primitiveModel = primitives.add(model)

```

## 创建平移、缩放、旋转矩阵

```
创建平移矩阵 4x4
//创建平移矩阵方法一
const mat4 = Cesium.Matrix4.fromArray([
1.0, 0.0, 0.0, 0.0,
0.0, 1.0, 0.0, 0.0,
0.0, 0.0, 1.0, 0.0,
x, y, z, 1.0
]);

//创建平移矩阵方法二
const translation = Cesium.Cartesian3.fromArray([x, y, z]);
const mat4 = Cesium.Matrix4.fromTranslation(translation);
创建旋转矩阵 4x4
const mat3RoateX = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45))
const mat4 = Cesium.Matrix4.fromRotationTranslation(mat3RoateX)
创建旋转加平移矩阵 4x4
const translation = Cesium.Cartesian3.fromArray([x, y, z]);
const mat3RoateX = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45))
const mat4 = Cesium.Matrix4.fromRotationTranslation(mat3RoateX, translation)


创建一个缩放矩阵 4x4
// Creates
//   [7.0, 0.0, 0.0, 0.0]
//   [0.0, 8.0, 0.0, 0.0]
//   [0.0, 0.0, 9.0, 0.0]
//   [0.0, 0.0, 0.0, 1.0]
var mat4 = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
```

## Cesium.HeightReference

```
var longitude = 94.01;
var latitude = 30.07;
var height = 72.8;
var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, 72.8);
var heading = Cesium.Math.toRadians(0);
var pitch = 0;
var roll = 0;
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

 var modelGraphics = new Cesium.ModelGraphics({
    uri: url,
    minimumPixelSize: 16,
    maximumScale: 20000,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, // CLAMP_TO_GROUND RELATIVE_TO_GROUND  NONE
    //colorBlendMode: Cesium.ColorBlendMode.REPLACE,
    //color: Cesium.Color.GREEN
})
```

- Cesium.HeightReference.NONE: 高度有用，需设置正确的高度，否则可能被地形遮盖
- Cesium.HeightReference.CLAMP_TO_GROUND: 模型总是贴地，高度无用
- Cesium.HeightReference.RELATIVE_TO_GROUND: 相对于地面的高度，高度是相对地面的高度值

##

3dtiles inspector

Cesium.Cesium3DTileStyle(style)
3D Tiles Styling language(https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling)

ClassificationPrimitive(单体化？)

- https://blog.csdn.net/Gua_guagua/article/details/126880738
- https://blog.csdn.net/u013240519/article/details/121970561
- http://events.jianshu.io/p/0b0df0eb791b
- https://community.cesium.com/t/how-to-apply-model-orientation-rotation-then-use-velocityorientationproperty/4682
