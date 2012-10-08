/**
 * @author TrueSoftware B.V. (The Netherlands)
 * @link http://www.ext4yii.com
 * @copyright Copyright 2007-2011 TrueSoftwareB.V. all rights reserved.
 * @license http://www.ext4yii.com/license/

 * None of the functionality provided in this in file (and corresponding frameworks)
 * may be used outside of Ext4Yii's license agreement.
 */
(function(){
    /**
     * @class Ext4Yii
     * @singleton
     */
    var global = this;
    if (typeof Ext4Yii === 'undefined') {
        global.Ext4Yii = {};
    }       

    Ext.apply(Ext4Yii,{

        /**
         * @property {string} version The version of Ext4Yii
         */
        version:'1.1 - EVALUATION',
        
        delegateTo:function(obj,name,args) {
            Ext4Yii.applyUp(obj,name,args);
        },
        
        /**
         * Creates a new LoadMask
         */
        newLoadMask:function(host,msg,show) {
            var lm = new Ext.LoadMask(host,{
                msg:msg
            });
            if(show) {
                lm.show();
            }
            return lm;
        },
        
        /**
         * ApplyUp implementation
         */
        applyUp:function(obj,name,args) {
            if(obj && obj[name]) {
                obj[name].apply(obj,args);
            } else if(obj && Ext.isFunction(obj.up)) {
                Ext4Yii.applyUp(obj.up(),name,args);
            } else if(obj && Ext.isObject(obj.owner)) {
                Ext4Yii.applyUp(obj.owner,name,args);                    
            } else {
                var me = this;
                Ext4Yii.displayErrorWindow('Ext4Yii Delegate Error',"<span style='color:red;font-weight:bold'>Ext4Yii delegate error: Could not find any function named '"+name+"' in the component hierarchy!</span>");                
            }
        },             
        /**
         * Displays an error window with title and HTML contents
         */
        displayErrorWindow: function(title,html)
        {
            var errWin = new Ext.create('Ext.window.Window',{
                width:600,
                height:250,
                autoScroll:true,
                title:title,
                iconCls:'IconExclamation',
                preventBodyReset:true,
                html:html,
                maximizable:true,
                bodyStyle:'padding:10px;background-color:white',
                buttons:[
                new Ext.Button({
                    text:'Close',
                    iconCls:'IconCancel',
                    handler:function(){
                        this.ownerCt.ownerCt.close();
                    }
                })
                ]
            });
            errWin.show();
        }
    });
})();
Ext.apply(Ext4Yii,{
    dynamic: {
        renderDirect:function(renderer,handler,params,scope)
        {
            scope = scope || this;
            if(renderer.directCfg.method.len)
            {
                if(!Ext.isFunction(handler))
                {
                    throw("Hanlder is not a function for this dynamic renderer!");
                }

                var p = params || [];

                if(!p.length || p.length != renderer.directCfg.method.len)
                {
                    throw('Invalid or incomplete call parameters for this renderer!');
                }

                var rh = {
                    success: function(r){
                        if(r.objects)
                        {
                            eval("r.objects = Ext.apply({}," + r.objects + ");");
                        }
                        if(r.resources)
                        {
                            var x = 0;
                        }
                    }
                }
                p.push(rh);
                var caller = Ext.Function.bind(renderer,scope,p);
                caller();
            }
            else
            {
                throw('Invalid or dynamic renderer!');
            }
        }
    }
});
;
Ext4Yii.Loader = {
    documentHead: typeof document !== 'undefined' && (document.head || document.getElementsByTagName('head')[0]),
    queue:[],
    mask:null,
    state:{
        stp:0,
        inc:0,
        cur:0
    },

    createAppLoaderProcessor:function(loaderHanlder,appName,appClass)
    {
        return  {
            start: function() {
                var f = Ext.Function.bind(loaderHanlder.setup, loaderHanlder);
                f();
            },
            step: function(p) {
                var f = Ext.Function.bind(loaderHanlder.step, loaderHanlder, [p]);
                f();
            },
            finish: function() {
                var f = Ext.Function.bind(loaderHanlder.complete, loaderHanlder);
                f();
                Ext.supports.init();
                window[appName] = new Ext.create(appClass);
                app = window[appName];
                var launchApp = Ext.Function.bind(app.launch, app, [app]);
                launchApp();
            }
        };
    },

    queueScript:function(url)
    {
        Array.prototype.push.call(this.queue,this.createSourceElement(url,'script'));
    },

    queueCSS:function(url,id)
    {
        Array.prototype.push.call(this.queue,this.createSourceElement(url,'link',id));
    },

    callbackStep:function(resource,type)
    {
        this.state.cur += this.state.inc;
        var pct = this.state.cur + "";
        if(pct.indexOf('.') != -1)
        {
            pct = pct.substring(0, pct.indexOf('.'));
        }
        if(this.mask)
        {
            var callback = Ext.Function.bind(this.mask.step, this.mask,[pct,resource,type]);
            callback();
        }
    },

    loadQueue:function(mask)
    {
        this.state.stp = this.queue.length;
        this.state.inc =100/this.state.stp;

        if(Ext.isObject(mask) && mask.step)
        {
            this.mask = mask;
        }

        this.applyCallback(function(){
            if(this.mask && this.mask.finish)
            {
                var callback = Ext.Function.bind(this.mask.finish, this.mask);
                callback();
            }
            this.queue = [];
            this.mask = null;
            this.state = {
                stp:0,
                inc:0,
                cur:0
            };
        });

        if(this.mask && this.mask.start)
        {
            var callback = Ext.Function.bind(this.mask.start, this.mask);
            callback();
        }
    
        if(this.queue.length != 0)
        {
            if(this.queue[0].src)
            {
                this.documentHead.appendChild(this.queue[0]);
                this.callbackStep(this.queue[0].src,'script');
            }
            else
            {
                Ext.Ajax.request(this.queue[0]);                
            }
        }
    },

    applyCallback:function(callback)
    {
        var prev = this.queue.length-1;
        callback = Ext.Function.bind(callback, this);
        if(this.queue.length > 0)
        {
            if(this.queue[prev].src)
            {
                this.queue[prev].onload = callback;
                this.queue[prev].onerror = callback;
                this.queue[prev].onreadystatechange = callback;
            }
            else
            {
                this.queue[prev].next = callback
            }
        }
    },

    getName:function(url)
    {
        var p = url.split('/');
        if(p.length > 0)
        {
            return p[p.length-1];
        }
        else
        {
            return null;
        }
    },

    createSourceElement:function(url,type,id)
    {
        if(type == 'script')
        {
            var el = document.createElement(type);
            var callback = null;

            el.src = url;
            callback = function() {
                Ext4Yii.Loader.documentHead.appendChild(el);
                this.callbackStep(url,type);
            };
            this.applyCallback(callback);
            return el;
        }
        else
        {
            id = id || this.getName(url);
            var request = {
                url:url,
                scope:this,
                success:function(r)
                {
                    Ext.util.CSS.createStyleSheet(r.responseText,id);
                },
                callback:function(r)
                {
                    this.callbackStep(url,'css');
                    if(r.next)
                    {
                        r.next();
                    }
                }
            }

            callback = function() {
                Ext.Ajax.request(request);
            };
            this.applyCallback(callback);
            return request;
        }
    }
};
/**
 * @class Ext4Yii.GlobalEventStack
 * providing a global event stack for hosting
 * application level events
 */
