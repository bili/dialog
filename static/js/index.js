$(function() {
    
    var dlg = new Dialog;
    dlg.setTitle('Advanced synchronization settings');
    $(document).on('click', function() {
        if (!dlg) return;
        if (dlg.isOpened) dlg.close();
        else dlg.open();
        console.log(dlg);
    });
});