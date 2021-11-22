/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./VertexFormat-61bc2255"],function(n,o,e,i,t,c,r,p,a,u,y,f,m,s,d){"use strict";function l(e){e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT);var t=i.defaultValue(e.vertexFormat,d.VertexFormat.DEFAULT);this._vertexFormat=t,this._workerName="createPlaneGeometry"}l.packedLength=d.VertexFormat.packedLength,l.pack=function(e,t,r){return o.Check.typeOf.object("value",e),o.Check.defined("array",t),r=i.defaultValue(r,0),d.VertexFormat.pack(e._vertexFormat,t,r),t};var b=new d.VertexFormat,A={vertexFormat:b};l.unpack=function(e,t,r){o.Check.defined("array",e),t=i.defaultValue(t,0);var a=d.VertexFormat.unpack(e,t,b);return n.defined(r)?(r._vertexFormat=d.VertexFormat.clone(a,r._vertexFormat),r):new l(A)};var v=new c.Cartesian3(-.5,-.5,0),F=new c.Cartesian3(.5,.5,0);return l.createGeometry=function(e){var t,r,a=e._vertexFormat,n=new s.GeometryAttributes;if(a.position){if((r=new Float64Array(12))[0]=v.x,r[1]=v.y,r[2]=0,r[3]=F.x,r[4]=v.y,r[5]=0,r[6]=F.x,r[7]=F.y,r[8]=0,r[9]=v.x,r[10]=F.y,r[11]=0,n.position=new f.GeometryAttribute({componentDatatype:y.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r}),a.normal){var o=new Float32Array(12);o[0]=0,o[1]=0,o[2]=1,o[3]=0,o[4]=0,o[5]=1,o[6]=0,o[7]=0,o[8]=1,o[9]=0,o[10]=0,o[11]=1,n.normal=new f.GeometryAttribute({componentDatatype:y.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:o})}if(a.st){var i=new Float32Array(8);i[0]=0,i[1]=0,i[2]=1,i[3]=0,i[4]=1,i[5]=1,i[6]=0,i[7]=1,n.st=new f.GeometryAttribute({componentDatatype:y.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:i})}if(a.tangent){var u=new Float32Array(12);u[0]=1,u[1]=0,u[2]=0,u[3]=1,u[4]=0,u[5]=0,u[6]=1,u[7]=0,u[8]=0,u[9]=1,u[10]=0,u[11]=0,n.tangent=new f.GeometryAttribute({componentDatatype:y.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:u})}if(a.bitangent){var m=new Float32Array(12);m[0]=0,m[1]=1,m[2]=0,m[3]=0,m[4]=1,m[5]=0,m[6]=0,m[7]=1,m[8]=0,m[9]=0,m[10]=1,m[11]=0,n.bitangent=new f.GeometryAttribute({componentDatatype:y.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:m})}(t=new Uint16Array(6))[0]=0,t[1]=1,t[2]=2,t[3]=0,t[4]=2,t[5]=3}return new f.Geometry({attributes:n,indices:t,primitiveType:f.PrimitiveType.TRIANGLES,boundingSphere:new p.BoundingSphere(c.Cartesian3.ZERO,Math.sqrt(2))})},function(e,t){return n.defined(t)&&(e=l.unpack(e,t)),l.createGeometry(e)}});
