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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./AttributeCompression-a7396e6f","./GeometryPipeline-bd87b3b1","./EncodedCartesian3-e7615897","./IndexDatatype-668aa2f9","./IntersectionTests-f6d27a39","./Plane-297770b0","./PrimitivePipeline-65f37562","./WebMercatorProjection-a290a2f5","./createTaskProcessorWorker"],function(d,e,r,t,n,a,i,o,f,s,c,u,b,m,l,p,y,P,k,v,C,h,G){"use strict";var W={};function A(e){var r=W[e];return d.defined(r)||("object"==typeof exports?W[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){W[r=e]=e})),r}return G(function(e,r){for(var t=e.subTasks,n=t.length,a=new Array(n),i=0;i<n;i++){var o=t[i],f=o.geometry,s=o.moduleName;if(d.defined(s)){var c=A(s);a[i]=c(f,o.offset)}else a[i]=f}return b.when.all(a,function(e){return C.PrimitivePipeline.packCreateGeometryResults(e,r)})})});
