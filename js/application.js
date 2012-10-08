//Function for Onclick Tree Tabs

function createBox(t, s){
	return ['<div class="msg">',
			'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
			'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
			'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
			'</div>'].join('');
}


function displayTab(node){
	if (node.isLeaf()){
		// get content tab panel
		var c = Ext.getCmp("contentPanel");
		// search for existing tab
		var tabName = 'panel-'+node.attributes.id;
		if(Ext.getCmp(tabName) == undefined) {
			// create new panel
			var p = new Ext.Panel({
				id: tabName,
				title: node.attributes.text,
				iconCls: (node.attributes.iconCls == undefined) ? "icon-leaf" : node.attributes.iconCls,
				closable: true,
				autoScroll: true,
				listeners: {
					"destroy": {
						fn: function() {
							if ((w = Ext.getCmp('window' + node.attributes.id)) != null) {
								w.destroy();
							}
						}
					},
					"hide": {
						fn: function() {
							if ((w = Ext.getCmp('window' + node.attributes.id)) != null) {
								if (w.isVisible()) w.hide();
							}
						}
					}
				}
			});
			// add it to the content tab panel
			c.add(p);
			c.doLayout();
			c.setActiveTab(p);
			// load/reload using updater			
			p.getUpdater().update({
				//url: "scripts/" + node.attributes.id + ".php",
				url: node.attributes.id,
				nocache: true,
				scripts: true,
				text: "",
				timeout: 30
			});
		}
		else
		{
			var p = Ext.getCmp(tabName);
			c.setActiveTab(p);
		}
	}
}

function displayDemo(demo){
	var apiTree = Ext.getCmp("apiTree").getRootNode();
	if (demoNode = findDescendant(apiTree, "id", demo)) {
		demoNode.fireEvent("click", demoNode);
	}
}


/* helper functions */

/* http://extjs.com/forum/showthread.php?t=27178 */
/**
* Finds the first child that has the attribute with the specified value.
* Looks recursively down the tree to find the child.
* @param {String} attribute The attribute name
* @param {Mixed} value The value to search for
* @return {Node} The found child or null if none was found
*/
function findDescendant(tree, attribute, value){
	var cs = tree.childNodes;
		for (var i = 0, len = cs.length; i < len; i++) {
			if (cs[i].attributes != undefined && cs[i].attributes[attribute] == value) {
				return cs[i];
			}
			else {
				// Find it in this tree
				if (found = findDescendant(cs[i], attribute, value)) {
					return found;
				}
			}
		}
	return null;
}




















