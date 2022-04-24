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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51"],function(r,a,e,t,n,i,o,c,u,d,f,y,s,p){"use strict";function m(){this._workerName="createPlaneOutlineGeometry"}m.packedLength=0,m.pack=function(e,t){return a.Check.defined("value",e),a.Check.defined("array",t),t},m.unpack=function(e,t,n){return a.Check.defined("array",e),r.defined(n)?n:new m};var b=new i.Cartesian3(-.5,-.5,0),h=new i.Cartesian3(.5,.5,0);return m.createGeometry=function(){var e=new p.GeometryAttributes,t=new Uint16Array(8),n=new Float64Array(12);return n[0]=b.x,n[1]=b.y,n[2]=b.z,n[3]=h.x,n[4]=b.y,n[5]=b.z,n[6]=h.x,n[7]=h.y,n[8]=b.z,n[9]=b.x,n[10]=h.y,n[11]=b.z,e.position=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n}),t[0]=0,t[1]=1,t[2]=1,t[3]=2,t[4]=2,t[5]=3,t[6]=3,t[7]=0,new y.Geometry({attributes:e,indices:t,primitiveType:y.PrimitiveType.LINES,boundingSphere:new c.BoundingSphere(i.Cartesian3.ZERO,Math.sqrt(2))})},function(e,t){return r.defined(t)&&(e=m.unpack(e,t)),m.createGeometry(e)}});
