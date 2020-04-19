参考资料：  
https://github.com/AnalyticalGraphicsInc/cesium/wiki/Fabric    
https://www.cnblogs.com/cesium1/p/10063089.html    
https://www.jianshu.com/p/f8fee864379a     


## 内置材质：


```
polygon.material = Material.fromType('Image');
polygon.material.uniforms.image = 'image.png';
 
 
polygon.material = new Cesium.Material({
  fabric : {
    type : 'Image',
    uniforms : {
      image : 'image.png'
    }
  }
});
 
```

## 程序生成的纹理 （Procedural Textures）
程序生成的纹理，他们不依赖于外部图片文件，是通过GPU编程计算的图案，他们可以表示颜色和透明。             