Ext.require(['*']);

    Ext.onReady(function() {
         
        Ext.QuickTips.init();
         
        
         
        // NOTE: This is an example showing simple state management. During development,
        // it is generally best to disable state management as dynamically-generated ids
        // can change across page loads, leading to unpredictable results.  The developer
        // should ensure that stable state ids are set for stateful components in real apps.
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

        var viewport = Ext.create('Ext.Viewport', {
            id: 'border-example',
            layout: 'border',
            items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 32, // give north and south regions a height
                autoEl: 'north'
            }), {
                // lazily created panel (xtype:'panel' is default)
                region: 'south',
                contentEl: 'south',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                collapsed: true,
                title: 'South',
                margins: '0 0 0 0'
            }, {
                xtype: 'tabpanel',
                region: 'east',
                title: 'East Side',
                dockedItems: [{
                    dock: 'top',
                    xtype: 'toolbar',
                    items: [ '->', {
                       xtype: 'button',
                       text: 'test',
                       tooltip: 'Test Button'
                    }]
                }],
                animCollapse: true,
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 5 0 0',
                activeTab: 1,
                tabPosition: 'bottom',
                items: [{
                    html: '<p>A TabPanel component can be a region.</p>',
                    title: 'A Tab',
                    autoScroll: true
                }, Ext.create('Ext.grid.PropertyGrid', {
                        title: 'Property Grid',
                        closable: true,
                        source: {
                            "(name)": "Properties Grid",
                            "grouping": false,
                            "autoFitColumns": true,
                            "productionQuality": false,
                            "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                            "tested": false,
                            "version": 0.01,
                            "borderWidth": 1
                        }
                    })]
            }, {
                region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'West',
                split: true,
                width: 400,
                minWidth: 175,
                maxWidth: 500,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
                layout: 'fit',
                items: new Ext.TabPanel({
                    border: false, // already wrapped so don't add another border
                    activeTab: 0, // second tab initially active
                    tabPosition: 'bottom',
                    items: [{                  
                       html:'<p>Search panel</p>',
                       title:'Search Panel',
                       border:false,
                       layout:'fit',
                       items:
                       new Ext.TabPanel({                  
                          deferredRender:false,
                          enableTabScroll:true,
                          defaults: {autoScroll:true},                          
                          activeTab:0,
                          border:false,
                          tabPosition:'top',
                          //resizeTabs:true, // turn on tab resizing
                          //plugins: new Ext.ux.TabCloseMenu(),
                          items:[{
                             //html:'<p>Normal Search</p>',
                             contentEl:'form',
                             title:'Search Panel',
                             border:false,
                             autoScroll:true                     
                          },{
                                //html:'<p>Advance Search</p>',
                                contentEl:'form_advance',
                                title:'Advance Search',
                                border:false,
                                autoScroll:true                        
                          },{
                                html:'<p>Fulltext Search</p>',
                                //contentEl:'form_advance',
                                title:'Fulltext Search',
                                border:false,
                                autoScroll:true                        
                          },{
                                html:'<p>Physical Search</p>',
                                //contentEl:'form_advance',
                                title:'Physical Search',
                                border:false,
                                autoScroll:true                        
                          },{
                                html:'<p>Extra Search</p>',
                                //contentEl:'form_advance',
                                title:'Extra Search',
                                border:false,
                                autoScroll:true                        
                          }]
                       })                     
                       
                   }, new Ext.grid.PropertyGrid({
                          title: 'Property Grid',
                          closable: true,
                          source: {
                              "(name)": "Properties Grid",
                              "grouping": false,
                              "autoFitColumns": true,
                              "productionQuality": false,
                              "created": new Date(Date.parse('10/15/2006')),
                              "tested": false,
                              "version": 0.01,
                              "borderWidth": 1
                          }
                      }),{
                    title: 'Settings',
                    collapsible: false,
                    layout: {
                       type: 'accordion',
                       animate: true
                    },
                    items: [{
                       
                    animate: false,
                    cls: "navigation",
                    collapseMode: "mini",
                    collapsible: true,
                    iconCls: "IconEmoticonSmile",
                    itemId: "example",
                    lines: false,
                    region: "west",
                    rootVisible: true,
                    split: true,
                    title: "Examples",
                    xtype: "docappnav",
                    dockedItems: [{
                        dock: "top",
                        xtype: "toolbar",
                        items: [{
                            xtype: "tbfill"
                        },
                        {
                            iconCls: "IconArrowDivide",
                            tooltip: "Expand All",
                            xtype: "button",
                            listeners: {
                                click: {
                                    fn: function(sender, e, eOpts) {
                                        sender.up().up().expandAll();
                                    }
                                }
                            }
                        },
                        {
                            iconCls: "IconArrowJoin",
                            tooltip: "Collapse All",
                            xtype: "button",
                            listeners: {
                                click: {
                                    fn: function(sender, e, eOpts) {
                                        sender.up().up().collapseAll();
                                        sender.up().up().getRootNode().expand();
                                    }
                                }
                            }
                        }]
                    }],
                    root: {
                        expanded: true,
                        leaf: false,
                        text: "Administration",
                        id: "fc3d4ff5292b1f1e51cac3e80a0a7808",
                        children: [{
                            iconCls: "IconChartPie",
                            leaf: false,
                            text: "User Management",
                            id: "a1c39cdb528ad2a113b343304150039a",
                            children: [{
                                iconCls: "IconBulletGreen",
                                leaf: true,
                                text: "View Users",
                                id: "view-users",
                                url: "/yii/demos/ext4yii-1.1/docapp/index.php/application/go?example=chart-line"
                            }]
                        },
                        {
                            iconCls: "IconPalette",
                            leaf: false,
                            text: "Settings",
                            id: "222c7b609b839c59942b36dafff66f71",
                            children: [{
                                iconCls: "IconBulletGreen",
                                leaf: true,
                                text: "User Settings",
                                id: "combi-001-form-grid",
                                url: "/yii/demos/ext4yii-1.1/docapp/index.php/application/go?example=combi-001-form-grid"
                            }]
                        }]
                    },
                    listeners: {
                        beforerender: {
                            fn: function(sender, eOpts) {
                                sender.store.sort('text', 'asc');
                            }
                        },
                        itemclick: {
                            fn: function(sender, record, item, index, e, eOpts) {
                                DocAppExtends.loadModule(record);
                            }
                        }
                    }
                
                    }]
                  
               }]
                })
            },
            // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            Ext.create('Ext.tab.Panel', {
                itemId: "moduleHolder",
                id:"moduleHolder",
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,
                activeTab: 0,     // first tab initially active
                items: [{
                    contentEl: 'center',
                    title: 'Center Panel',
                    autoScroll: true
                }]
            })]
        });
        // get a reference to the HTML element with id "hideit" and add a click listener to it
        Ext.get("hideit").on('click', function(){
            // get a reference to the Panel that was created with id = 'west-panel'
            var w = Ext.getCmp('west-panel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });
        
        
        /**********************Starting Normal Form*****************************/
      var searchForm = new Ext.FormPanel({
         labelWidth: 110, // label settings here cascade unless overridden
         url:'save-form1.php',
         frame:true,
         title: 'Normal Form',
         bodyStyle:'padding:5px 5px 0',
         //renderTo: 'form',
         width: 380,      
         defaults: {
            anchor: '95%',
            allowBlank: false,
            selectOnFocus: true,
            msgTarget: 'side',
            width: 230
         },
         defaultType: 'textfield',
         
         items: [
               new Ext.form.Hidden({                                    
               fieldLabel: 'hidden1',
               valueField: 'hidden1',
               displayField:'hidden1'                              
            })
         ],
   
         buttons: [{
            text: 'Search',
            handler: function(){
                  if(searchForm.getForm().isValid()){
                     searchForm.getForm().reset();
                     Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+ 
                        searchForm.getForm().getValues(true));
                     //
                     var tab3 = jtabs.addTab('jtabs-3', "Ajax Tab 2");
                     tab3.setUrl('ajax2.htm', null, true);
                     
                     addTab("New Tab",'ajax1.htm');

                  }else{
                     Ext.Msg.alert('Error Message','Please select atleast one option!!');
                     
                  }
            }
         },{
            text: 'Reset',
            handler: function(){
               searchForm.getForm().reset();
               ComboBoxDepartment.reset();
               ComboBoxGroup.reset();
               ComboBoxCategory.reset();               
               
            }
         }]
      });
         
      searchForm.render(Ext.get('form'));
      
      //Json Data For Department
      var store_department = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'scripts/jsonObj_LoadDepartment.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'Root'
         }, [
            {name: 'Department_id', mapping: 'id'},
            {name: 'Department_Name', mapping: 'name'}            
         ])
      });
      
      //Json Data For Group
      var store_group = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'scripts/jsonObj_LoadGroup.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'Root'
         }, [
            {name: 'Group_id', mapping: 'id'},
            {name: 'Group_Name', mapping: 'name'}            
         ])
      });
      
      //Json Data For Category
      var store_category = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'scripts/jsonObj_LoadCategory.php'
        }),
        reader: new Ext.data.JsonReader({
            root: 'Root'
         }, [
            {name: 'Category_id', mapping: 'id'},
            {name: 'Category_Name', mapping: 'name'}            
         ])
      });
      
      var ComboBoxDepartment = new Ext.form.ComboBox({
         id: 'ComboBoxDepartment_Search',
         tpl: '<tpl for="."><div ext:qtip="{Department_Name}" class="search-item">{Department_Name}</div></tpl>',
         store: store_department,                        
         fieldLabel: 'Department',
         valueField: 'Department_id' ,
         displayField:'Department_Name',            
         mode: 'remote',
         typeAhead: true,
         forceSelection: true,
         hideTrigger:false,
         triggerAction: 'all',
         loadingText: 'Loading Department...',
         emptyText:'Select a Department...',            
         itemSelector: 'div.search-item'            
      });
      var ComboBoxGroup = new Ext.form.ComboBox({            
         id: 'ComboBoxGroup_Search',
         tpl: '<tpl for="."><div ext:qtip="{Group_Name}" class="search-item">{Group_Name}</div></tpl>',
         store: store_group,                        
         fieldLabel: 'Group',
         valueField: 'Group_id' ,
         displayField:'Group_Name',            
         mode: 'remote',
         typeAhead: true,
         forceSelection: true,
         hideTrigger:false,
         triggerAction: 'all',
         loadingText: 'Loading Group...',
         emptyText:'Select a Group...',            
         itemSelector: 'div.search-item',
         selectOnFocus:true
      });
      var ComboBoxCategory = new Ext.form.ComboBox({
         id: 'ComboBoxCategory_Search',
         tpl: '<tpl for="."><div ext:qtip="{Category_Name}" class="search-item">{Category_Name}</div></tpl>',
         store: store_category,                        
         fieldLabel: 'Category',
         valueField: 'Category_id' ,
         displayField:'Category_Name',            
         mode: 'remote',
         typeAhead: true,
         forceSelection: true,
         hideTrigger:false,
         triggerAction: 'all',
         loadingText: 'Loading Category...',
         emptyText:'Select a Category...',            
         itemSelector: 'div.search-item',
         selectOnFocus:true
         
      });
      
      var StartDate = new Ext.form.DateField({
         fieldLabel: 'Start Date',
         name: 'startdt_Search',
         id: 'startdt_Search',
         vtype: 'daterange',
         endDateField: 'enddt_Search' 
      });
      
      var EndDate = new Ext.form.DateField({
         fieldLabel: 'End Date',
         name: 'enddt_Search',
         id: 'enddt_Search',
         vtype: 'daterange',
         startDateField: 'startdt_Search' // id of the start date field
      });
      
      var DocumentOwner = {
         fieldLabel: 'Owner',
         name: 'owner_id_Search',
         id: 'owner_id_Search'                           
       };
       
       var DocumentName = {
         fieldLabel: 'Document Name',
         name: 'doc_no_Search',
         id: 'doc_no_Search'                           
       };
       
      var DocumentKeyword1 = {
         fieldLabel: 'Keyword1',
         name: 'keyword1_Search',
         id: 'keyword1_Search'                           
       };
       
      var DocumentKeyword2 = {
         fieldLabel: 'Keyword2',
         name: 'keyword2_Search',
         id: 'keyword2_Search'                           
       };
      var DocumentKeyword3 = {
         fieldLabel: 'Keyword3',
         name: 'keyword3_Search',
         id: 'keyword3_Search'                           
       };
       
      
      searchForm.add(ComboBoxDepartment);
      searchForm.add(ComboBoxGroup);
      searchForm.add(ComboBoxCategory);
      searchForm.add(StartDate);
      searchForm.add(EndDate);
      searchForm.add(DocumentOwner);
      searchForm.add(DocumentName);
      searchForm.add(DocumentKeyword1);
      searchForm.add(DocumentKeyword2);
      searchForm.add(DocumentKeyword3);
      
      searchForm.doLayout();
      
      ComboBoxDepartment.form = searchForm.getForm();
      
      //On Load Function for Department
      ComboBoxDepartment.on('select', function() {      
         ComboBoxGroup.reset();
         ComboBoxCategory.reset();
         store_group.proxy = new Ext.data.HttpProxy({url: 'scripts/jsonObj_LoadGroup.php?department_id=' + ComboBoxDepartment.getValue()});
         store_group.load();      
      });
      
      //On Load Function for Group
      ComboBoxGroup.on('select', function() {              
         ComboBoxCategory.reset();
         store_category.proxy = new Ext.data.HttpProxy({url: 'scripts/jsonObj_LoadCategory.php?group_id=' + ComboBoxGroup.getValue()});
         store_category.load();      
      });
      
      
   
      /**********************End Normal Form*****************************/   
      
      /**********************Starting Advance Form*****************************/
         
      var simple = new Ext.FormPanel({
        labelWidth: 110, // label settings here cascade unless overridden
        url:'save-form2.php',
        frame:true,
        title: 'Advance Form',
        bodyStyle:'padding:5px 5px 0',
      renderTo: 'form_advance',
        width: 380,
        defaults: {
         anchor: '95%',
         allowBlank: false,
         selectOnFocus: true,
         msgTarget: 'side',
         width: 230
      },
        defaultType: 'textfield',
      
      // simple array store
/*      var store = new Ext.data.SimpleStore({
         fields: ['abbr', 'state', 'nick'],
         data : Ext.exampledata.states // from states.js
      });
*/      
        items: [
            new Ext.form.ComboBox({
            //store: store,
            fieldLabel: 'Department',
            displayField:'state',
            typeAhead: true,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText:'Select a Department...',
            selectOnFocus:true
            //applyTo: 'local-states'
         }),new Ext.form.ComboBox({
            //store: store,
            fieldLabel: 'Group',
            displayField:'state',
            typeAhead: true,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText:'Select a Group...',
            selectOnFocus:true
            //applyTo: 'local-states'
         }),new Ext.form.ComboBox({
            //store: store,
            fieldLabel: 'Category',
            displayField:'state',
            typeAhead: true,
            mode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText:'Select a Category...',
            selectOnFocus:true
            //applyTo: 'local-states'
         }), new Ext.form.DateField({
                fieldLabel: 'Start Date',
                name: 'startdt_advance',
            id: 'startdt_advance',
            //vtype: 'daterange',
              endDateField: 'enddt_advance' // id of the end date field
            }),new Ext.form.DateField({
                fieldLabel: 'End Date',
                name: 'enddt_advance',
              id: 'enddt_advance',
            //vtype: 'daterange',
              startDateField: 'startdt_advance' // id of the start date field
            }),{
                fieldLabel: 'Owner',
                name: 'owner_id_advance',
            id: 'owner_id_advance'                           
             },{
                fieldLabel: 'DocNo',
                name: 'doc_no_advance',
            id: 'doc_no_advance'                           
             },{
                fieldLabel: 'Keyword1',
                name: 'keyword1',
            id: 'keyword1'                           
             },{
                fieldLabel: 'Keyword2',
                name: 'keyword2_advance',
            id: 'keyword2_advance'                           
             },{
                fieldLabel: 'Keyword3',
                name: 'keyword3_advance',
            id: 'keyword3_advance'                           
             }
        ],

        buttons: [{
            text: 'Search'
        },{
            text: 'Cancel'
        }]
    });
      /**********************End Advance Form*****************************/
      
      //=============================================================
      // Stylesheet Switcher
      //=============================================================
      Ext.get('styleswitcher_select').on('change',function(e,select){
         var name = select[select.selectedIndex].value;
         setActiveStyleSheet(name);
      });
      
      var cookie = readCookie("style");
      var title = cookie ? cookie : getPreferredStyleSheet();
      Ext.get('styleswitcher_select').dom.value=title;
      
      //Functions for Theme switch
      /*!
       * Ext JS Library 3.2.1
       * Copyright(c) 2006-2010 Ext JS, Inc.
       * licensing@extjs.com
       * http://www.extjs.com/license
       */
      function setActiveStyleSheet(title) {
         var i,
            a,
            links = document.getElementsByTagName("link"),
            len = links.length;
         for (i = 0; i < len; i++) {
            a = links[i];
            if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
               a.disabled = true;
               if (a.getAttribute("title") == title) a.disabled = false;
            }
         }
      }
      
      function getActiveStyleSheet() {
         var i,
            a,
            links = document.getElementsByTagName("link"),
            len = links.length;
         for (i = 0; i < len; i++) {
            a = links[i];
            if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) {
               return a.getAttribute("title");
            }
         }
         return null;
      }
      
      function getPreferredStyleSheet() {
         var i,
            a,
            links = document.getElementsByTagName("link"),
            len = links.length;
         for (i = 0; i < len; i++) {
            a = links[i];
            if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) {
               return a.getAttribute("title");
            }
         }
         return null;
      }
      
      function createCookie(name, value, days) {
         if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
         } else {
            expires = "";
         }
         document.cookie = name + "=" + value + expires + "; path=/";
      }
      
      function readCookie(name) {
         var nameEQ = name + "=",
            ca = document.cookie.split(';'),
            i,
            c,
            len = ca.length;
         for ( i = 0; i < len; i++) {
            c = ca[i];
            while (c.charAt(0) == ' ') {
               c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
               return c.substring(nameEQ.length, c.length);
            }
         }
         return null;
      }
      
      window.onload = function (e) {
         var cookie = readCookie("style");
         var title = cookie ? cookie : getPreferredStyleSheet();
         setActiveStyleSheet(title);
      }
      
      window.onunload = function (e) {
         var title = getActiveStyleSheet();
         createCookie("style", title, 365);
      }
      
      var cookie = readCookie("style");
      var title = cookie ? cookie : getPreferredStyleSheet();
      setActiveStyleSheet(title);
      //End Functions for Theme switch
      
      //removing loading animation
      Ext.get("loading-mask").remove();        
      Ext.get("loading").remove();
      
    });