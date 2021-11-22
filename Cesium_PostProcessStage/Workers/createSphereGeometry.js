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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88","./VertexFormat-61bc2255","./EllipsoidGeometry-c496e8af"],function(a,i,e,o,t,n,r,s,d,c,l,m,u,f,p,y,G,k){"use strict";function v(e){var t=o.defaultValue(e.radius,1),r={radii:new n.Cartesian3(t,t,t),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,vertexFormat:e.vertexFormat};this._ellipsoidGeometry=new k.EllipsoidGeometry(r),this._workerName="createSphereGeometry"}v.packedLength=k.EllipsoidGeometry.packedLength,v.pack=function(e,t,r){return i.Check.typeOf.object("value",e),k.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r)};var b=new k.EllipsoidGeometry,x={radius:void 0,radii:new n.Cartesian3,vertexFormat:new G.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return v.unpack=function(e,t,r){var i=k.EllipsoidGeometry.unpack(e,t,b);return x.vertexFormat=G.VertexFormat.clone(i._vertexFormat,x.vertexFormat),x.stackPartitions=i._stackPartitions,x.slicePartitions=i._slicePartitions,a.defined(r)?(n.Cartesian3.clone(i._radii,x.radii),r._ellipsoidGeometry=new k.EllipsoidGeometry(x),r):(x.radius=i._radii.x,new v(x))},v.createGeometry=function(e){return k.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(e,t){return a.defined(t)&&(e=v.unpack(e,t)),v.createGeometry(e)}});
