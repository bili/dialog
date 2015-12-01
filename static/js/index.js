$(function() {
    
    var dlg = new Dialog({
        mask: true,
        title: 'Obliterate the following items',
        content: '<input/>',
        btns: [
            {name: 'Abort', disabled: true},
            {name: 'Cancel'},
            {name: 'Clear browsing data', important: false}
        ]
    });
    // dlg.setTitle('Advanced synchronization settings');
    setTimeout(function() {
        var con = '<p>国际货币基金组织当地时间11月30日宣布：正式将人民币纳入IMF特别提款权(SDR)货币篮子,决议将于2016年10月1日生效。投票会议由IMF总裁拉加德主持,国际基金组织188个成员国参加会议并进行投票。SDR是IMF于1969年创设的一种国际储备资产,用以弥补成员国官方储备不足,其价值目前由美元、欧元、日元和英镑组成的一篮子储备货币决定。IMF每隔五年对SDR进行一次评估。IMF网站数据显示,截至目前,美元在SDR货币篮子中所占比重为41.9%,欧元占37.4%,英镑占11.3%,日元占9.4%。</p>';
        dlg.setContent(con);
    }, 2000);
    dlg.open();
    // $(document).on('click', function() {
        // if (!dlg) return;
        // if (dlg.isOpened) dlg.close();
        // else dlg.open();
        // console.log(dlg);
    // });
});