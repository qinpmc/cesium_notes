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
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./Cartesian2-40ed5530"],function(e,a,t,n){"use strict";function h(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}h.encode=function(e,n){var i;return t.Check.typeOf.number("value",e),a.defined(n)||(n={high:0,low:0}),0<=e?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};var o={high:0,low:0};h.fromCartesian=function(e,n){t.Check.typeOf.object("cartesian",e),a.defined(n)||(n=new h);var i=n.high,r=n.low;return h.encode(e.x,o),i.x=o.high,r.x=o.low,h.encode(e.y,o),i.y=o.high,r.y=o.low,h.encode(e.z,o),i.z=o.high,r.z=o.low,n};var c=new h;h.writeElements=function(e,n,i){t.Check.defined("cartesianArray",n),t.Check.typeOf.number("index",i),t.Check.typeOf.number.greaterThanOrEquals("index",i,0),h.fromCartesian(e,c);var r=c.high,a=c.low;n[i]=r.x,n[i+1]=r.y,n[i+2]=r.z,n[i+3]=a.x,n[i+4]=a.y,n[i+5]=a.z},e.EncodedCartesian3=h});
