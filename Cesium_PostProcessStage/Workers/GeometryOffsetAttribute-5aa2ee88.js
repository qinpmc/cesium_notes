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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./freezeObject-2d5b18ce","./defaultValue-199f5aa8"],function(e,l,c,t,h){"use strict";var f=t.freezeObject({NONE:0,TOP:1,ALL:2});e.GeometryOffsetAttribute=f,e.arrayFill=function(e,t,f,a){if(c.Check.defined("array",e),c.Check.defined("value",t),l.defined(f)&&c.Check.typeOf.number("start",f),l.defined(a)&&c.Check.typeOf.number("end",a),"function"==typeof e.fill)return e.fill(t,f,a);for(var n=e.length>>>0,r=h.defaultValue(f,0),i=r<0?Math.max(n+r,0):Math.min(r,n),d=h.defaultValue(a,n),u=d<0?Math.max(n+d,0):Math.min(d,n);i<u;)e[i]=t,i++;return e}});