Ext.define('Ext4Yii.GlobalEventStack',{
    extend:'Ext.util.Observable',
    _skipglobal:true
});


Ext.apply(Ext4Yii,{
    /**
     * @property GlobalEvents
     * @type Ext4Yii.GlobalEventStack
     */
    GlobalEvents : new Ext4Yii.GlobalEventStack()
});

Ext.define('Ext4Yii.override.Observable',{
    override:'Ext.util.Observable',
    constructor:function()
    {
        if(this._skipglobal)
            return;

        var gl = null;
        if(this.globallisteners)
        {
            gl = this.globallisteners;
        }
        else if(this.initialConfig && this.initialConfig.globallisteners)
        {
            gl = this.initialConfig.globallisteners;
        }
        else if(arguments.length > 0)
        {
            var arg = arguments[0];
            if(arg && arg.globallisteners)
            {
                gl = arg.globallisteners;
            }
        }

        if(gl)
        {
            this.callParent(arguments);
            for(e in gl)
            {
                ev = gl[e];
                if(ev.fn)
                {
                    Ext4Yii.GlobalEvents.on(e,ev.fn,this,ev);
                }
                else
                {
                    Ext4Yii.GlobalEvents.on(e,ev,this);
                }
            }
            if(this.globallisteners)
            {
                delete this.globallisteners;
            }
        }
        else
        {
            this.callParent(arguments);
        }
        return this;
    }    
})

Ext.define('Ext4Yii.override.Base',{
    override:'Ext.Base',
    GlobalEvents : Ext4Yii.GlobalEvents,
    fireGlobalEvent:function()
    {
        if(this.GlobalEvents.hasListener(arguments[0]))
        {
            Ext.Function.defer(Ext4Yii.GlobalEvents.fireEvent, 0, Ext4Yii.GlobalEvents, arguments);
        }
    }    
});
;
Ext.ns('Ext4Yii.direct');

Ext.define('Ext4Yii.ovveride.Connection',{
    override:'Ext.data.Connection',
    setupHeaders: function(xhr, options, data, params){
        if(options && options.transaction && options.transaction.headers)
        {
            options.headers = options.headers || options.transaction.headers;
        }
        return this.callParent(arguments);
    }    
});

Ext.define('Ext4Yii.override.RemotingMethod',{
    override:'Ext.direct.RemotingMethod',
    constructor: function(config)
    {
        this.xconfig = config.xconfig || {};
        this.callParent(arguments);
    }    
});

