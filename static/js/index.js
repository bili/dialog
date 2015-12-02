$(function() {
    
    var dlg = new Dialog({
        mask: true,
        draggable: true,
        title: 'Obliterate the following items',
        content: '<p>国际货币基金组织当地时间11月30日宣布：正式将人民币纳入IMF特别提款权(SDR)货币篮子。</p>',
        btns: [
            {name: 'Cancel', callback: function(opts) {
                this.close();
            }},
            {name: 'Clear browsing data', important: true, callback: function(opts) {
                this.setContent('You clicked Button '+ opts.name + '');
            }}
        ]
    }).open();

});