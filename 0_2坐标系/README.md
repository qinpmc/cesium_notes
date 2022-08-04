参考资料：

- https://www.cnblogs.com/telwanggs/p/11289954.html
- https://www.cnblogs.com/CreateFree/p/11244512.html
- https://blog.csdn.net/qq_40043761/article/details/81020823?utm_source=blogxgwz3
- https://blog.csdn.net/weixin_45782925/article/details/123365834
  // todo

- https://www.cnblogs.com/arxive/p/10256065.html
- http://www.yanhuangxueyuan.com/doc/Three.js/MatrixRST.html
- https://blog.csdn.net/xtfge0915/article/details/104653730
- https://www.jianshu.com/p/5839f615bb94

## 准备知识

Cesium 中的坐标系：

- WGS84 经纬度坐标系（没有实际的对象）
- WGS84 弧度坐标系（Cartographic）,地理坐标系下经纬度的弧度表示,通常情况下通过它和 WGS84 经纬度坐标系之间互转
- 笛卡尔空间直角坐标系（Cartesian3）
- 平面坐标系（Cartesian2）
- 4D 笛卡尔坐标系（Cartesian4）

### 1 WGS84 坐标系

World Geodetic System 1984，是为 GPS 全球定位系统使用而建立的坐标系统，坐标原点为**地球质心**，  
其地心空间直角坐标系的**Z 轴**指向 BIH （国际时间服务机构）1984.O 定义的协议地球极（CTP)方向，**X 轴**指向 BIH 1984.0 的零子午面和 CTP 赤道的交点，Y 轴与 Z 轴、X 轴垂直构成右手坐标系。  
我们平常手机上的指南针显示的经纬度就是这个坐标系下当前的坐标，进度范围[-180，180],纬度范围[-90，90]。  
我们都知道 Cesium 目前支持两种坐标系 WGS84 和 WebMercator，但是在 Cesium 中**没有实际的对象来描述 WGS84 坐标**，都是以**弧度**的方式来进行运用的,也就是 Cartographic 类：

- new Cesium.Cartographic(longitude, latitude, height)，  
  这里的参数也叫 longitude、latitude，就是经度和纬度，计算方法：弧度= π/180× 经纬度角度。  
  ![WGS84坐标系](./wgs84.jpg)

### 2 笛卡尔空间直角坐标系（Cartesian3）

笛卡尔空间坐标的原点就是椭球的中心，我们在计算机上进行绘图时，不方便使用经纬度直接进行绘图，一般会将坐标系转换为笛卡尔坐标系，使用计算机图形学中的知识进行绘图。  
这里的 Cartesian3，new Cesium.Cartesian3(x, y, z)，里面三个分量 xyz。  
![Cartesian3](./Cartesian3.jpg)

### 3 平面坐标系（Cartesian2)

平面坐标系也就是平面直角坐标系，是一个二维笛卡尔坐标系，与 Cartesian3 相比少了一个 z 的分量，new Cesium.Cartesian2(x, y)。  
Cartesian2 经常用来描述屏幕坐标系，比如鼠标在电脑屏幕上的点击位置，返回的就是 Cartesian2，返回了鼠标点击位置的 xy 像素点分量。  
![Cartesian2](./Cartesian2.jpg)

## 坐标转换

### 1 经纬度和弧度互换

经纬度转弧度：var radians = Cesium.Math.toRadians(degrees);
弧度转经纬度：var degrees = Cesium.Math.toDegrees(radians);

### 2 角度/弧度与 WGS84 坐标 转换

### 2.1 角度/弧度转 WGS84 坐标

1. 角度转换为弧度（如果为弧度，直接使用），然后直接使用： new Cesium.Cartographic(longitude 弧度, latitude 弧度, height 米) → Cartographic
2. 使用如下方式：
   - Cesium.Cartographic.fromDegrees(longitude, latitude, height, result) → Cartographic
   - Cesium.Cartographic.fromRadians(longitude, latitude, height, result) → Cartographic

### 2.2 WGS84 坐标转角度/弧度

1. cartographic.longitude 为经度（弧度），cartographic.latitude 为维度（弧度）