Ext.define('Ext4Yii.direct.RemotingProvider',{
    extend: 'Ext.direct.RemotingProvider',
    alias:'direct.ext4yiiremotingprovider',
    loadMask:null,
    disabledCmp:null,
    getCallType:function()
    {
        return 'direct-method';
    },
    onData: function(opt, success, xhr)
    {
        var resp = xhr.responseText;
        var perror = ((xhr.status == 200 &&
            resp && resp.charAt(0) != '{') || (xhr.status == 500)) ? true : false;
        if(perror)
        {
            success = true;
            var cdata = opt.jsonData;
            var phperror = {};
            Ext.apply(phperror,{
                type:'exception',
                tid: cdata.tid,
                message:resp,
                result:null,
                where:opt.url
            });
            xhr.responseText = 	Ext.JSON.encode(phperror);
        }
        this.callParent([opt,success,xhr]);
    },

    runCallback: function(t, e)
    {
        if(this.loadMask)
        {
            this.loadMask.hide();
        }
        if(this.disabledCmp)
        {
            this.disabledCmp.enable();
        }

        if(e && e.type && e.type == 'exception')
        {
            var title  = (t.headers['X-Ext4Yii-Direct'] == 'direct-method' ? 'DirectMethod' : 'ServerAction')
            + ' error: ' + t.method;
            var message = '<div style="color:red;font-weight:bold">' + e.message + '</div>' +
            '<br/><pre>' + e.where + '</pre>';
            Ext4Yii.displayErrorWindow(title,message);
            return;
        }
        
        this.callParent(arguments);
    },

    sendRequest : function(data){
        data.headers = {
            'X-Ext4Yii-Direct': this.getCallType()
        };
        this.callParent(arguments);
    },


    configureRequest : function(c, m, args)
    {
        var hs = args[m.len];
        if(Ext.isObject(hs) && hs.mask)
        {
            var mskObj = null;
            if(Ext.isBoolean(hs.mask) && hs.mask === true)
            {
                mskObj = Ext.getBody();
            }
            else if(hs.mask instanceof Ext.Component && hs.mask.getEl)
            {
                mskObj = hs.mask.getEl();
            }
            else if(Ext.isString(hs.mask))
            {
                mskObj = Ext.get(hs.mask);
            }
            else if(hs.mask instanceof Ext.Element)
            {
                mskObj = hs.mask;
            }

            if(mskObj)
            {
                if(!hs.maskMsg)
                {
                    hs.maskMsg = "Please wait....";
                }

                this.loadMask = new Ext.LoadMask(mskObj,{
                    msg:hs.maskMsg
                });
                this.loadMask.show();
            }
            args[m.len] = hs;
        }

        if(hs && hs.disableControl)
        {
            // for true/false
            if(Ext.isBoolean(hs.disableControl) &&
                hs.scope &&
                hs.scope.disable &&
                hs.scope.enable)
                {
                hs.scope.disable();
                this.disabledCmp = hs.scope;
            }
            else if(hs.disableControl instanceof Ext.AbstractComponent &&
                hs.disableControl.disable &&
                hs.disableControl.enable)
                {
                hs.disableControl.disable();
                this.disabledCmp = hs.disableControl;
            }
        }        
        this.callParent([c,m,args]);
    }
});
/**
 * @class Ext4Yii.Application
 * @package Ext4Yii
 * @extend Ext.Application
 * This class is a customized version of Ext.Application for handling Ext4Yii
 * related functionality
 */
Ext.define('Ext4Yii.Application',{

    mixins: {
        observable: 'Ext.util.Observable'
    },

    launch: Ext.emptyFn,

    constructor: function(config) {
        Ext.apply(this, config || {});        
        this.addEvents(
            'ready'
        );        
        this.mixins.observable.constructor.call(this, config);

        if(!window["loaderHanlder"])
        {
            Ext.onReady(function() {
                this.launch.call(this);
            }, this);
        }
    },
    
    regGlobals:function(cmps) {
        var me = this;
        var id;
        for(var c in cmps) {
            id = cmps[c];
            me[id] = Ext.getCmp(id);
        }
    }
});
Ext.define('Ext4Yii.override.Component',{
    override:'Ext.Component',
    constructor:function(config) {
        var me = this;
        config = config || {};
        if(config.instancebody) {
            var ib = config.instancebody;
            delete(config.instancebody);
            Ext.apply(config,ib);
        }
        me.callParent([config]);
    }
});
Ext.define('Ext4Yii.override.Container',{
    override:'Ext.Container',
    initComponent:function() {
        var me = this;
        me.on('add',me.setAddedItem);
        me.on('remove',me.unsetAddedItem);
        me.callParent(arguments);
    },
    setAddedItem:function(ct,cmp) {
        var me = this;
        if(cmp.itemId !== undefined && cmp.itemId !== null) {
            me[cmp.itemId] = cmp;
        }
    },
    unsetAddedItem:function(ct,cmp) {
        var me = this;
        if(cmp.itemId !== undefined && cmp.itemId !== null && me[cmp.itemId]) {
            delete(me[cmp.itemId]);
        }
    }    
});
;
Ext.define('Ext4Yii.override.Panel',{
    override:'Ext.panel.Panel',
    onDockedAdd:function(item) {
        var me = this;
        me.callParent(arguments);
        if(item.itemId !== undefined && item.itemId !== null) {
            me.dockedItems[item.itemId] = item;
        }
    },
    onDockedRemove:function(item) {
        var me = this;
        if(item.itemId !== undefined && item.itemId !== null && me[item.itemId]) {
            delete(me.dockedItems[item.itemId]);
        }
        me.callParent(arguments);
    }    
});
Ext.define('Ext4Yii.mixins.LoadMaskProvider',{
    innerLoadMask:null,
    show:function() {
        var me = this,
        msg = me.innerLoadMaskMsg || Ext.LoadMask.prototype.msg;        
        me.innerLoadMask = new Ext.LoadMask(me,{
            msg:msg
        });
        me.innerLoadMask.show();
    },    
    hide:function() {
        var me = this;
        me.innerLoadMask.hide();
    }
});
Ext.define('Ext4Yii.data.proxy.ext4yii', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ext4yii',
    
    actionMethods:{
        'create':'POST',
        'read':'POST',
        'update':'POST',
        'destroty':'POST'
    },
                
    processResponse: function(success, operation, request, response, callback, scope){ 
        var result = Ext.String.trim(response.responseText);
        if(response.status == 200) {
            if(result == "" || result.charAt(0) != "{") {
                if(result == "") {
                    result = "Ext4Yii Proxy returned empy!<br/>Perhaps you forgot to export/echo the data from your controller.";
                }
                var message = '<div style="color:red;font-weight:bold">' + result + '</div>';
                Ext4Yii.displayErrorWindow('Error',message);
                return;
            }
        }          
        operation.response = response;
        this.callParent(arguments);
    },
    
                
    doRequest: function(operation, callback, scope) {
                    
        var error_handler = function(opr) {            
            if(opr && opr.error && opr.response.status == 500) {
                var er = opr.error;
                var message = '<div style="color:red;font-weight:bold">' + er.errorContent + '</div>';
                Ext4Yii.displayErrorWindow(er.statusText,message);
            }
        }
                    
        var ncallabck = Ext.Function.createSequence(error_handler,callback,scope);
        return this.callParent([operation,ncallabck,scope]);
    },
                
    setException: function(operation, response){
        operation.setException({
            status: response.status,
            statusText: response.statusText,
            errorContent: response.responseText
        })
    }    
});            
;
Ext.define('Ext4Yii.override.FormPanel',{
    override:'Ext.form.Panel',
    createForm: function() {
        var me = this;
        if(me.isext4yii) {
            return Ext.create('Ext4Yii.form.CRUD', this, Ext.applyIf({
                listeners: {}
            }, this.initialConfig));
        } else {
            return me.callParent();
        }
    }
});
Ext.define('Ext4Yii.form.field.Base',{
    override:'Ext.form.field.Base',
    force_invalid:false,
    forceInvalid:function(msg) {
        var me = this;
        me.markInvalid(msg);
        me.force_invalid = true;
    },
    clearForceInvalid:function() {
        var me = this;
        me.force_invalid = false;
        me.clearInvalid();
    },
    isValid:function() {
        var me = this;
        if(me.force_invalid) {
            return false;
        } else {
            me.force_invalid = false;            
            return me.callParent();
        }
    },
    setupRemoteValidationOn:function(evt,valname) {
        var me = this;
        if(me.vtype &&
            me.vtype == valname && 
            me.remoteValidator && 
            Ext.isFunction(me.remoteValidator)) 
            {  // { of if
            me.vtype = null;
            me.on(evt,function() {
                me.disable();
                me.rvMask();
                me.remoteValidator(me.getRawValue(),{
                    success:function(r) {
                        me.enable();
                        me.rvUnmask();
                        if(!r.isvalid) {
                            me.forceInvalid(r.error);
                            me.validate();                            
                        } else {
                            me.clearForceInvalid();
                            me.validate();                            
                        }                        
                    }
                });
            });
        }
    },
    rvUnmask:function() {
        var me = this;
        var id = me.getId(),
        el = me.getEl(),
        ind = tr = Ext.get(Ext.dom.Query.selectNode("#"+id+"-indicator",el.dom));
        ind.destroy();
    },
    rvMask:function() {
        var me = this;
        var id = me.getId(),
        el = me.getEl(),
        tr = Ext.get(Ext.dom.Query.selectNode("#"+id+"-inputRow",el.dom)),
        bel = Ext.get(Ext.dom.Query.selectNode("#"+id+"-bodyEl",el.dom)),
        ind = bel.createChild({
            tag:'div',
            cls:'ext4yii-remote-validator',
            id:id+"-indicator"
        }),
        xdiv = ind.createChild({
            tag:'div',
            cls:'x-mask-msg'
        });
        idiv = xdiv.createChild({
            tag:'div'
        });
        idiv.setSize(24,24);
        ind.setXY(ind.getAlignToXY(tr,"tr",[-1*idiv.getWidth(),0]));        
    }    
});

