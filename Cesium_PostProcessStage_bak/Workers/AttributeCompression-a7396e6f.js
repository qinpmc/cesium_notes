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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./Math-2145e044","./Cartesian2-40ed5530"],function(e,i,u,c,d){"use strict";var f={octEncodeInRange:function(e,t,n){u.Check.defined("vector",e),u.Check.defined("result",n);var o=d.Cartesian3.magnitudeSquared(e);if(Math.abs(o-1)>c.CesiumMath.EPSILON6)throw new u.DeveloperError("vector must be normalized.");if(n.x=e.x/(Math.abs(e.x)+Math.abs(e.y)+Math.abs(e.z)),n.y=e.y/(Math.abs(e.x)+Math.abs(e.y)+Math.abs(e.z)),e.z<0){var r=n.x,a=n.y;n.x=(1-Math.abs(a))*c.CesiumMath.signNotZero(r),n.y=(1-Math.abs(r))*c.CesiumMath.signNotZero(a)}return n.x=c.CesiumMath.toSNorm(n.x,t),n.y=c.CesiumMath.toSNorm(n.y,t),n},octEncode:function(e,t){return f.octEncodeInRange(e,255,t)}},n=new d.Cartesian2,t=new Uint8Array(1);function o(e){return t[0]=e,t[0]}f.octEncodeToCartesian4=function(e,t){return f.octEncodeInRange(e,65535,n),t.x=o(n.x*(1/256)),t.y=o(n.x),t.z=o(n.y*(1/256)),t.w=o(n.y),t},f.octDecodeInRange=function(e,t,n,o){if(u.Check.defined("result",o),e<0||n<e||t<0||n<t)throw new u.DeveloperError("x and y must be unsigned normalized integers between 0 and "+n);if(o.x=c.CesiumMath.fromSNorm(e,n),o.y=c.CesiumMath.fromSNorm(t,n),o.z=1-(Math.abs(o.x)+Math.abs(o.y)),o.z<0){var r=o.x;o.x=(1-Math.abs(o.y))*c.CesiumMath.signNotZero(r),o.y=(1-Math.abs(r))*c.CesiumMath.signNotZero(o.y)}return d.Cartesian3.normalize(o,o)},f.octDecode=function(e,t,n){return f.octDecodeInRange(e,t,255,n)},f.octDecodeFromCartesian4=function(e,t){u.Check.typeOf.object("encoded",e),u.Check.typeOf.object("result",t);var n=e.x,o=e.y,r=e.z,a=e.w;if(n<0||255<n||o<0||255<o||r<0||255<r||a<0||255<a)throw new u.DeveloperError("x, y, z, and w must be unsigned normalized integers between 0 and 255");var c=256*n+o,d=256*r+a;return f.octDecodeInRange(c,d,65535,t)},f.octPackFloat=function(e){return u.Check.defined("encoded",e),256*e.x+e.y};var h=new d.Cartesian2;function s(e){return e>>1^-(1&e)}f.octEncodeFloat=function(e){return f.octEncode(e,h),f.octPackFloat(h)},f.octDecodeFloat=function(e,t){u.Check.defined("value",e);var n=e/256,o=Math.floor(n),r=256*(n-o);return f.octDecode(o,r,t)},f.octPack=function(e,t,n,o){u.Check.defined("v1",e),u.Check.defined("v2",t),u.Check.defined("v3",n),u.Check.defined("result",o);var r=f.octEncodeFloat(e),a=f.octEncodeFloat(t),c=f.octEncode(n,h);return o.x=65536*c.x+r,o.y=65536*c.y+a,o},f.octUnpack=function(e,t,n,o){u.Check.defined("packed",e),u.Check.defined("v1",t),u.Check.defined("v2",n),u.Check.defined("v3",o);var r=e.x/65536,a=Math.floor(r),c=65536*(r-a);r=e.y/65536;var d=Math.floor(r),i=65536*(r-d);f.octDecodeFloat(c,t),f.octDecodeFloat(i,n),f.octDecode(a,d,o)},f.compressTextureCoordinates=function(e){return u.Check.defined("textureCoordinates",e),4096*(4095*e.x|0)+(4095*e.y|0)},f.decompressTextureCoordinates=function(e,t){u.Check.defined("compressed",e),u.Check.defined("result",t);var n=e/4096,o=Math.floor(n);return t.x=o/4095,t.y=(e-4096*o)/4095,t},f.zigZagDeltaDecode=function(e,t,n){u.Check.defined("uBuffer",e),u.Check.defined("vBuffer",t),u.Check.typeOf.number.equals("uBuffer.length","vBuffer.length",e.length,t.length),i.defined(n)&&u.Check.typeOf.number.equals("uBuffer.length","heightBuffer.length",e.length,n.length);for(var o=e.length,r=0,a=0,c=0,d=0;d<o;++d)r+=s(e[d]),a+=s(t[d]),e[d]=r,t[d]=a,i.defined(n)&&(c+=s(n[d]),n[d]=c)},e.AttributeCompression=f});