### 3 WGS84 坐标(弧度/角度)（Cartographic） 与 笛卡尔空间直角坐标系（Cartesian）转换

#### 3.1 WGS84 坐标(弧度/角度)（Cartographic） -> 笛卡尔空间直角坐标系（Cartesian）

1. Cesium.Cartographic.toCartesian(cartographic, ellipsoid, result) → Cartesian3

2. Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographic, result) → Cartesian3

3. Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(Array.<Cartographic>, results) → Array.<Cartesian3>

#### 3.2 笛卡尔空间直角坐标系（Cartesian）-> WGS84 坐标(弧度/角度)（Cartographic）

1. Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) → Cartographic

2. Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian, result) → Cartographic

3. Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(Array.<Cartesian3>, result) → Array.<Cartographic> 批量转换

### 4 弧度/角度 转 笛卡尔空间直角坐标系（Cartesian3）

1. Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result) → Cartesian3
2. Cesium.Cartesian3.fromDegreesArray(coordinates, ellipsoid, result) → Array.<Cartesian3>
3. Cesium.Cartesian3.fromDegreesArrayHeights(coordinates, ellipsoid, result) → Array.<Cartesian3>

4. Cesium.Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result) → Cartesian3
5. Cesium.Cartesian3.fromRadiansArray(coordinates, ellipsoid, result) → Array.<Cartesian3>
6. Cesium.Cartesian3.fromRadiansArrayHeights(coordinates, ellipsoid, result) → Array.<Cartesian3>C

### 5 平面坐标系（Cartesian2）和笛卡尔空间直角坐标系（Cartesian3）的转换

#### 5.1 平面坐标系 -> 笛卡尔空间直角坐标系

需要说明的是当前的点必须在三维球上，否则返回的是 undefined，我们在 ScreenSpaceEventHandler 回调会取到的坐标都是 Cartesian2

1. scene.pickPosition(windowPosition, result) → Cartesian3  
   屏幕坐标转场景 WGS84 坐标，这里的场景坐标是包含了地形、倾斜、模型的坐标  
   var cartesian3= viewer.scene.pickPosition(Cartesian2)，目前 IE 浏览器不支持深度拾取，所以用不了这个方法

2. camera.getPickRay + globe.pick → Cartesian3  
   屏幕坐标转地表坐标，这里是地球表面的 WGS84 坐标，包含地形，不包括模型、倾斜摄影表面

```
 var cartesian3= viewer.scene.globe.pick(viewer.camera.getPickRay(Cartesian2),viewer.scene);
// find intersection of ray through a pixel and the globe
// var ray = viewer.camera.getPickRay(windowCoordinates);
// var intersection =  viewer.scene.globe.pick(ray, viewer.scene);

```

3. camera.pickEllipsoid(windowPosition, ellipsoid, result) → Cartesian3  
   屏幕坐标转椭球面坐标，这里的椭球面坐标是参考椭球的 WGS84 坐标，不包含地形、模型、倾斜摄影表面  
   var cartesian3 = viewer.scene.camera.pickEllipsoid(Cartesian2)

#### 5.2 笛卡尔空间直角坐标系 -> 平面坐标系

1. Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position<Cartesian3>, result<Cartesian2>) → Cartesian2

```
参数：
 *scene: Scene
 *position: Cartesian3, The position in WGS84 (world) coordinates.
 *result: Cartesian2
```

Cesium.Matrix3（3x3 矩阵，用于描述旋转变换）；  
Cesium.Matrix4（4x4 矩阵，用于描述旋转加平移变换）；  
Cesium.Quaternion（四元数，用于描述围绕某个向量旋转一定角度的变换）；

#### 5.3 椭球笛卡尔坐标与局部笛卡尔坐标

```
let cartesian3 = Cesium.Cartesian3.fromDegrees(longitude, latitude, height) ;
let modelMatrix = Cesium.Transforms.esatNorthUpToFixedFrame(cartesian3);
let offset = new Cesium.Cartesian3(10,0,0);
const newCartesian3 = Cesium.Matrix4.multiplyByPoint(modelMatrix, offset, new Cesium.Cartesian3());
```

### 6 局部坐标系和世界坐标系转换

见 ：

