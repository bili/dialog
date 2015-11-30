(function() {
    var Dialog = function(opts) {
        this._pfx = 'dib';
        this._id = prefix(this._pfx);
        return this.init(opts);
    };
    Dialog.prototype.init = function(opts) {
        this.isOpened = false;
        if (!opts || !opts.el) {
            this.title = this.title || false;
            this._$el = $('<div/>');
            this._$el.attr('id', this._id).addClass(this._pfx+'-dialog');
        } else {
            this._$el = opts.el;
        }
        this._$el.wrap('</div class="'+this._pfx+'-dialog-mask"/>');
        return this.refresh.call(this);
    };
    Dialog.prototype.refresh = function() {
        if (this.title) {
            var $title = $('<div/>');
            $title.addClass(this._pfx+'-dialog-title').text(this.title);
            this._$el.append($title);
        }
        var $mask = $('<div class="'+this._pfx+'-dialog-mask"/>');
        $mask.fadeIn(300);
        this._$el.appendTo($mask);
        $mask.appendTo($('body'));
        moveToCenter(this._$el);
        return this;
    };
    Dialog.prototype.open = function() {
        if (this.isOpened) return this;
        this.isOpened = true;
        this._$el.addClass('fade-in');
        this._$el.show();
        return this;
    };
    Dialog.prototype.close = function() {
        if (!this.isOpened) return this;
        this.isOpened = false;
        this._$el.removeClass('fade-in');
        return this;
    };
    
    function prefix(symbol) {
        return symbol+'-'+('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase());
    };
    
    function moveToCenter($dom) {
        var l = ($(window).width() - $dom.outerWidth()) / 2;
        var t = ($(window).height() - $dom.outerHeight()) / 2;
        $dom.css({left: l, top: t});
    }
    
    var root = typeof exports !== "undefined" && exports !== null ? exports : window;
    root.Dialog = Dialog;
}());