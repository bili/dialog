$(function() {
    
    var dlg = new Dialog;
    dlg.title = 'Advanced synchronization settings';
    dlg.refresh();
    $(document).on('click', function() {
        if (!dlg) return;
        if (dlg.isOpened) dlg.close();
        else dlg.open();
    });
    
});