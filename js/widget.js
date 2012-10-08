Ext.ns('DocAppApplication');
Ext.ns('DocAppApplication.data');
Ext.ns('DocAppApplication.ux');
Ext4Yii.Asciiart_API = {
    "url": "\/yii\/demos\/ext4yii-1.1\/docapp\/index.php\/Asciiart\/x4yremoring",
    "type": "ext4yiiremoting",
    "maxRetries": 0,
    "namespace": "DocApp",
    "actions": {
        "Asciiart": [{
            "name": "Image2Ascii",
            "len": 1,
            "xconfig": {
                "renderer": false
            }
        }]
    }
};
Ext4Yii.Validators_API = {
    "url": "\/yii\/demos\/ext4yii-1.1\/docapp\/index.php\/Validators\/x4yremoring",
    "type": "ext4yiiremoting",
    "maxRetries": 0,
    "namespace": "DocApp",
    "actions": {
        "Validators": [{
            "name": "AcceptOnlyHELLO",
            "len": 1,
            "xconfig": {
                "renderer": false
            }
        }]
    }
};;
var DocAppExtends = {

    loadModule: function(record) {
        if (record.get('url')) {
            var iconCls = record.parentNode.get('iconCls') != '' ? record.parentNode.get('iconCls') : record.get('iconCls');
            //var me = this;
            //var tab = me.viewport.moduleHolder.getComponent(record.get('url'));
            //var tabHolder =  me.viewport.moduleHolder;
            
            var me = Ext;            
            var tab = Ext.getCmp('moduleHolder').getComponent(record.get('url'));
            var tabHolder =  Ext.getCmp('moduleHolder');
            
            if (tab == null) {
                tab = tabHolder.add({
                    itemId: record.get('url'),
                    closable: true,
                    border: false,
                    xtype: 'panel',
                    layout: 'fit',
                    title: record.get('text'),
                    iconCls: iconCls,
                    items: [{
                        itemId: 'iframecomp',
                        xtype: 'iframecomponent',
                        url: record.get('url')
                    }]
                });
            }
           tabHolder.setActiveTab(tab);
        }
    }
};
Ext.ns('DocApp.UX');
Ext.define("DocApp.UX.Navigation", {
    extend: 'Ext.tree.Panel',
    alias: 'widget.docappnav',
    fields: [{
        name: 'id'
    },
    {
        name: 'text'
    },
    {
        name: 'iconCls'
    },
    {
        name: 'icon'
    },
    {
        name: 'url'
    }],
    selectLink: function(url) {
        var r = this.findRecordByLink(url);
        if (r) {
            r.bubble(function(n) {
                n.expand();
            });
            this.getSelectionModel().select(r);
            DocApp.loadModule(r);
        } else {
            this.getSelectionModel().deselectAll();
        }
    },

    findRecordByLink: function(link) {
        return this.getRootNode().findChildBy(function(n) {
            return link === n.raw.id;
        },
        this, true);
    }
});