# 数据

### dae 格式

是一种 3D 模型文件格式，一般用于多个图形程序之间交换数字数据，AutoDesk 专有并在 COLLADA（COLLAborative Design Activity）基础上改进创建的 XML 框架的文件格式。

### obj 格式

Obj 文件是 Alias Wavefront 公司为它的一套基于工作站的 3D 建模和动画软件 Advanced Visualizer 开发的一种标准 3D 模型文件格式，很适合用于 3D 文件模型之间的互导，也可以通过 Maya 读写。  
OBJ 是一种文本文件，可以直接用写字板打开进行查看和编辑修改。不包含动画、材质特性、贴图路径、粒子等信息。

### gltf

一种三维模型数据格式，可以减少 3D 格式中与渲染无关的冗余数据并且在更加适合 OpenGL 簇加载的一种 3D 文件格式。它的提出，也是在 3D 工业和媒体发展的工程中，对 3D 格式统一的需要。  
glb 是 gltf 数据二进制组织形式。

### 3DTiles

3DTiles 是为海量的异构三维地理空间数据集所设计的一个开放规范，该规范适用于各种常见的地理数据，如三维模型数据、点云数据、二维矢量数据等，  
3DTiles 的主要目的是针对大规模的异构数据源提高其加载速度和渲染性能。3DTiles 的实施方法是为海量数据加载添加一个快速索引和数据集的整体性描述，  
从而减少渲染循环中需要处理的实体数据量，实现海量数据的加载效率。3DTiles 不是依赖于如缩放等级的 2D 结构，而是基于 LOD 模式的几何误差和可调像素误差，  
它允许在同一视角下建立多个“缩放等级”来优化性能和视觉效果。

### cmpt

3DTiles 的模型切片文件格式中的一种，是一种复合格式，可以同时包含 b3dm、i3dm、pnts 格式的数据文件。

### gdb 格式

ESRI 公司定义的一种文件地理数据库，是一种在文件夹中保存的各种类型的 GIS 数据集的集合。每个数据集都是磁盘上的一个单独文件，每个数据集的大小可以达到 1TB，  
对于超大型影像数据集，还可将 1 TB 限值提高到 256 TB。  
该数据库可以跨平台使用，还可以以只读的压缩格式存储数据以降低存储要求。

### GeoJSON

GeoJSON 是一种对地理数据结构进行编码的格式，其语法规范符合 JSON 格式，只不过对其名称进行了规范，专用于表示地理信息。

### TopoJSON

TopoJSON 是 GeoJSON 按拓扑学编码后的扩展形式，是由 D3 的作者 Mike Bostock 制定的。相比 GeoJSON 直接使用 Polygon、Point 之类的几何体来表示图形的方法，  
TopoJSON 中的每一个几何体都是通过将共享边整合后组成的。

### Tiff 格式

Tiff 是标签图像文件格式（Tagged Image File Format）的缩写。这是一种灵活的位图文件格式，通过在文件头中包含“标签”，它能够在一个文件中处理多幅图像和数据。  
标签能够表明图像的几何尺寸，图像数据的排列顺序以及图像压缩选项等元数据信息。Tiff 文件可以包含基于矢量的裁剪区域（剪切或者构成主体图像的轮廓）。  
Tiff 文件的标签具有一定的扩展性，通过在数据中加载一系列地理信息标签（投影信息，空间参考，原点坐标，波段数，像元大小等），就形成了 GeoTiff。

### GeoTIFF

GeoTIFF 作为 TIFF 的一种扩展，在 TIFF 的基础上定义了一些 GeoTag（地理标签），用来对各种坐标系统、椭球基准、投影信息等进行定义和存储，使图像数据和地理数据存储在同一图像文件中。

### DOM

DOM 是数字正射影像图（Digital Orthophoto Map）的英文缩写，是对航空（或航天）像片进行数字微分纠正和镶嵌，按一定图幅范围裁剪生成的数字正射影像集。
它是同时具有地图几何精度和影像特征的图像。DOM 具有精度高、信息丰富、直观逼真、获取快捷等优点，可作为地图分析背景控制信息，  
也可从中提取自然资源和社会经济发展的历史信息或最新信息,为防治灾害和公共设施建设规划等应用提供可靠依据；还可从中提取和派生新的信息，实现地图的修测更新。  
评价其它数据的精度、现实性和完整性都很优良。

### DEM

DEM 是数字高程模型（Digital Elevation Model）的英文缩写，是通过有限的地形高程数据实现对地面地形的数字化模拟（即地形表面形态的数字化表达），  
它是用一组有序数值阵列形式表示地面高程的一种实体地面模型，是数字地形模型(Digital Terrain Model，简称 DTM)的一个分支，其它各种地形特征值均可由此派生。  
DEM 的数据组织表达形式有多种，常用的有规则举行网格和不规则三角网。

## glTF 规范

https://github.com/KhronosGroup/glTF
https://github.com/KhronosGroup/glTF-Tutorials/blob/master/gltfTutorial/README.md（中文：https://zhuanlan.zhihu.com/p/65264050） 
https://github.com/KhronosGroup/glTF-Tutorials/tree/master/gltfTutorial

### 3d-tiles 规范

https://github.com/CesiumGS/3d-tiles

dae 转 gltf：
https://github.com/KhronosGroup/COLLADA2GLTF

obj 转 gltf：
https://github.com/CesiumGS/obj2gltf

gltf 内部优化
https://github.com/CesiumGS/gltf-pipeline

nginx：

#地图数据
location /mapdata {
include nginx_cors;
root D:\\;
index index.html index.htm

    expires 30d;

}

