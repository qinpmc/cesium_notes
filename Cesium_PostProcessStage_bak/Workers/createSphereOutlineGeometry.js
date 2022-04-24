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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88","./EllipsoidOutlineGeometry-7065467b"],function(n,r,e,a,i,o,t,s,d,l,u,c,p,f,m,y,G){"use strict";function b(e){var i=a.defaultValue(e.radius,1),t={radii:new o.Cartesian3(i,i,i),stackPartitions:e.stackPartitions,slicePartitions:e.slicePartitions,subdivisions:e.subdivisions};this._ellipsoidGeometry=new G.EllipsoidOutlineGeometry(t),this._workerName="createSphereOutlineGeometry"}b.packedLength=G.EllipsoidOutlineGeometry.packedLength,b.pack=function(e,i,t){return r.Check.typeOf.object("value",e),G.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,t)};var k=new G.EllipsoidOutlineGeometry,v={radius:void 0,radii:new o.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return b.unpack=function(e,i,t){var r=G.EllipsoidOutlineGeometry.unpack(e,i,k);return v.stackPartitions=r._stackPartitions,v.slicePartitions=r._slicePartitions,v.subdivisions=r._subdivisions,n.defined(t)?(o.Cartesian3.clone(r._radii,v.radii),t._ellipsoidGeometry=new G.EllipsoidOutlineGeometry(v),t):(v.radius=r._radii.x,new b(v))},b.createGeometry=function(e){return G.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(e,i){return n.defined(i)&&(e=b.unpack(e,i)),b.createGeometry(e)}});