Ext.define('Ext4Yii.form.field.Text',{
    override:'Ext.form.field.Text',
    _rname:'RemoteOnBlur',
    initComponent:function() {
        var me = this;
        me.callParent();
        me.setupRemoteValidationOn('blur',me._rname);
    },
    getErrors:function(value) {
        var me = this;
        if(me.vtype == me._rname) {
            return null;
        } else {
            return me.callParent(arguments)
        }        
    }
});
Ext.define('Ext4Yii.button.extension',{
    override:'Ext.button.Button',
    setActiveState:function(state) {
        var me = this;
        if(state === true) {
            me.enable();
        } else {
            me.disable();
        }
    }
});
Ext.form.field.VTypes = Ext.apply(Ext.form.field.VTypes,(function() {
   return {
       'numeric':function(v) {
           return Ext.isNumeric(v);
       },
       'numericText':'The value is not a number'
   }
})());

;
/**
 * @class Ext4Yii.HTMLContainer
 * @extends Ext.Component
 * @xtype htmlcontainer
 * Provides the ability to host a webpage insite an iframe.
 * - Use the url attribute to set the initial iframe source.
 * - Use the setUrl('..') method to reset/reload/change the iframe source.
 * - Use the maskMsg attribute to set the load mask message
 */
Ext.define('Ext4Yii.HTMLContainer',{
    extend:'Ext.Component',
    alias:'widget.htmlcontainer',
        
    setContent:function(content) {
        me.getEl().dom.innerHTML = contant;
    },
    
    clean : function ()
    {
        me.getEl().dom.innerHTML = "";
    }                     
});
;
/**
 * @class Ext4Yii.IFrameContainer
 * @extends Ext.Component
 * @xtype iframecomponent
 * Provides the ability to host a webpage insite an iframe.
 * - Use the url attribute to set the initial iframe source.
 * - Use the setUrl('..') method to reset/reload/change the iframe source.
 * - Use the maskMsg attribute to set the load mask message
 */
