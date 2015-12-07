(function() {
    var Dialog = function(opts) {
        this._pfx = 'dib';
        this._id = prefix(this._pfx);
        this._opts = opts || {};
        return this.init();
    };
    Dialog.prototype.init = function() {
        this.isOpened = false;
        if (!this._opts || !this._opts.el) this.makeUniqueDlg.call(this, this._opts);
        else this._$dlg = opts.el;
        return this;
    };
    Dialog.prototype.makeUniqueDlg = function(opts) {
        var self = this;
        this.title = opts.title || this.title || false;
        opts.draggable = opts.draggable || false;
        this._$dlg = $('<div/>');
        this._$dlg.attr('id', this._id).addClass(this._pfx+'-dialog');
        var $btn_close = $('<a class="'+this._pfx+'-dialog-btn-close" href="javascript:void(0)"><img src="static/images/dialog-btn-close.png"></a>').appendTo(this._$dlg);
        $btn_close.on('click', function() {
            self.close();
        });
        if (this.title) {
            var $title = $('<div/>');
            $title.addClass(this._pfx+'-dialog-title').text(this.title);
            this._$dlg.prepend($title);
            if (opts.draggable) draggable(this._$dlg, $title);
        }
        if (opts.mask) {
            this._$mask = $('<div class="'+this._pfx+'-dialog-mask"/>');
            this._$dlg.appendTo(this._$mask);
            this._$mask.appendTo($('body'));
        } else this._$dlg.appendTo($('body'));
        
        var $content = $('<div/>');
        $content.addClass(this._pfx+'-dialog-content');
        this._$dlg.append($content);
        if (opts.content) this.setContent(opts.content);
        
        if (opts.btns && opts.btns.length > 0) {
            var $btnsWrapper = $('<div/>');
            $btnsWrapper.addClass(this._pfx+'-dialog-btns-wrapper');
            this._$btns = $('<div/>');
            this._$btns.addClass(this._pfx+'-dialog-btns');
            for (var i = 0; i < opts.btns.length; i++) {
                this.addBtn(opts.btns[i]);
            }
            $btnsWrapper.append(this._$btns);
            this._$dlg.append($btnsWrapper);
        }
        moveToCenter(this._$dlg);
        $(window).resize(function() {
            moveToCenter(self._$dlg);
        });
        $('body').on('mousedown', function(e) {
            if (self.isOpened && $(e.target).closest('#'+self._id).length < 1) {
                self._$dlg.addClass('shake');
                $('.shake').one('animationend', function() {
                    $(this).removeClass('shake');
                });
            }
        });
        return this;
    };
    Dialog.prototype.addBtn = function(opts) {
        var self = this;
        var $btn = $('<a/>');
        $btn.addClass(this._pfx+'-dialog-btn');
        if (opts.important && opts.important === true) {
            $btn.addClass(this._pfx+'-dialog-btn-important');
        }
        if (opts.disabled && opts.disabled === true) {
            $btn.addClass(this._pfx+'-dialog-btn-disabled');
        } else {
            $btn.on('click', function(e) {
                if (opts.callback) opts.callback.call(self, opts);
            });
        }
        $btn.text(opts.name)
        
        this._$btns.append($btn);
        moveToCenter(this._$dlg);
        return this;
    };
    Dialog.prototype.setTitle = function(newTitle) { 
        var $title = this._$dlg.find('.'+this._pfx+'-dialog-title');
        console.log($title);
        if ($title && $title.length < 1) {
            this.title = newTitle;
            $title = $('<div/>');
            $title.addClass(this._pfx+'-dialog-title').text(this.title);
            this._$dlg.prepend($title);
        } else {
            this.title = newTitle;
            $title.text(this.title);
        }
        return this;
    };
    Dialog.prototype.setContent = function(newContent) {
        this._$dlg.find('.'+this._pfx+'-dialog-content').html(newContent);
        moveToCenter(this._$dlg);
        return this;
    };
    Dialog.prototype.open = function() {
        if (this.isOpened) return this;
        this.isOpened = true;
        this._$dlg.addClass('fade-in');
        $('.fade-in').one('animationend', function() {
            $(this).removeClass('fade-in');
        });
        if (this._opts && this._opts.onBeforeOpen) this._opts.onBeforeOpen.call(this);
        this._$dlg.show();
        if (this._opts && this._opts.onAfterOpen) this._opts.onAfterOpen.call(this);
        return this;
    };
    Dialog.prototype.close = function() {
        if (!this.isOpened) return this;
        var self = this;
        this.isOpened = false;
        if (this._opts && this._opts.onBeforeClose) this._opts.onBeforeClose.call(this);
        if (this._$mask) {
            this._$mask.fadeOut(80, function() {
                $(this).remove();
                if (self._opts && self._opts.onAfterClose) self._opts.onAfterClose.call(self);
            });
        } else {
            this._$dlg.remove();
            if (self._opts && self._opts.onAfterClose) self._opts.onAfterClose.call(self);
        }
        return this;
    };
    
    function prefix(symbol) {
        return symbol+'-'+('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase());
    }
    
    function moveToCenter($dom) {
        var l = ($(window).width() - $dom.outerWidth()) / 2;
        var t = ($(window).height() - $dom.outerHeight()) / 2;
        $dom.css({left: l, top: t});
    }
    function draggable($dom, $target) {
        var isMouseDown = false;
        var lastX = 0;
        var lastY = 0;
        var deltaX = 0;
        var deltaY = 0;
        $target.off('mousedown').on('mousedown', function() {
            isMouseDown = true;
        });
        $(document).on('mousedown', function(e) {
            lastX = e.clientX;
            lastY = e.clientY;
            deltaX = e.clientX - parseInt($dom.css('left'));
            deltaY = e.clientY - parseInt($dom.css('top'));
            $dom.css('transition', 'none');
        });
        $(document).on('mouseup', function() {
            isMouseDown = false;
            $dom.css('transition', 'all 0.6s');
        });
        $(document).on('mousemove', function(e) {
            setTimeout(function() {
                if (!isMouseDown) return false;
                $dom.css({left: e.clientX-deltaX, top: e.clientY-deltaY});
                lastX = e.clientX;
                lastY = e.clientY;
            }, 0);
        });
    }
    function extend(Child, Parent) {
    　　var F = function() {};　　　　
        F.prototype = Parent.prototype;　　　　
        Child.prototype = new F();　　　　
        Child.prototype.constructor = Child;　　　　
        Child.uber = Parent.prototype;　　
    }
    
    var Alert = function(newContent) {
        return new Dialog({
            mask: true,
            content: '<p>'+newContent+'</p>',
            btns: [
                {name: '关闭', callback: function(opts) {
                    this.close();
                }}
            ]
        });
    };
    
    var root = typeof exports !== "undefined" && exports !== null ? exports : window;
    root.Dialog = Dialog;
    root.Alert = Alert;
}());