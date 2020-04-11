参考资料：    
https://www.cnblogs.com/telwanggs/p/11289954.html
https://www.cnblogs.com/arxive/p/10256065.html
https://blog.csdn.net/qq_34149805/article/details/78393540
http://www.yanhuangxueyuan.com/doc/Three.js/MatrixRST.html



## 准备知识
 
  Cesium中的坐标系：
- WGS84经纬度坐标系（没有实际的对象）  
- WGS84弧度坐标系（Cartographic）,地理坐标系下经纬度的弧度表示,通常情况下通过它和WGS84经纬度坐标系之间互转    
- 笛卡尔空间直角坐标系（Cartesian3）   
- 平面坐标系（Cartesian2）   
- 4D笛卡尔坐标系（Cartesian4）    



### 1 WGS84坐标系
World Geodetic System 1984，是为GPS全球定位系统使用而建立的坐标系统，坐标原点为**地球质心**，   
其地心空间直角坐标系的**Z轴**指向BIH （国际时间服务机构）1984.O定义的协议地球极（CTP)方向，**X轴**指向BIH 1984.0的零子午面和CTP赤道的交点，Y轴与Z轴、X轴垂直构成右手坐标系。  
我们平常手机上的指南针显示的经纬度就是这个坐标系下当前的坐标，进度范围[-180，180],纬度范围[-90，90]。   
我们都知道Cesium目前支持两种坐标系WGS84和WebMercator，但是在Cesium中**没有实际的对象来描述WGS84坐标**，都是以**弧度**的方式来进行运用的,也就是Cartographic类：      
- new Cesium.Cartographic(longitude, latitude, height)，    
这里的参数也叫longitude、latitude，就是经度和纬度，计算方法：弧度= π/180×经纬度角度。       
![WGS84坐标系](./wgs84.jpg)



### 2 笛卡尔空间直角坐标系（Cartesian3）

笛卡尔空间坐标的原点就是椭球的中心，我们在计算机上进行绘图时，不方便使用经纬度直接进行绘图，一般会将坐标系转换为笛卡尔坐标系，使用计算机图形学中的知识进行绘图。           
这里的Cartesian3，new Cesium.Cartesian3(x, y, z)，里面三个分量xyz。       
![Cartesian3](./Cartesian3.jpg)


### 3 平面坐标系（Cartesian2)

平面坐标系也就是平面直角坐标系，是一个二维笛卡尔坐标系，与Cartesian3相比少了一个z的分量，new Cesium.Cartesian2(x, y)。        
Cartesian2经常用来描述屏幕坐标系，比如鼠标在电脑屏幕上的点击位置，返回的就是Cartesian2，返回了鼠标点击位置的xy像素点分量。             
![Cartesian2](./Cartesian2.jpg)



## 坐标转换

### 1 经纬度和弧度互换
经纬度转弧度：var radians = Cesium.Math.toRadians(degrees);
弧度转经纬度：var degrees = Cesium.Math.toDegrees(radians);


### 2 角度/弧度与 WGS84坐标 转换


### 2.1  角度/弧度转WGS84坐标


1. 角度转换为弧度（如果为弧度，直接使用），然后直接使用： new Cesium.Cartographic(longitude弧度, latitude弧度, height米) → Cartographic
2. 使用如下方式：
    * Cesium.Cartographic.fromDegrees(longitude, latitude, height, result) → Cartographic 
    * Cesium.Cartographic.fromRadians(longitude, latitude, height, result) → Cartographic
 

### 2.2 WGS84坐标转角度/弧度

1. cartographic.longitude 为经度（弧度），cartographic.latitude为维度（弧度）
 
 

### 3 WGS84坐标(弧度/角度)（Cartographic） 与 笛卡尔空间直角坐标系（Cartesian）转换


#### 3.1 WGS84坐标(弧度/角度)（Cartographic） ->  笛卡尔空间直角坐标系（Cartesian）
 
1. Cesium.Cartographic.toCartesian(cartographic, ellipsoid, result) → Cartesian3

2. Cesium.Ellipsoid.WGS84.cartographicToCartesian(cartographic, result) → Cartesian3

3. Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographics, result) → Array.<Cartesian3>




#### 3.2 笛卡尔空间直角坐标系（Cartesian）->   WGS84坐标(弧度/角度)（Cartographic）

1. Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) → Cartographic

2. Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian, result) → Cartographic

3. Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(cartesians, result) → Array.<Cartographic>  批量转换

 


### 4 弧度/角度 转 笛卡尔空间直角坐标系（Cartesian3）
 
1. Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result) → Cartesian3
2. Cesium.Cartesian3.fromDegreesArray(coordinates, ellipsoid, result) → Array.<Cartesian3>
3. Cesium.Cartesian3.fromDegreesArrayHeights(coordinates, ellipsoid, result) → Array.<Cartesian3>

4. Cesium.Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result) → Cartesian3
5. Cesium.Cartesian3.fromRadiansArray(coordinates, ellipsoid, result) → Array.<Cartesian3>
6. Cesium.Cartesian3.fromRadiansArrayHeights(coordinates, ellipsoid, result) → Array.<Cartesian3>C



### 5  平面坐标系（Cartesian2）和笛卡尔空间直角坐标系（Cartesian3）的转换

#### 5.1  平面坐标系 -> 笛卡尔空间直角坐标系    
 
需要说明的是当前的点必须在三维球上，否则返回的是undefined，我们在ScreenSpaceEventHandler回调会取到的坐标都是Cartesian2   


1. scene.pickPosition(windowPosition, result) → Cartesian3     
   屏幕坐标转场景WGS84坐标，这里的场景坐标是包含了地形、倾斜、模型的坐标       
   var cartesian3= viewer.scene.pickPosition(Cartesian2)，目前IE浏览器不支持深度拾取，所以用不了这个方法    

2. camera.getPickRay + globe.pick     → Cartesian3  
   幕坐标转地表坐标，这里是地球表面的WGS84坐标，包含地形，不包括模型、倾斜摄影表面 

```
 var cartesian3= viewer.scene.globe.pick(viewer.camera.getPickRay(Cartesian2),viewer.scene);
// find intersection of ray through a pixel and the globe
// var ray = viewer.camera.getPickRay(windowCoordinates);
// var intersection =  viewer.scene.globe.pick(ray, viewer.scene);

```


3. camera.pickEllipsoid(windowPosition, ellipsoid, result) → Cartesian3     
   屏幕坐标转椭球面坐标，这里的椭球面坐标是参考椭球的WGS84坐标，不包含地形、模型、倾斜摄影表面         
   var cartesian3 = viewer.scene.camera.pickEllipsoid(Cartesian2)  
  
#### 5.2  笛卡尔空间直角坐标系 -> 平面坐标系
 
1. Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position, result) → Cartesian2

```
参数：   
 *scene: Scene   
 *position: Cartesian3, The position in WGS84 (world) coordinates.    
 *result: Cartesian2    
```
 

Cesium.Matrix3（3x3矩阵，用于描述旋转变换）；     
Cesium.Matrix4（4x4矩阵，用于描述旋转加平移变换）；      
Cesium.Quaternion（四元数，用于描述围绕某个向量旋转一定角度的变换）；         

 


### 6 局部坐标系和世界坐标系转换（待修正补充）

#### 6.1 局部坐标系转世界坐标系



```

 /**

 * 相对坐标系与世界坐标系转换，相对坐标系的轴方向由可选参数direction控制，默认是eastNorthUp北、东、上为轴线

 *

 * @param {Number} longitude 世界坐标系中的经度

 * @param {Number} latitude 世界坐标系中的纬度

 * @param {Number} height 世界坐标系中的高度

 * @param {Number} direction 坐标轴方向，值是"northEastDown","northUpEast","northWestUp","eastNorthUp"(默认)

 */

var LocalAndWorldTransform = function(longitude,latitude,height,direction){

 

    var RCSorigincenter = Cesium.Cartesian3.fromDegrees(longitude,latitude,height);

    if (direction == "northEastDown")

        this.RCSMatrix = Cesium.Transforms.northEastDownToFixedFrame(RCSorigincenter);

    else if (direction == "northUpEast")

        this.RCSMatrix = Cesium.Transforms.northUpEastToFixedFrame(RCSorigincenter);

    else if (direction == "northWestUp")

        this.RCSMatrix = Cesium.Transforms.northWestUpToFixedFrame(RCSorigincenter);

    else

        this.RCSMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(RCSorigincenter);

    this.RCSmatrixInverse = Cesium.Matrix4.inverseTransformation(this.RCSMatrix, new Cesium.Matrix4());

 

  /**

   * 相对坐标转换成对应的世界坐标

   *

   * @param {Cartesian3	} localCoordinates 相对坐标系中的坐标，如 {x:1,y:1,z:1}

   * @param {Cartesian3} result 世界坐标系中的对应坐标，XYZ格式

   * @returns

   */

  this.localToWorldCoordinates = function(localCoordinates, result){

      if (!result) {

          result = new Cesium.Cartesian3();

      }

      Cesium.Matrix4.multiplyByPoint(this.RCSMatrix, localCoordinates, result);

      return result;

  };

 

  /**

   * 世界坐标转换成对应的相对坐标

   *

   * @param {Cartesian3} WorldCoordinates 世界坐标系中的坐标，XYZ格式

   * @param {Cartesian3} result 相对坐标系中的坐标，XYZ格式

   * @returns

   */

  this.WorldCoordinatesTolocal = function(WorldCoordinates, result){

      if (!result) {

          result = new Cesium.Cartesian3();

      }

      Cesium.Matrix4.multiplyByPoint(this.RCSmatrixInverse, WorldCoordinates, result);

      return result;

  };

};
 

```

 


