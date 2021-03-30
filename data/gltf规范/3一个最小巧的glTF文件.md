## 3 示例：一个最小巧的 glTF 文件

下面是一个最小巧的 glTF 格式文件的内容，它描述了一个简单的三角形。可以将下面的内容保存到一个 gltf 文件中，使用任意支持 glTF 格式文件的渲染程序来渲染它。本章节，我们会基于这个小巧的 glTF 格式文件内容对 glTF 格式进行基本的概念介绍。

```javascript
{
  "scenes" : [
    {
      "nodes" : [ 0 ]
    }
  ],

  "nodes" : [
    {
      "mesh" : 0
    }
  ],

  "meshes" : [
    {
      "primitives" : [ {
        "attributes" : {
          "POSITION" : 1
        },
        "indices" : 0
      } ]
    }
  ],

  "buffers" : [
    {
      "uri" : "data:application/octet-stream;base64,AAABAAIAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAA=",
      "byteLength" : 44
    }
  ],
  "bufferViews" : [
    {
      "buffer" : 0,
      "byteOffset" : 0,
      "byteLength" : 6,
      "target" : 34963
    },
    {
      "buffer" : 0,
      "byteOffset" : 8,
      "byteLength" : 36,
      "target" : 34962
    }
  ],
  "accessors" : [
    {
      "bufferView" : 0,
      "byteOffset" : 0,
      "componentType" : 5123,
      "count" : 3,
      "type" : "SCALAR",
      "max" : [ 2 ],
      "min" : [ 0 ]
    },
    {
      "bufferView" : 1,
      "byteOffset" : 0,
      "componentType" : 5126,
      "count" : 3,
      "type" : "VEC3",
      "max" : [ 1.0, 1.0, 0.0 ],
      "min" : [ 0.0, 0.0, 0.0 ]
    }
  ],

  "asset" : {
    "version" : "2.0"
  }
}
```

### 3.1 scene 和 nodes 结构

glTF 格式使用 scene 对象来描述场景。对 glTF 数据的 JSON 文件进行解析时，对场景结构的遍历也是从 scene 对象开始。每个 scene 对象引用了一个 nodes 数组，nodes 数组通过索引引用了场景的根结点。

示例中的代码只包含了一个 scene 对象，这一 scene 对象**引用了一个索引为 0 的 node 对象**，这个 node 对象**引用了索引为 0 的 mesh 对象**：

```
 "scenes" : [
     //第一个scene 对象
    {
      "nodes" : [ 0 ]   //  这里引用了索引为0的node对象
    }
  ],

  "nodes" : [
    //第一个node 节点
    {
      "mesh" : 0  //  这里引用了索引为0的mesh对象
    }
  ],
```

### 3.2 meshes

mesh 对象用于表示场景中出现的 3D 对象实际的几何数据。mesh 对象本身不包含任何属性，只包含了一个 primitives 对象数组，用于描述整个网格所使用的几何数据。每个 primitive 对象描述了一部分 mesh 对象的几何数据。

示例只包含了一个 mesh 对象，这一 mesh 对象**只包含了一个 primitive 对象**。primitive 对象**包含了一个 attribute 对象数组**，存储了 mesh 对象的几何数据信息。对于这个示例来说，**只包含了一个 POSITION 属性**，用于描述 mesh 对象的**顶点**位置信息。primitive 对象的**indices 属性**描述了用于渲染的顶点**索引数据**，默认情况下，连续 3 个顶点索引构成一个三角形。

mesh 对象**实际的几何数据**由 primitive 对象的 attributes 对象数组和 indices 对象数组通过引用**accessor 对象给出**：

```
  "meshes" : [
    //第一个mesh对象
    {
      //mesh对象只包含了一个primitive对象,primitive 对象包含了一个 attribute 对象数组
      "primitives" : [
        // 第一个attribute 对象，存储了 mesh 对象的几何数据信息
        {
          "attributes" : {
            "POSITION" : 1  // 顶点位置信息, 这里指向 索引为1 的 accessor 对象
            },
        "indices" : 0  // 索引数据, 这里指向 索引为 0 的 accessor 对象
       }
      ]
    }
  ],

```

### 3.3 buffer，bufferView 和 accessor 概念

buffer，bufferView 和 accessor 对象提供了对 mesh 对象实际的几何数据的描述。我们在这里对它们进行简要地介绍，更为详细的说明会在之后的章节进行。

### 3.4 Buffers

buffer 对象描述了一个没有任何结构和层次意义的数据块。它包含了一个 uri 属性，用于引用外部文件作为数据，或是直接使用数据 URI 作为数据内容。

