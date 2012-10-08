<div id="toolbar-forms2" class="demoToolbar"></div>


<script type="text/javascript">

	//Json Data For Group
		var jSONStoreGroup = new Ext.data.Store({
		  proxy: new Ext.data.HttpProxy({
			url: 'jsonstores/jsonGroup'
		  }),
		  reader: new Ext.data.JsonReader({
				root: 'Root'
			}, [
				{name: 'id', mapping: 'id'},
				{name: 'name', mapping: 'name'}				
			])
		});



/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('App', 'App.user');
/**
 * @class App.user.FormPanel
 * A typical FormPanel extension
 */
App.user.Form = Ext.extend(Ext.form.FormPanel, {
    renderTo: 'user-form',
    iconCls: 'silk-user',
    frame: true,
    labelAlign: 'right',
    title: 'User -- All fields are required',
    frame: true,
    width: 500,
    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },
	
	
	
    // private A pointer to the currently loaded record
    record : null,

    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
        // build the form-fields.  Always a good idea to defer form-building to a method so that this class can
        // be over-ridden to provide different form-fields
        //this.items = this.buildForm();

        // build form-buttons
        this.buttons = this.buildUI();

        // add a create event for convenience in our application-code.
        this.addEvents({
            /**
             * @event create
             * Fires when user clicks [create] button
             * @param {FormPanel} this
             * @param {Object} values, the Form's values object
             */
            create : true
        });

        // super
        App.user.Form.superclass.initComponent.call(this);
    },

    /**
     * buildform
     * @private
     */
    buildForm : function() {
        return [
            {fieldLabel: 'Email', name: 'email', allowBlank: false, vtype: 'email'},
            {fieldLabel: 'First', name: 'first', allowBlank: false},
            {fieldLabel: 'Last', name: 'last', allowBlank: false}
        ];
    },

    /**
     * buildUI
     * @private
     */
    buildUI: function(){
        return [{
            text: 'Save',
            iconCls: 'icon-save',
            handler: this.onUpdate,
            scope: this
        }, {
            text: 'Create',
            iconCls: 'silk-user-add',
            handler: this.onCreate,
            scope: this
        }, {
            text: 'Reset',
            handler: function(btn, ev){
                this.getForm().reset();
            },
            scope: this
        }];
    },

    /**
     * loadRecord
     * @param {Record} rec
     */
    loadRecord : function(rec) {
        this.record = rec;
        this.getForm().loadRecord(rec);
    },

    /**
     * onUpdate
     */
    onUpdate : function(btn, ev) {
        if (this.record == null) {
            return;
        }
        if (!this.getForm().isValid()) {
            App.setAlert(false, "Form is invalid.");
            return false;
        }
        this.getForm().updateRecord(this.record);
    },

    /**
     * onCreate
     */
    onCreate : function(btn, ev) {
        if (!this.getForm().isValid()) {
            App.setAlert(false, "Form is invalid");
            return false;
        }
        this.fireEvent('create', this, this.getForm().getValues());
        this.getForm().reset();
    },

    /**
     * onReset
     */
    onReset : function(btn, ev) {
        this.fireEvent('update', this, this.getForm().getValues());
        this.getForm().reset();
    }
});




Ext.override(Ext.form.ComboBox, {
    setValue : function(v){
//begin patch
        // Store not loaded yet? Set value when it *is* loaded.
        // Defer the setValue call until after the next load.
        if (this.store.getCount() == 0) {
            this.store.on('load',
                this.setValue.createDelegate(this, [v]), null, {single: true});
            return;
        }
//end patch
        var text = v;
        if(this.valueField){
            var r = this.findRecord(this.valueField, v);
            if(r){
                text = r.data[this.displayField];
            }else if(this.valueNotFoundText !== undefined){
                text = this.valueNotFoundText;
            }
        }
        this.lastSelectionText = text;
        if(this.hiddenField){
            this.hiddenField.value = v;
        }
        Ext.form.ComboBox.superclass.setValue.call(this, text);
        this.value = v;
    }
});