Ext.define('Ext4Yii.IFrameContainer',{
    extend:'Ext.Component',
    alias:'widget.iframecomponent',
    
    /**
     * @cfg {string} url The URL to load inside the iframe
     */    
    url:null,
    
    /**
     * @cfg {string} maskMsg The mask message to show when the URL is loading. 
     * Defaults to "Loading..." 
     */    
    maskMsg:'Loading...',
    
    
    initComponent:function() {
        var me = this;
        me.addEvents(
            /**
            * @event iframeload
            * Fires when the iframe completes loading the page
            */
            'iframeload'      
            );
        me.callParent();
        me.on('afterrender',me.createIframe)
    },
        
    createIframe:function() {
        var me = this;
        var el = me.getEl();
        var spec = {
            tag         : "iframe",
            width       : "100%",
            height      : "100%",
            frameborder : 0,
            style       : 'overflow:auto;width:100%;height:100%',
            id          : this.id + "_iframe",
            name        : this.id + "_iframe",
            src         : this.url ? this.url : 'about:blank'
        };            
        var delayed = function() {
            me.clean();
            if(me.isURL()) {
                me.showMask();
            }
            me.iframe = Ext.get(Ext.DomHelper.insertFirst(el, spec));
            me.iframe.on('load',function(){
                me.hideMask();
                me.fireEvent('iframeload',me,me.iframe);
            },me);
        }
        setTimeout(delayed,100);
    },
    
    isURL:function() {
        var me = this;
        if(Ext.isString(me.url) && me.url.indexOf("/") != -1) {
            return true;
        } else {
            return false;
        }
    },
    
    refresh:function() {
        var me = this;
        me.setUrl(me.url,me.maskMsg);
    },
        
    setUrl:function(url,maskMsg) {
        var me = this;
        me.url = url;
        if(maskMsg) {
            me.maskMsg = maskMsg;
        }
        me.createIframe();
    },
        
    getContentWindow:function() {
        var me = this;
        if(me.iframe) {
            return me.iframe.dom.contentWindow;
        } else {
            return null;
        }
    },
        
    showMask:function() {
        var me = this;
        me.lm = new Ext.LoadMask(me,{
            msg:me.maskMsg
        });
        me.lm.show();
    },
                
    hideMask:function() {
        var me = this;
        if(me.lm) {
            me.lm.hide();
        }
    },
        
    clean : function ()
    {
        var me = this;
        if (me.iframe) {
            me.iframe.remove();
            delete me.iframe;
        } else {
            me.getEl().dom.innerHTML = "";
        }
    }                     
});
;
/**
 * @class Ext4Yii.data.ArrayDataStore
 * @extends Ext.data.Store
 * The ArrayDataStore is an customized version of Ext.data.Store
 * which provides in-memory functionality to bind an array as data.
 * This component will always auto load the data attribute.
 */
Ext.define('Ext4Yii.data.ArrayDataStore',{
    
    extend:'Ext.data.Store',
    alias:'store.arraydatastore',
    
    requires: [
    'Ext.data.proxy.Memory',
    'Ext.data.reader.Array'
    ],

    constructor: function(config) {
        
        config = Ext.apply({
            proxy: {
                type: 'memory',
                reader: 'array'
            }
        }, config);
        this.callParent([config]);
    },

    loadData: function(data, append) {
        if (this.expandData === true) {
            var r = [],
            i = 0,
            ln = data.length;

            for (; i < ln; i++) {
                r[r.length] = [data[i]];
            }

            data = r;
        }
        this.callParent([data, append]);
    }
});
/**
 * @class Ext4Yii.data.CRUDStore
 * @extends Ext.data.Store
 * The CRUD store is an customized version of Ext.data.Store
 * which provides CRUD functionality with ExtCRUDController class
 * in Ext4Yii.
 * 
 * In order to use this component, a Yii controller class that is extended from 
 * ExtCRUDController is needed.
 */
Ext.define('Ext4Yii.data.CRUDStore',{
    /**
     * @cfg {string} controller The controller class name that is extended from 
     * ExtCRUDController
     */    
    extend:'Ext.data.Store',
    alias:'store.crudstore',
    
    constructor:function(config) {
        var me = this;
        config = config || {};
        // force the reader to be json and ext4yii
        if(config.proxy) {
            Ext.apply(config.proxy,{
                type: "ext4yii",
                reader: {
                    type: "json",
                    successProperty: "success",
                    root: "records",
                    messageProperty: "message"
                },
                writer: {
                    type: "json",
                    root: "records",
                    allowSingle: false
                } 
            });            
        }
        me.callParent([config]);
    }
    
});
/**
 * @class Ext4Yii.data.JsonDataStore
 * @extends Ext.data.Store
 * The JsonDataStore is an customized version of Ext.data.Store
 * which provides in-memory functionality to bind a JSON as data.
 * This component will always auto load the data attribute.
 */
Ext.define('Ext4Yii.data.JsonDataStore',{
    
    extend:'Ext.data.Store',
    alias:'store.jsondatastore',
    
    requires: [
    'Ext.data.proxy.Memory',
    'Ext.data.reader.Json',
    'Ext.data.writer.Json'
    ],
    
    /**
     * @cfg {string} root The root of the records in the JSON data. defaults to 'records'
     */    

    constructor: function(config) {
        var root;
        config = config || {};
        if(config.root) {
            root = config.root;
            delete(config['root']);
        } else {
            root = 'records';
        }
        config = Ext.apply({
            proxy: {
                type  : 'memory',
                reader: {
                    type:'json',
                    root:root
                },
                writer: {
                    type: "json",
                    root:root,
                    allowSingle: false
                } 
            }
        }, config);
        this.callParent([config]);
    }
});
/**
 * @class Ext4Yii.data.LookupStore
 * @extends Ext.data.Store
 * The lookup store is an customized version of Ext.data.Store
 * which provides lookup functionality with ExtLookupController class
 * in Ext4Yii.
 * 
 */
