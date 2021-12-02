"use strict";
var Brique = /** @class */ (function () {
    function Brique(gridElement, options) {
        if (options === void 0) { options = Brique.DEFAULT_OPTIONS; }
        this.gridElement = gridElement;
        this.itemElements = Array.from(this.gridElement.children);
        this.options = options;
        this.resizeEvent = this.resize.bind(this);
        this.update();
    }
    Brique.prototype.setOptions = function (options) {
        this.options = options;
        this.update();
    };
    Brique.prototype.getOptions = function () {
        return this.options;
    };
    Brique.prototype.watchResize = function () {
        window.addEventListener('resize', this.resizeEvent);
    };
    Brique.prototype.update = function () {
        this.setStyle();
        this.resize();
    };
    Brique.prototype.stropWatchResize = function () {
        window.removeEventListener('resize', this.resizeEvent);
    };
    Brique.prototype.resize = function () {
        var _this = this;
        var _a;
        var gridComputedStyle = window.getComputedStyle(this.gridElement);
        var rowHeight = parseInt(gridComputedStyle.getPropertyValue('grid-auto-rows'));
        var rowGap = parseInt(gridComputedStyle.getPropertyValue('grid-row-gap'));
        if (!this.itemElements)
            return;
        (_a = this.itemElements) === null || _a === void 0 ? void 0 : _a.forEach(function (item, index) {
            if (_this.options.columns <= index) {
                item.style.marginTop = _this.options.rowGap || '';
            }
            else if (item.style.marginTop) {
                item.style.removeProperty('margin-top');
            }
            var itemComputedStyle = window.getComputedStyle(item);
            var itemSpacing = parseInt(itemComputedStyle.getPropertyValue('margin-top')) + parseInt(itemComputedStyle.getPropertyValue('padding-top')) + parseInt(itemComputedStyle.getPropertyValue('padding-bottom'));
            var itemHeight = Array.from(item.children).reduce(function (acc, curr) {
                var childrenComputedStyle = window.getComputedStyle(curr);
                var childrenMarginTop = parseInt(childrenComputedStyle.getPropertyValue('margin-top'));
                var childrenMarginBottom = parseInt(childrenComputedStyle.getPropertyValue('margin-bottom'));
                return acc + curr.getBoundingClientRect().height + childrenMarginTop + childrenMarginBottom;
            }, itemSpacing);
            var rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span ".concat(rowSpan);
        });
    };
    Brique.prototype.setStyle = function () {
        var gridStyle = this.gridElement.style;
        gridStyle.display = 'grid';
        gridStyle.gridTemplateColumns = "repeat(".concat(this.options.columns, ", 1fr)");
        gridStyle.gridAutoRows = '1px';
        gridStyle.columnGap = this.options.columnGap || '';
        gridStyle.rowGap = '0';
    };
    Brique.DEFAULT_OPTIONS = {
        columns: 3,
        columnGap: '32px',
        rowGap: '32px',
    };
    return Brique;
}());
