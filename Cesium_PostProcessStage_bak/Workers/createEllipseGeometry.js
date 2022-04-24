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
define(["./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./defineProperties-ae15c9d5","./Transforms-94513c2d","./RuntimeError-d5522ee3","./WebGLConstants-554ddbe2","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./when-c208a7cf","./GeometryAttributes-c3465b51","./AttributeCompression-a7396e6f","./GeometryPipeline-bd87b3b1","./EncodedCartesian3-e7615897","./IndexDatatype-668aa2f9","./IntersectionTests-f6d27a39","./Plane-297770b0","./GeometryOffsetAttribute-5aa2ee88","./VertexFormat-61bc2255","./EllipseGeometryLibrary-adc347fa","./GeometryInstance-02cd2d29","./EllipseGeometry-08da2c60"],function(r,e,t,a,n,i,o,d,c,s,f,l,b,m,p,u,y,G,C,E,A,_,h,I,P){"use strict";return function(e,t){return r.defined(t)&&(e=P.EllipseGeometry.unpack(e,t)),e._center=i.Cartesian3.clone(e._center),e._ellipsoid=i.Ellipsoid.clone(e._ellipsoid),P.EllipseGeometry.createGeometry(e)}});