Ext.define('Ext4Yii.data.LookupStore',{
    
    /**
     * @cfg {string} controller The controller class name that is extended from 
     * ExtLookupController
     */
    
    /**
     * @cfg {string} url Alternative to the controller configuration, you can use
     * a different url to retrive the data. It is recommended to extend the
     * ExtLookupController, create a custom action and return the data 
     * using the $this->exportData(..) method
     */
    
    extend:'Ext.data.Store',
    alias:'store.lookupstore',
    
    constructor:function(config) {
        var me = this;
        config = config || {};
        // force the reader to be json and ext4yii
        if(config.proxy) {
            Ext.apply(config.proxy,{
                type: "ext4yii",
                reader: {
                    type: "json",
                    successProperty: "success",
                    root: "records",
                    messageProperty: "message"
                } 
            });            
        }
        me.callParent([config]);
    }
});
/**
 * @class Ext4Yii.data.TreeJsonStore
 * @extends Ext.data.TreeStore
 * The TreeJsonStore is an customized version of Ext.data.TreeStore
 * which provides static JSON node functionality in Ext4Yii.
 * 
 */
Ext.define('Ext4Yii.data.TreeJsonStore',{
           
    extend:'Ext.data.TreeStore',
    alias:'store.treejsonstore',
    
    constructor:function(config) {
        var me = this;
        var root;
        config = config || {};
        if(config.root) {
            root = config.root;
            delete(config['root']);
        } else {
            root = 'records';
        }        
        config = Ext.apply({
            proxy: {
                type  : 'memory',
                reader: {
                    type:'json',
                    xroot:root
                },
                writer: {
                    type: "json",
                    xroot:root,
                    allowSingle: false
                } 
            }
        }, config);
        
        if(config.model) {
            var model = Ext.ModelMgr.getModel(config.model);
            if(model) {
                Ext.data.NodeInterface.decorate(model);
            }
        }
        me.callParent([config]);
    }    
});
/**
 * @class Ext4Yii.data.TreeLookupStore
 * @extends Ext.data.TreeStore
 * The TreeLookupStore is an customized version of Ext.data.TreeStore
 * which provides lookup functionality with ExtTreeLookupController class
 * in Ext4Yii.
 * 
 */
Ext.define('Ext4Yii.data.TreeLookupStore',{
    
    /**
     * @cfg {string} controller The controller class name that is extended from 
     * ExtLookupController
     */
    
    /**
     * @cfg {string} url Alternative to the controller configuration, you can use
     * a different url to retrive the data. It is recommended to extend the
     * ExtTreeLookupController, create a custom action and return the data 
     * using the $this->exportTreeData(..) method
     */
    
    extend:'Ext.data.TreeStore',
    alias:'store.treelookupstore',
    
    constructor:function(config) {
        var me = this;
        config = config || {};
        // force the reader to be json and ext4yii
        if(config.proxy) {
            Ext.apply(config.proxy,{
                type: "ext4yii",
                reader: {
                    type: "json",
                    successProperty: "success",
                    root: "records",
                    messageProperty: "message"
                } 
            });            
        }
        if(config.model) {
            var model = Ext.ModelMgr.getModel(config.model);
            if(model) {
                Ext.data.NodeInterface.decorate(model);
            }
        }
        me.callParent([config]);
    }    
});
/**
 * @class Ext4Yii.form.CRUD
 * @extends Ext.form.Basic
 * The CRUD form binds to a Yii action or a controller to perform form CRUD 
 * operations
 */
Ext.define('Ext4Yii.form.CRUD',{
    extend:'Ext.form.Basic',
    /**
     * @cfg {string} url action url which is going to used to load and submit data
     */
    
    /**
     * @cfg {string} controller a backend controller class capable of handling form 
     * operations. The controller should implement the ExtCRUDFormProvider behavior
     */
    
    doAction: function(action, options) {
        var me = this;
        options = options || {};
        if (Ext.isString(action) && me.crud) {
            options = Ext.apply(options,{
                method:'post'
            });
            if(action=='submit' || action=='standardsubmit') {
                options = Ext.apply(options,{
                    url:me.crud.submit
                })
            } else if(action=='load') {
                options = Ext.apply(options,{
                    url:me.crud.load
                });
            }
        }
        return me.callParent([action,options]);
    }    
});
/**
 * @class Ext4Yii.form.field.LocalComboBox
 * @extends Ext.form.field.ComboBox
 * The local combobox is a wrapper around the default combobox which is
 * automatically configured to show static/local data
 */
Ext.define('Ext4Yii.form.field.LocalComboBox',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.local_combobox',

    /**
     * @cfg {object[]} data a json array of {text:'..',data:'..'} objects. The text key must
     * correspond to the value set for the displayField attribute, the data key must
     * corresponf to the valueField attribute.
     */
    data:[],

    constructor:function(config) {
        var modelId = 'LCBO_MODEL_' +  new Date().getTime();
        var me = this;
        config = config || {};
        config.displayField = config.displayField || 'text';
        config.valueField = config.valueField || 'data';
        config.data = config.data || [];
        config.queryMode = 'local';
        Ext.define(modelId,{
            extend:'Ext.data.Model',
            idProperty:config.valueField,
            fields:[
                {name:config.displayField},
                {name:config.valueField}
            ]
        });
        config.store = Ext.create('Ext.data.Store',{
            model:modelId
        });
        config.store.loadData(config.data);
        me.callParent([config]);
    },
    initComponent:function() {
        var me = this;
        me.callParent(arguments);
    }
})

;
/**
 * @class Ext4Yii.form.field.Password
 * @extends Ext.form.field.Text
 * A textfield that its inputType is set to "password".
 * Please see the vtype attribute "password" for confirm validation.
 */