var getModelMatrix = function(lon, lat, rotationZ) {
    // 1) create a translation position matrix
    var posMat = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat));
    // 2) create a Matrix3 with a given Z rotation
    var rotMat3 = Cesium.Matrix3.fromRotationZ(Math.random() * 360);                        
    // 3) transform the Matrix3 into a Matrix4 with no translation
    var rotMat4 = Cesium.Matrix4.fromRotationTranslation(rotMat3, undefined, undefined);
    // 4) empty matrix to place result in
    var result = new Cesium.Matrix4();
    // 5) multiply position by rotation
    return Cesium.Matrix4.multiply(posMat, rotMat4, result);             
};




 

 
//计算两个三维坐标系之间的距离
var d = Cesium.Cartesian3.distance(
    new Cesium.Cartesian3(pick1.x, pick1.y, pick1.z), 
    new Cesium.Cartesian3(pick3.x, pick3.y, pick3.z)
); //pick1、pick3都是三维坐标系
 









一个局部坐标为p1(x,y,z)的点，将它的局部坐标原点放置到loc(lng,lat,alt)上，局部坐标的z轴垂直于地表，局部坐标的y轴指向正北，
并围绕这个z轴旋转angle度，求此时p1(x,y,z)变换成全局坐标笛卡尔坐标p2(x1,y1,z1)是多少？

 
var rotate = Cesium.Math.toRadians(angle);//转成弧度
var quat = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, rotate); //quat为围绕这个z轴旋转d度的四元数
var rot_mat3 = Cesium.Matrix3.fromQuaternion(quat);//rot_mat3为根据四元数求得的旋转矩阵

var pt = new Cesium.Cartesian3(x, y, z);//p1的局部坐标
// m2为旋转加平移的4x4变换矩阵，这里平移为(0,0,0)，故填个Cesium.Cartesian3.ZERO
var m = Cesium.Matrix4.fromRotationTranslation(rot_mat3, Cesium.Cartesian3.ZERO);
m = Cesium.Matrix4.multiplyByTranslation(m, pt);//m = m X v

//得到局部坐标原点的全局坐标
var cart3 = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(lng, lat, alt));
//m1为局部坐标的z轴垂直于地表，局部坐标的y轴指向正北的4x4变换矩阵
var m1 = Cesium.Transforms.eastNorthUpToFixedFrame(cart3);
m = Cesium.Matrix4.multiplyTransformation(m, m1);//m = m X m1
var p2 = Cesium.Matrix4.getTranslation(m);//根据最终变换矩阵m得到p2
 


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
平移矩阵T：表示一个顶点坐标沿着X、Y、Z轴分别平移Tx、Ty、Tz

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
比如一个几何体的所有顶点坐标沿着X、Y、Z轴分别缩放矩阵Sx、Sy、Sz倍，可以用如下矩阵S表示。

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


绕x轴旋转α度对应的旋转矩阵Rx：    

```
 | 1  0     0     0 |   | x |   |       x       |
 | 0  cosα  -sinα 0 | x | y | = | cosα*y-sinα*z |
 | 0  sinα  cosα  0 |   | z |   | sinα*y+cosα*z |
 | 0  0     0     1 |   | 1 |   |        1      |
```


绕y轴旋转α度对应的旋转矩阵Ry:   

```
 | cosα  0  -sinα 0 |   | x |   |  cosα*x+sinα*z |
 | 0     1  0     0 | x | y | = |        y       |
 | sinα  0  cosα  0 |   | z |   | -sinα*x+cosα*z |
 | 0     0  0     1 |   | 1 |   |        1       |
```
 
绕z轴旋转α度对应的旋转矩阵Rz:     

```
 | cosα  -sinα 0  0 |   | x |   |  cosα*x-sinα*y |
 | sinα  cosα  0  0 | x | y |   |  sinα*x+cosα*y |
 | 0     0     1  0 |   | z |   |        z       |
 | 0     0     0  1 |   | 1 |   |        1       |
```

















