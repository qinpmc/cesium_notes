define(['Cesium', '../../../core/lang/DefineProperties','require', 'exports', 'module'],
    function (Cesium, DefineProperties,require, exports, module) {
        var GoogleImageryProvider = function(options) {
            var options = options || {};
            this._url = options.url;
            this._tileWidth = options.tileWidth || 256;
            this._tileHeight = options.tileHeight || 256;
            this._minimumLevel = options.maximumLevel || 0;
            this._maximumLevel = options.maximumLevel || 18;
            this._tilingScheme = new Cesium.WebMercatorTilingScheme();
            this._rectangle = this._tilingScheme.rectangle;
            this._swTile = this._tilingScheme .positionToTileXY(Cesium.Rectangle.southwest(this._rectangle), this._minimumLevel);
            this._neTile = this._tilingScheme .positionToTileXY(Cesium.Rectangle.northeast(this._rectangle), this._minimumLevel);
            this._tileCount = (Math.abs(this._neTile.x - this._swTile.x) + 1) * (Math.abs(this._neTile.y - this._swTile.y) + 1);
            this._proxy = options.proxy;
            this._ready = true;

            return new Cesium.UrlTemplateImageryProvider({
                url: this._url,
                proxy: options.proxy,
                tilingScheme: this._tilingScheme,
                tileWidth: this._tileWidth,
                tileHeight: this._tileHeight,
                minimumLevel: this._minimumLevel,
                maximumLevel: this._maximumLevel,
                rectangle: this._rectangle
            });
        }

        DefineProperties(GoogleImageryProvider.prototype, {
            /**
             * url地址
             * @ignore
             * @type {String}
             */
            url: {
                get: function () {
                    return this._url;
                }
            },
            /**
             *令牌
             * @ignore
             * @type {String}
             */
            token: {
                get: function () {
                    return this._token;
                }
            },
            /**
             *代理
             * @ignore
             * @type {String}
             */
            proxy: {
                get: function () {
                    return this._proxy;
                }
            },
            /**
             *切片宽度
             * @ignore
             * @type {Number}
             */
            tileWidth: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('tileWidth must not be called before the imagery provider is ready.');
                    }
                    return this._tileWidth;
                }
            },
            /**
             *切片高度
             * @ignore
             * @type {Number}
             */
            tileHeight: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('tileHeight must not be called before the imagery provider is ready.');
                    }
                    return this._tileHeight;
                }
            },
            /**
             *最大切片级别
             * @ignore
             * @type {Number}
             */
            maximumLevel: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
                    }
                    return this._maximumLevel;
                }
            },
            /**
             *最小切片级别
             * @ignore
             * @type {Number}
             */
            minimumLevel: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
                    }
                    return 0;
                }
            },
            /**
             *切片模式
             * @ignore
             * @type {Object}
             */
            tilingScheme: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
                    }
                    return this._tilingScheme;
                }
            },
            /**
             *矩形
             * @ignore
             * @type {Object}
             */
            rectangle: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('rectangle must not be called before the imagery provider is ready.');
                    }
                    return this._rectangle;
                }
            },
            /**
             *切片丢失策略
             * @ignore
             * @type {Object}
             */
            tileDiscardPolicy: {
                get: function () {
                    if (!this._ready) {
                        throw new Cesium.DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.');
                    }
                    return this._tileDiscardPolicy;
                }
            },
            /**
             *是否准备好
             * @ignore
             * @type {Boolean}
             */
            ready: {
                get: function () {
                    return this._ready;
                }
            }
        });

        GoogleImageryProvider.prototype.getTileCredits = function (x, y, level) {
            var defaultCredit = new Cesium.Credit('Google Maps');
            return defaultCredit;
        };
        module.exports = GoogleImageryProvider;
        return GoogleImageryProvider;
    })
