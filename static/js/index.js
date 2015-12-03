$(function() {
    
    var dlg = new Dialog({
        mask: true,
        title: '提现遇到问题？',
        content: '<p>国际货币基金组织当地时间<a href="">11月30日</a>宣布：正式将人民币纳入IMF特别提款权(SDR)货币篮子。</p>',
        btns: [
            {name: '提现遇到问题', disabled: true, callback: function(opts) {
                this.close();
            }},
            {name: '已完成提现', important: true, callback: function(opts) {
                this.setContent('You clicked Button <a href="">'+ opts.name + '</a>。');
            }}
        ],
        onBeforeOpen: function() {console.log('beforeOpen');},
        onAfterOpen: function() {console.log('onAfterOpen');},
        onBeforeClose: function() {console.log('onBeforeClose');},
        onAfterClose: function() {console.log('onAfterClose');}
    }).open();
});