Ext.onReady(function(){

	
	var toolbarforms2 = new Ext.Toolbar({
		renderTo: "toolbar-forms2", items: [ new Ext.Toolbar.Button({
		iconCls: "icon-source", text: "View Source", listeners: {  
		"click":
		
		{
			
			fn: 
				function() {
					windowforms2.show("viewSource-forms2");
				}
			,
			

			dummy: true
		}
		 }, 

		dummy: true
	}) ,new Ext.Toolbar.Button({
		iconCls: "icon-refresh", text: "Refresh", listeners: {  
		"click":
		
		{
			
			fn: 
				function() {
					
						window.location = window.location;
					
				}
			,
			scope: this, 

			dummy: true
		}
		 }, 

		dummy: true
	}) ,
		new Ext.Toolbar.Fill()
,new Ext.Toolbar.Button({
		iconCls: "icon-fav", text: "Direct Link", listeners: {  
		"click":
		
		{
			
			fn: 
				function() {
					
						u = window.location.toString().split("/demos");
						window.location = u[0] + "?demo=forms2";
					
				}
			,
			

			dummy: true
		}
		 }, 

		dummy: true
	}) ,
	
	new Ext.Toolbar.Button({
		iconCls: "icon-fav", text: "Stand-alone Link", listeners: {  
		"click":
		
		{
			
			fn: 
				function() {
					
						window.location = window.location;
					
				}
			,
			

			dummy: true
		}
		 }, 

		dummy: true
	})  ], 

		dummy: true
	}); 
	var windowforms2 = new Ext.Window({
		autoScroll: true, bodyStyle: "background: #ffffff;", closeAction: "hide", height: 500, iconCls: "icon-source", id: "windowforms2", maximizable: true, minHeight: 50, minWidth: 100, title: "Source Code: docs/demos/forms2.cfm", width: 750, y: 80, listeners: {  
		"show":
		
		{
			
			fn: 
			function() {
				dp.SyntaxHighlighter.HighlightAll('codeforms2');
			}
		,
			single: true,

			dummy: true
		}
		 }, html: "<pre id=\"codeforms2\" name=\"codeforms2\" class=\"xml\">&lt;cfimport prefix=\"ext\" taglib=\"/coldext\"&gt;\r\n\r\n\r\n&lt;!--- all examples will be appended to this div ---&gt;\r\n&lt;div id=\"forms2-out\" class=\"output\"&gt;&lt;/div&gt;\r\n\r\n\r\n&lt;ext:onReady&gt;\r\n\r\n\t&lt;ext:createChild tag=\"h2\" renderTo=\"forms2-out\"&gt;Simple Ajax Form&lt;/ext:createChild&gt;\r\n\r\n\t&lt;ext:jsonStore var=\"myJSON\" url=\"#application.appPath#/demos/data/countries.cfm\" root=\"query.data\"&gt;\r\n\t\t&lt;ext:field name=\"id\" /&gt;\r\n\t\t&lt;ext:field name=\"country\" /&gt;\r\n\t&lt;/ext:jsonStore&gt;\r\n\r\n\t&lt;ext:formPanel var=\"myForm\" title=\"Simple Ajax Form\" url=\"#application.appPath#/demos/data/submit.cfm\" renderTo=\"forms2-out\"&gt;\r\n\t\t&lt;ext:toolbar position=\"top\"&gt;\r\n\t\t\t&lt;ext:toolbarButton text=\"Save Form\" iconCls=\"icon-save\" handler=\"myHandler\" /&gt;\r\n\t\t&lt;/ext:toolbar&gt;\r\n\t\t&lt;ext:input name=\"firstName\" required=\"true\" /&gt;\r\n\t\t&lt;ext:input name=\"lastName\" /&gt;\r\n\t\t&lt;ext:input name=\"email\" vtype=\"email\" /&gt;\r\n\t\t&lt;ext:comboBox name=\"country\" displayField=\"country\" valueField=\"id\" emptyText=\"Select a Country...\" store=\"myJSON\" /&gt;\r\n\t\t&lt;ext:dateField name=\"date\" /&gt;\r\n\t\t&lt;ext:timeField name=\"time\" /&gt;\r\n\t\t&lt;ext:textArea name=\"comments\" /&gt;\r\n\t&lt;/ext:formPanel&gt;\r\n\r\n\t&lt;ext:handler name=\"myHandler\" type=\"submit\" form=\"myForm\"&gt;\r\n\t\t&lt;ext:success&gt;\r\n\t\t\tExt.MessageBox.alert(\"Success\", a.result.message);\r\n\t\t&lt;/ext:success&gt;\r\n\t&lt;/ext:handler&gt;\r\n\r\n&lt;/ext:onReady&gt;</pre>",
		

		dummy: true
	}); 

});
</script>