- coordinate3_1 局部-全球坐标转换.html
- coordinate3_2-局部-全球坐标转换(卡车移动).html

## 示例

1. 计算两个三维坐标系之间的距离

```
// pick1、pick3 都是三维坐标系
var d = Cesium.Cartesian3.distance(
new Cesium.Cartesian3(pick1.x, pick1.y, pick1.z),
new Cesium.Cartesian3(pick3.x, pick3.y, pick3.z)
);
```

2.

一个局部坐标为 p1(x,y,z)的点，将它的局部坐标原点放置到 loc(lng,lat,alt)上，局部坐标的 z 轴垂直于地表，局部坐标的 y 轴指向正北，
并围绕这个 z 轴旋转 angle 度，求此时 p1(x,y,z)变换成全局坐标笛卡尔坐标 p2(x1,y1,z1)是多少？

// 计算旋转矩阵
var rotate = Cesium.Math.toRadians(angle);//转成弧度
var quat = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, rotate); //quat 为围绕这个 z 轴旋转 d 度的四元数
var rot_mat3 = Cesium.Matrix3.fromQuaternion(quat);//rot_mat3 为根据四元数求得的旋转矩阵

//
var pt = new Cesium.Cartesian3(x, y, z);//p1 的局部坐标
// m2 为旋转加平移的 4x4 变换矩阵，这里平移为(0,0,0)，故填个 Cesium.Cartesian3.ZERO
var m = Cesium.Matrix4.fromRotationTranslation(rot_mat3, Cesium.Cartesian3.ZERO);
m = Cesium.Matrix4.multiplyByTranslation(m, pt);//m = m X v

//得到局部坐标原点的全局坐标
var cart3 = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(lng, lat, alt));
//m1 为局部坐标的 z 轴垂直于地表，局部坐标的 y 轴指向正北的 4x4 变换矩阵
var m1 = Cesium.Transforms.eastNorthUpToFixedFrame(cart3);
m = Cesium.Matrix4.multiplyTransformation(m, m1);//m = m X m1
var p2 = Cesium.Matrix4.getTranslation(m);//根据最终变换矩阵 m 得到 p2

//CESIUM 空间中 AB 两点 A 绕 B 点的地面法向量旋转任意角度后新的 A 点坐标(A’)

var A = new Cesium.Cartesian3(675679.994355399, 4532763.148054989, 4426298.210847025);
var B = new Cesium.Cartesian3(675520.4303984543, 4532803.837842555, 4425994.113846752);

// 计算 B 的地面法向量
var chicB = Cesium.Cartographic.fromCartesian(B);
chicB.height = 0;
var dB = Cesium.Cartographic.toCartesian(chicB);
var normaB = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(dB, B, new Cesium.Cartesian3()), new Cesium.Cartesian3());

// 构造基于 B 的法向量旋转 90 度的矩阵
var Q = Cesium.Quaternion.fromAxisAngle(normaB, Cesium.Math.toRadians(90));
var m3 = Cesium.Matrix3.fromQuaternion(Q);
var m4 = Cesium.Matrix4.fromRotationTranslation(m3);

// 计算 A 点相对 B 点的坐标 A1
var A1 = Cesium.Cartesian3.subtract(A, B, new Cesium.Cartesian3());

//对 A1 应用旋转矩阵
var p = Cesium.Matrix4.multiplyByPoint(m4, A1, new Cesium.Cartesian3());
// 新的 A 的坐标
var p2 = Cesium.Cartesian3.add(p, B, new Cesium.Cartesian3());

viewer.entities.add({
polyline: {
positions: [B, A],
width: 5,
material: Cesium.Color.RED
},
});

viewer.entities.add({
polyline: {
positions: [B, p2],
width: 5,
material: Cesium.Color.BLUE
},

});

// Cesium 计算一个点正北方向 x 米的另一个点的坐标
function getNorthPointByDistance(position, distance) {
//以点为原点建立局部坐标系（东方向为 x 轴,北方向为 y 轴,垂直于地面为 z 轴），得到一个局部坐标到世界坐标转换的变换矩阵
var localToWorld_Matrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
return Cesium.Matrix4.multiplyByPoint(localToWorld_Matrix, Cesium.Cartesian3.fromElements(0, distance, 0), new Cesium.Cartesian3())
}