对于示例，我们使用数据 URI 直接在 JSON 文件中编码长度为 44 字节的 buffer 数据：

```

  "buffers" : [
    // 第一个buffer对象
    {
      "uri" : "data:application/octet-stream;base64,AAABAAIAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAA=",
      "byteLength" : 44
    }
  ],

```

上面代码中 uri 属性指定的数据包含了一个三角形 3 个顶点的索引和顶点位置信息。本身**buffer 对象所指定的数据是没有任何结构和层次意义**的，所以需要使用 bufferView 和 accessor 对象来描述数据的结构和层次意义。

### 3.5 Buffer views

一个 bufferView 对象引用了一个 buffer 对象的一部分数据。
对于这个示例来说，包含了 2 个 bufferView 对象，它们引用了同一个 buffer 对象的不同部分数据。

- 第一个 bufferView 对象引用了三角形的索引数据，数据位置从偏移值 byteOffset(0)开始，长度为 6 字节。
- 第二个 bufferView 对象引用了三角形的顶点位置数据，数据位置从偏移值 byteOffset(8)开始，长度为 36 字节：

```
  "bufferViews" : [
    //第一个bufferView对象
    {
      "buffer" : 0,  // 引用索引为0的buffer对象
      "byteOffset" : 0, // 数据位置从偏移值0开始
      "byteLength" : 6, // 长度为6字节
      "target" : 34963
    },

    //第二个bufferView对象
    {
      "buffer" : 0, // 引用索引为0的buffer对象
      "byteOffset" : 8,  // 数据位置从偏移值8开始
      "byteLength" : 36, // 长度为36字节
      "target" : 34962
    }
  ],

```

### 3.6 Accessors

accessor 对象用于描述数据的结构和层次意义。它描述了 bufferView 所引用数据的解释方式。

对于本例，包含了两个 accessor 对象。

第一个 accessor 对象描述了顶点的索引数据，它引用了**索引为 0 的 bufferView 对象**，这一 bufferView 对象引用了顶点索引数据。accessor 对象还包含了 count，type 和 componentType3 个属性，用来对数据进行描述。对于示例来说，这 3 个属性描述的的数据元素包含了 3 个类型为 unsigned short 的标量，

第二个 accessor 对象描述了顶点位置数据。它引用了**索引为 1 的 bufferView 对象**，这一 bufferView 对象引用了顶点位置数据。对于示例来说，这一 accessor 对象的 count，type 和 componentType 属性描述的数据元素的个数为 3，每个数据元素是一个包含 3 个分量，每个分量类型为 float 的 3D 向量。

```
  "accessors" : [
    //第1个accessor对象,描述了顶点的索引数据
    {
      "bufferView" : 0,  // 引用了索引为0的bufferView对象
      "byteOffset" : 0,
      "componentType" : 5123,
      "count" : 3,
      "type" : "SCALAR",
      "max" : [ 2 ],
      "min" : [ 0 ]
    },

    // 第2个accessor对象 ,描述了顶点位置数据
    {
      "bufferView" : 1, // 引用了索引为1的bufferView对象
      "byteOffset" : 0,
      "componentType" : 5126,
      "count" : 3,
      "type" : "VEC3",
      "max" : [ 1.0, 1.0, 0.0 ],
      "min" : [ 0.0, 0.0, 0.0 ]
    }
  ],

```

使用 mesh.primitive 属性引用 accessor 对象，通过索引使用几何数据：

```
  "meshes" : [
    //第一个mesh对象
    {
      //mesh对象只包含了一个primitive对象,primitive 对象包含了一个 attribute 对象数组
      "primitives" : [
        // 第一个attribute 对象，存储了 mesh 对象的几何数据信息
        {
          "attributes" : {
            "POSITION" : 1  // 顶点位置信息, 这里指向 索引为1 的 accessor 对象
            },
        "indices" : 0  // 索引数据, 这里指向 索引为 0 的 accessor 对象
       }
      ]
    }
  ],
```

当需要使用几何数据进行渲染时，渲染程序可以通过引用关系，找到需要的几何数据。通过 accessor 对象，渲染程序可以获取数据元素的类型以及布局方式。

### 3.7 asset 对象

对于 glTF 数据格式的 1.0 版本，asset 对象是可选的，对于之后版本的 glTF 数据格式，必须包含 asset 对象，使用 version 属性指定 glTF 数据格式的版本。下面代码表示数据使用 glTF 数据格式的 2.0 版本进行描述：

```
  "asset" : {
    "version" : "2.0"
  }
```

asset 对象还可以包含其它一些描述信息，具体可以参考 asset 对象的官方规范(https://github.com/KhronosGroup/glTF/blob/master/specification/README.md#reference-asset)。
