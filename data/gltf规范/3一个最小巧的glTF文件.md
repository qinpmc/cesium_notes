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

## 3.1 scene 和 nodes 结构

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

## 3.2 meshes

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


## 3.3 buffer，bufferView和accessor概念
buffer，bufferView和accessor对象提供了对mesh对象实际的几何数据的描述。我们在这里对它们进行简要地介绍，更为详细的说明会在之后的章节进行。


## 3.4 Buffers

buffer对象描述了一个没有任何结构和层次意义的数据块。它包含了一个uri属性，用于引用外部文件作为数据，或是直接使用数据URI作为数据内容。

对于示例，我们使用数据URI直接在JSON文件中编码长度为44字节的buffer数据：

```

  "buffers" : [
    {
      "uri" : "data:application/octet-stream;base64,AAABAAIAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAA=",
      "byteLength" : 44
    }
  ],

```







