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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Cartesian2-40ed5530","./Transforms-94513c2d"],function(e,o,d,r,a,c){"use strict";function y(e,t,i,n){this.x=r.defaultValue(e,0),this.y=r.defaultValue(t,0),this.width=r.defaultValue(i,0),this.height=r.defaultValue(n,0)}y.packedLength=4,y.pack=function(e,t,i){return d.Check.typeOf.object("value",e),d.Check.defined("array",t),i=r.defaultValue(i,0),t[i++]=e.x,t[i++]=e.y,t[i++]=e.width,t[i]=e.height,t},y.unpack=function(e,t,i){return d.Check.defined("array",e),t=r.defaultValue(t,0),o.defined(i)||(i=new y),i.x=e[t++],i.y=e[t++],i.width=e[t++],i.height=e[t],i},y.fromPoints=function(e,t){if(o.defined(t)||(t=new y),!o.defined(e)||0===e.length)return t.x=0,t.y=0,t.width=0,t.height=0,t;for(var i=e.length,n=e[0].x,h=e[0].y,r=e[0].x,a=e[0].y,d=1;d<i;d++){var c=e[d],f=c.x,u=c.y;n=Math.min(f,n),r=Math.max(f,r),h=Math.min(u,h),a=Math.max(u,a)}return t.x=n,t.y=h,t.width=r-n,t.height=a-h,t};var f=new c.GeographicProjection,u=new a.Cartographic,g=new a.Cartographic;y.fromRectangle=function(e,t,i){if(o.defined(i)||(i=new y),!o.defined(e))return i.x=0,i.y=0,i.width=0,i.height=0,i;var n=(t=r.defaultValue(t,f)).project(a.Rectangle.southwest(e,u)),h=t.project(a.Rectangle.northeast(e,g));return a.Cartesian2.subtract(h,n,h),i.x=n.x,i.y=n.y,i.width=h.x,i.height=h.y,i},y.clone=function(e,t){if(o.defined(e))return o.defined(t)?(t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height,t):new y(e.x,e.y,e.width,e.height)},y.union=function(e,t,i){d.Check.typeOf.object("left",e),d.Check.typeOf.object("right",t),o.defined(i)||(i=new y);var n=Math.min(e.x,t.x),h=Math.min(e.y,t.y),r=Math.max(e.x+e.width,t.x+t.width),a=Math.max(e.y+e.height,t.y+t.height);return i.x=n,i.y=h,i.width=r-n,i.height=a-h,i},y.expand=function(e,t,i){d.Check.typeOf.object("rectangle",e),d.Check.typeOf.object("point",t),i=y.clone(e,i);var n=t.x-i.x,h=t.y-i.y;return n>i.width?i.width=n:n<0&&(i.width-=n,i.x=t.x),h>i.height?i.height=h:h<0&&(i.height-=h,i.y=t.y),i},y.intersect=function(e,t){d.Check.typeOf.object("left",e),d.Check.typeOf.object("right",t);var i=e.x,n=e.y,h=t.x,r=t.y;return i>h+t.width||i+e.width<h||n+e.height<r||n>r+t.height?c.Intersect.OUTSIDE:c.Intersect.INTERSECTING},y.equals=function(e,t){return e===t||o.defined(e)&&o.defined(t)&&e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height},y.prototype.clone=function(e){return y.clone(this,e)},y.prototype.intersect=function(e){return y.intersect(this,e)},y.prototype.equals=function(e){return y.equals(this,e)},e.BoundingRectangle=y});