Ext.define('Ext4Yii.form.field.Password',{
    extend:'Ext.form.field.Text',
    alias:'widget.passwordtextfield',
        
    /**
     * @cfg {boolean} minimalPasswordLength The minimal length for this password. Defaults to 5
     */
    minimalPasswordLength:null,
    
    /**
     * @cfg {string} confirmWith Another password field to confirm when validating.
     */
    constructor:function(config) {
        var me = this;
        config = config || {};        
        config.inputType = "password";
        config.vtype="password";
        me.callParent(arguments);
    }
});

Ext.form.field.VTypes = Ext.apply(Ext.form.field.VTypes,(function() {
    return {
        'password': function(value, field)
        {
            var me = this,
            minLength = field.minimalPasswordLength || 5;
        
            if(value.length < minLength) {
                me.passwordText = "Password must be at least " + minLength + " characters long.";
                return false;
            }
        
            if(field.confirmWith) {
                var cmp = field.ownerCt.getComponent(field.confirmWith) || Ext.getCmp(field.confirmWith);
                if(cmp && cmp.getValue) {
                    if(cmp.getValue() == value) {
                        return true;
                    } else {
                        me.passwordText = 'Confirmation does not match your intial password entry.';
                        return false;
                    }
                } else {
                    Ext4Yii.displayErrorWindow("Password Validator","Unable to find " + field.confirmWith + " to confirm this password.");
                    return false;               
                }            
            } else {
                return true;
            }        
        },
        'passwordText':null
    }
})());
/**
 * @class Ext4Yii.form.field.RemoteComboBox
 * @extends Ext.form.field.ComboBox
 * The remote combobox is a wrapper around the default combobox which is
 * automatically configured to show dynamic/remote data. For this combobox to
 * work correctly either a URL attribute needs to be set to retrive the data or
 * a controller attribute which passes the control ver a backend controller that 
 * is derived from an ExtLookupStoreController or an ExtCRUDStoreController
 */
Ext.define('Ext4Yii.form.field.RemoteComboBox',{
    extend:'Ext.form.field.ComboBox',
    alias:'widget.remote_combobox',
    
    /**
     * @cfg {object} api The API configuration that is going to be applied to the
     * store's proxy. The API should either contain as "read" attribute or a "read" and a "create"
     * attribute which point to the correct backend URLs
     */
    api:null,
    preLoadList:true,
    isMasked:false,

    constructor:function(config) {
        var me = this;
        me.initial = true;
        config = config || {};
        config.displayField = config.displayField || 'text';
        config.valueField = config.valueField || 'data';
        config.queryMode = 'local';
        me.callParent([config]);
    },

    initComponent:function() {
        var me = this;
        me.createModel();
        me.callParent();        
    },
    
    afterRender:function() {
        var me = this,
        fl = me.fieldLabel ? ' ' +me.fieldLabel : '';
        me.callParent(arguments);
        me.createStore();             
        
        me.getEl().mask('Loading'+ fl +'...',"ext4yii-rcbo-mask");
        me.isMaked = true;
    },
    
    setValue:function(value) {
        var me = this;
        me._lastValue = value;
        me.callParent(arguments);
    },
    
    createStoreConfig:function() {        
        var me = this;
        var autoLoad = me.preLoadList ? me.preLoadList : false;        
        return {            
            model:me.modelClass,
            autoLoad:autoLoad,
            proxy:{
                api:me.api
            },
            listeners:{
                load:function() {
                    if(me.isMaked) {
                        me.getEl().unmask();
                    }
                    if(me._lastValue) {
                        me.setValue(me._lastValue);
                        me._lastValue = null;
                    }
                    me.initial=false;
                }
            }
        };
    },
    
    createStore:function() {
        var me = this,store,storeConfig;
        if(!me.innerStore) {
            if(me.api) {
                storeConfig = me.createStoreConfig();
                if(me.pageSize) {
                    storeConfig.pageSize = me.pageSize;
                }                
                if(me.api.read && me.api.create) {                    
                    throw "Not implemented yet!";
                } else if(me.api.read) {
                    me.innerStore = true;
                    store = Ext.create('Ext4Yii.data.LookupStore',storeConfig);
                    me.bindStore(store);
                    me.store = store;                    
                } else {
                    throw "Invalid API configuration paremeters"
                }
            } else {
                throw "Missing API configuration parameters"
            }
        }
    },

    createModel:function() {
        var me = this;
        if(!me.modelClass) {
            if(me.modelName) {
                me.modelClass = 'Ext4Yii.form.field.generated.model.' + me.modelName;
            } else {
                me.modelClass = 'Ext4Yii.form.field.generated.model.M' + (new Date().getTime()) + 'Model';
            }
            Ext.define(me.modelClass,{
                extend:'Ext.data.Model',
                fields:[
                {
                    name:me.displayField
                },
                {
                    name:me.valueField
                }
                ]
            })
        }
    }
});
Ext.define('Ext4Yii.grid.column.Action',{
    override:'Ext.grid.column.Action',
    processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row){
        var me = this;
        if(type == 'click' && record.actionColumnState) {
            var el = e.getTarget(), 
            acell = el.getAttribute('yidx');
            if(!record.actionColumnState[acell]) {
                me.callParent(arguments);
            }
        } else {
            me.callParent(arguments);
        }
        
    },
    defaultRenderer:function(v,meta,record,index) {
        var me = this;
        Ext.Array.each(me.items,function(itm,idx){
            me.items[idx].getClass = function() {
                var fn = function(value,meta,record,cell) {
                        
                    var style = '';
                    var disabled = false;
                    if(me.items[cell].userGetClass) {
                        me.items[cell].userGetClass.apply(me,arguments);
                    }
                    var state = me.items[cell].disableWhenTrue,
                    hide = me.items[cell].hideWhenTrue;
                    
                    if(Ext.isFunction(state) && state.apply(me,arguments) === true) {                        
                        style += 'y-rowaction-disabled';
                        disabled = true;
                    }
                        
                    if(Ext.isFunction(hide) && hide.apply(me,arguments) === true) {
                        style += 'y-rowaction-hide';                        
                        disabled = true;
                    }
                    
                    if(!Ext.isArray(record.actionColumnState)) {
                        record.actionColumnState = [];
                    }
                    record.actionColumnState[cell] = disabled;
                    
                    return style + ' y-grid-center-icon';
                }
                return fn(v,meta,record,idx);
            } 
        });
        var imgs = me.callParent(arguments).split('/><');
        var r = "";
        Ext.Array.each(imgs,function(item,idx) {
            i = item.replace("/>","").replace("<img","").trim();
            r += '<img ' + i + ' yidx="'+idx+'"/>';
        })
        return r;
    }
})
;
/**
 * @class Ext4Yii.grid.column.Grouped
 * @extends Ext.grid.column.Column
 * @xtype gridgroupedcolumn
 * A wrapper class for Ext.grid.column.Column to provide GroupedHeader functionality
 * in Ext4Yii
 */