<div id="user-form" class="output"></div>

<div id="forms2-out" class="output"></div>
<div id="forms3-out" class="output"></div>





<script type="text/javascript">
Ext.onReady(function(){

	
	// create user.Form instance (@see UserForm.js)
    var userForm = new App.user.Form({
        renderTo: 'user-form',
        listeners: {
            create : function(fpanel, data) {   // <-- custom "create" event defined in App.user.Form class
                var rec = new userGrid.store.recordType(data);
                userGrid.store.insert(0, rec);
            }
        }
    });
	
	var myForm = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        url:'save-form.php',
		renderTo: "forms3-out", 
        frame:true,
        title: 'Simple Form',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',
		
		url: "users/add",
		method: "post",

        items: [{
                fieldLabel: 'User Name',
                name: 'data[User][username]',
                allowBlank:false
            },{
                fieldLabel: 'Password',
                name: 'data[User][password]',
				allowBlank:false
            }, new Ext.form.ComboBox({
					name: "group_id", 
					valueField: "id", 
					displayField: "name",
					hiddenName : 'data[User][group_id]', 
					emptyText: "Select a Group...", 
					fieldLabel: "Group",					
					store: jSONStoreGroup, 
					triggerAction: "all",
					width: 200, 
					dummy: true
			})  
        ],

        buttons: [{
            text: 'Save',
			iconCls: 'silk-user-add',
			handler: myHandler,
        },{
            text: 'Cancel',
			handler: function(btn, ev){
                this.getForm().reset();
            },
            scope: this
        }]
    });

	
		 
	function myHandler() {

		var f;
		if (typeof(myForm) != "undefined" && myForm.ctype != "Ext.Component")
			f = Ext.getCmp("myForm");
		else
			f = myForm;
		if (f.getForm().isValid())
		{
			if(f.url) f.getForm().getEl().dom.action = f.url;
			f.getForm().submit({
				success: function (f, a) {					
					if(a.result.validation == true){
					    //f.getForm().reset();  						
						Ext.MessageBox.alert("Success", a.result.message);						
					}else						
						Ext.MessageBox.alert("Validation Error", a.result.message);
						Ext.MessageBox.show({
						   title: 'Validation Error',
						   msg: a.result.message,
						   buttons: Ext.MessageBox.OK,						   
						   fn: showResult,
						   icon: Ext.MessageBox.ERROR
					   });

				 },				
				waitMsg:'Saving...'
			});
		}
		else
		{
			
			Ext.MessageBox.alert("Validation Error", "Please correct the errors on the form and try again");
		}
		
	}
	
	function showResult(btn){		
        showSlideMsg('Button Click', 'You clicked the {0} button', btn);
    };
	
	
	function showSlideMsg(title, format){
		var msgCt;		
        //Ext.msg('Button Click', 'You clicked the {0} button', btn);		
		
		if(!msgCt){
			msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
		}
		msgCt.alignTo(document, 't-t');
		var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
		var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
		m.slideIn('t').pause(1).ghost("t", {remove:true});
	
		
    };



});
</script>