var getModelMatrix = function(lon, lat, rotationZ) {
// 1) create a translation position matrix
var posMat = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat));
// 2) create a Matrix3 with a given Z rotation
var rotMat3 = Cesium.Matrix3.fromRotationZ(Math.random() \* 360);  
 // 3) transform the Matrix3 into a Matrix4 with no translation
var rotMat4 = Cesium.Matrix4.fromRotationTranslation(rotMat3, undefined, undefined);
// 4) empty matrix to place result in
var result = new Cesium.Matrix4();
// 5) multiply position by rotation
return Cesium.Matrix4.multiply(posMat, rotMat4, result);  
};

Cesium.Transforms.eastNorthUpToFixedFrame(origin, ellipsoid, result) → Matrix4
Cesium.SceneTransforms
Cesium.Transforms
new Cesium.TranslationRotationScale(translation, rotation, scale)
Cartesian2
Cartesian3
Cartesian4
Cesium.Matrix2
Cesium.Matrix3
Cesium.Matrix4
Cesium.Quaternion

### 7 各类矩阵

#### 7.1 平移矩阵

平移矩阵 T：表示一个顶点坐标沿着 X、Y、Z 轴分别平移 Tx、Ty、Tz

```
 | 1  0  0  Tx |
 | 0  1  0  Ty |
 | 0  0  1  Tz |
 | 0  0  0  1  |

顶点坐标平移变换:

 | 1  0  0  Tx |   | x |   | x+Tx |
 | 0  1  0  Ty | x | y | = | y+Ty |
 | 0  0  1  Tz |   | z |   | z+Tz |
 | 0  0  0  1  |   | 1 |   |  1   |

```

#### 7.2 缩放矩阵

比如一个几何体的所有顶点坐标沿着 X、Y、Z 轴分别缩放矩阵 Sx、Sy、Sz 倍，可以用如下矩阵 S 表示。

```
 | Sx 0  0  0 |
 | 0  Sy 0  0 |
 | 0  0  Sz 0 |
 | 0  0  0  1 |

顶点坐标缩放变换:

 | Sx 0  0  0 |   | x |   | x*Sx |
 | 0  Sy 0  0 | x | y | = | y*Sy |
 | 0  0  Sz 0 |   | z |   | z*Sz |
 | 0  0  0  1 |   | 1 |   |  1   |

```

#### 7.3 旋转矩阵:

绕 x 轴旋转 α 度对应的旋转矩阵 Rx：

```
 | 1  0     0     0 |   | x |   |       x       |
 | 0  cosα  -sinα 0 | x | y | = | cosα*y-sinα*z |
 | 0  sinα  cosα  0 |   | z |   | sinα*y+cosα*z |
 | 0  0     0     1 |   | 1 |   |        1      |
```

绕 y 轴旋转 α 度对应的旋转矩阵 Ry:

```
 | cosα  0  -sinα 0 |   | x |   |  cosα*x+sinα*z |
 | 0     1  0     0 | x | y | = |        y       |
 | sinα  0  cosα  0 |   | z |   | -sinα*x+cosα*z |
 | 0     0  0     1 |   | 1 |   |        1       |
```

绕 z 轴旋转 α 度对应的旋转矩阵 Rz:

```
 | cosα  -sinα 0  0 |   | x |   |  cosα*x-sinα*y |
 | sinα  cosα  0  0 | x | y |   |  sinα*x+cosα*y |
 | 0     0     1  0 |   | z |   |        z       |
 | 0     0     0  1 |   | 1 |   |        1       |
```

## Cesium 矩阵

Cesium 矩阵为列主序

```

const ary = [1, 0, 0, 0, 0, 1, 0, -0.4, 0, 0, 1, 2.7, 0, 0, 0, 1];
const m4 = new Cesium.Matrix4(...ary);

console.log(m4);
// Matrix4 {0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0, 10: 1, 11: 0, 12: 0, 13: -0.4, 14: 2.7, 15: 1}
// 注意数组ary 和 矩阵m4 中元素的对应关系
```