Ext.define('Ext4Yii.grid.column.Grouped',{
    extend:'Ext.grid.column.Column',
    alias:'widget.gridgroupedcolumn'
});
/**
 * @class Ext4Yii.grid.property.Grid
 * @extends Ext.grid.property.Grid
 * @xtype x4ypropertygrid
 * A specialized grid implementation intended to mimic the traditional property 
 * grid as typically seen in development IDEs. Each row in the grid represents 
 * a property of some object, and the data is stored as a set of name/value 
 * pairs in Properties.
 */
Ext.define('Ext4Yii.grid.property.Grid',{
    extend:'Ext.grid.property.Grid',
    alias:'widget.x4ypropertygrid',
    
    initComponent:function() {
        var me = this,cfg,dataIndex,text
            propertyNames={},customRenderers={},customEditors={};
        var cfgs = me.columnsConfig || undefined;
        if(cfgs) {
            for(cfg in cfgs) {
                cfg = cfgs[cfg];
                dataIndex = cfg.dataIndex;
                text = cfg.text || dataIndex;
                propertyNames[dataIndex] = text;
                if(cfg.renderer) {
                    customRenderers[dataIndex] = cfg.renderer;
                }
                if(cfg.editor) {
                    customEditors[dataIndex] = cfg.editor;
                }
            }
        }
        me.propertyNames = propertyNames;
        me.customRenderers = customRenderers;
        me.customEditors = customEditors;
        me.callParent(arguments);
    }    
});
;
/**
 * @class Ext4Yii.tree.Panel
 * @extends Ext.tree.Panel'
 * This is a customized version of Ext.tree.Panel which provides custom tree node
 * functionality
 */
Ext.define('Ext4Yii.tree.Panel',{
    extend :'Ext.tree.Panel',
    alias:'widget.ext4yiitreepanel',
    constructor:function(config) {
        var me = this;
        if (Ext.isString(config.store)) {
            config.store = Ext.StoreMgr.lookup(config.store);
        } 
        
        if (config.store && Ext.isObject(config.store) && config.store.isStore) {
            if(config.store.model && config.store.model.modelName) {
                config.fields = config.store.model.getFields();
            }
        }        
        me.callParent(arguments);
    },
    
    getCheckedNodes: function(leafOnly){
        var me = this;
        var prop = prop || null;
        var checked = [];
      
        me.getView().getTreeStore().getRootNode().cascadeBy(function(node){
            if(node.data.checked){
                if(leafOnly===true) {
                    if(node.data.leaf) {
                        checked.push(node);
                    }
                } else {
                    checked.push(node);
                }                    
            }
        });

        return checked;
    },    
    
    initComponent:function() {
        var me = this;
        me.callParent();
        if(me.loadMask && me.store) {
            if(Ext.isBoolean(me.loadMask) && me.loadMask === true) {
                me.loadMask = "Please wait..."
            }
            me.store.on('beforeload',function(){
                if(!me.lm) {
                    me.lm = Ext4Yii.newLoadMask(me,me.loadMask,true);
                }
            });
            me.store.on('load',function(){
                if(me.lm) {
                    me.lm.hide();
                    delete(me.lm);
                }
            });
        }
    }        
});
;
/**
 * @class Ext4Yii.tree.grid.Panel
 * @extends Ext4Yii.tree.Panel'
 * Sub-class of Tree panel specialized to function as a TreeGrid
 */
Ext.define('Ext4Yii.tree.grid.Panel',{
    extend :'Ext4Yii.tree.Panel',
    alias:'widget.ext4yiitreegridpanel'
});


Ext.define('Ext4Yii.data.TreeStoreFix',{
    override:'Ext.tree.View',
    bindStore : function(store, initial) 
    {
        var me = this, wrapperStore, resetRootNode = false;
        
        if( store != null && store.$className != "Ext.data.NodeStore" )
        {
            wrapperStore = new Ext.data.NodeStore({
                treeStore: store,
                recursive: true,
                rootVisible: me.rootVisible,
                listeners: {
                    beforeexpand: me.onBeforeExpand,
                    expand: me.onExpand,
                    beforecollapse: me.onBeforeCollapse,
                    collapse: me.onCollapse,
                    write: me.onStoreWrite,
                    datachanged: me.onStoreDataChanged,
                    scope: me
                }
            });
            
            resetRootNode = true;
        }
        else
        {
            wrapperStore = store;
        }
   
        me.callParent( [wrapperStore, initial] );
        
        if( resetRootNode === true )
        {
            me.setRootNode( store.getRootNode() );
        }
    }        
});
;