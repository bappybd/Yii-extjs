<!-- page specific -->
<style type="text/css">
  /* style rows on mouseover */
  .x-grid-row-over .x-grid-cell-inner {
      font-weight: bold;
  }
  /* shared styles for the ActionColumn icons */
  .x-action-col-cell img {
      height: 16px;
      width: 16px;
      cursor: pointer;
  }
  /* custom icon for the "buy" ActionColumn icon */
  .x-action-col-cell img.buy-col {
      background-image: url(../shared/icons/fam/accept.png);
  }
  /* custom icon for the "alert" ActionColumn icon */
  .x-action-col-cell img.alert-col {
      background-image: url(../shared/icons/fam/error.png);
  }

  .x-ie6 .x-action-col-cell img.buy-col {
      background-image: url(../shared/icons/fam/accept.gif);
  }
  .x-ie6.x-action-col-cell img.alert-col {
      background-image: url(../shared/icons/fam/error.gif);
  }

  .x-ie6 .x-action-col-cell img {
      position:relative;
      top:-1px;
  }
</style>

<div id="grid-<?php echo $this->modelName ?>"></div>
<script type="text/javascript">
   var remoteUrl = '<?php echo $this->remoteUrl ?>';
</script>

<?php //$this->controller->appScript[] = Yii::getPathOfAlias('application.views.user') . '/grid-filter-local.js'; ?>




<script type="text/javascript">
   Ext.Loader.setConfig({enabled: true});
   Ext.Loader.setPath('Ext.ux', '../js/extJs/ux');
   Ext.require([
       'Ext.grid.*',
       'Ext.data.*',
       'Ext.ux.grid.FiltersFeature',
       'Ext.toolbar.Paging',
       'Ext.ux.ajax.JsonSimlet',
       'Ext.ux.ajax.SimManager',
       'Ext.ux.LiveSearchGridPanel',
       'Ext.ux.form.SearchField'
   ]);

   Ext.define('<?php echo $this->modelName ?>', {
       extend: 'Ext.data.Model',
       fields: <?php echo json_encode($this->gridFields) ?>
   });

   Ext.onReady(function(){

       Ext.ux.ajax.SimManager.init({
           delay: 300,
           defaultSimlet: null
       }).register({
           'myData': {
               data: [
                   ['small', 'small'],
                   ['medium', 'medium'],
                   ['large', 'large'],
                   ['extra large', 'extra large']
               ],
               stype: 'json'
           }
       });

       var optionsStore = Ext.create('Ext.data.Store', {
           fields: ['id', 'text'],
           proxy: {
               type: 'ajax',
               url: 'myData',
               reader: 'array'
           }
       });

       Ext.QuickTips.init();

       // for this demo configure local and remote urls for demo purposes
       var url = {
           local:  'grid-filter.json',  // static data file
           remote: remoteUrl
       };

       // configure whether filter query is encoded or not (initially)
       var encode = false;
       
       // configure whether filtering is performed locally or remotely (initially)
       var local = false;

       var store = Ext.create('Ext.data.JsonStore', {
           // store configs
           //autoLoad: true,
           autoSync: true,
           autoDestroy: true,
           model: '<?php echo $this->modelName ?>',
           proxy: {
               type: 'ajax',
               url: (local ? url.local : '<?php echo $this->remoteUrl ?>'),
               reader: {
                   type: 'json',
                   root: 'data',
                   idProperty: 'id',
                   totalProperty: 'total'
               },
               writer: {
                  type: 'json',
                  writeAllFields : false,  //just send changed fields
                  allowSingle :false      //always wrap in an array
                  // nameProperty: 'mapping'
               },
               api: {
                  // read:
                   create:  '<?php echo $this->api['create'] ?>',
                   update:  '<?php echo $this->api['update'] ?>',
                   destroy: '<?php echo $this->api['destroy'] ?>'
               }
           },
           remoteSort: <?php echo $this->remoteSort ?>,
           sorters: <?php echo json_encode($this->gridSorters) ?>,
           pageSize: <?php echo $this->pageSize ?>,
           listeners: {
              write: function(store, operation, opts){
                  var record = operation.getRecords()[0],
                      name = Ext.String.capitalize(operation.action),
                      verb;
                      
                      
                  if (name == 'Destroy') {
                      record = operation.records[0];
                      verb = 'Destroyed';
                  } else {
                      verb = name + 'd';
                  }
                  
                  
                  console.log('wrote!');
                  //workaround to sync up store records with just completed operation
                  Ext.each(operation.records, function(record){
                      if (record.dirty) {
                          record.commit();
                      }
                  });
      
                  
                  
                  Ext.app.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                  
              },
              update:function(){
                  console.log('tasks store updated');
              }
        }
       });
       
       var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
           clicksToMoveEditor: 1,
           autoCancel: false
       });

       var filters = {
           ftype: 'filters',
           // encode and local configuration options defined previously for easier reuse
           encode: encode, // json encode the filter query
           local: local,   // defaults to false (remote filtering)

           // Filters are most naturally placed in the column definition, but can also be
           // added here.
           filters: [{
               type: 'boolean',
               dataIndex: 'visible'
           }]
       };

       // use a factory method to reduce code while demonstrating
       // that the GridFilter plugin may be configured with or without
       // the filter types (the filters may be specified on the column model
       var createColumns = function (finish, start) {

           var columns = <?php echo json_encode($this->gridColumns) ?>;

           return columns.slice(start || 0, finish);
       };
       
       /*var grid = Ext.create('Ext.grid.Panel'){}*/
       var grid = Ext.create('Ext.ux.LiveSearchGridPanel', {
           /*renderTo: 'grid-example',*/
           border: false,
           store: store,
           columns: createColumns(6),
           loadMask: true,
           features: [filters],
           dockedItems: [{
            xtype: 'toolbar',
            items: [{
            dock: 'top',
            xtype: 'toolbar',
            items: {
                width: 400,
                fieldLabel: 'Search',
                labelWidth: 50,
                xtype: 'searchfield',
                store: store
            }
        },{
                text: 'Add',
                iconCls: 'icon-add',
                handler: function(){
                    // empty record
                    store.insert(0, new <?php echo $this->modelName ?>());
                    rowEditing.startEdit(0, 0);
                }
            }, '-', {
                itemId: 'delete',
                text: 'Delete',
                iconCls: 'icon-delete',
                disabled: true,
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            }]
        },
        Ext.create('Ext.toolbar.Paging', {
               dock: 'bottom',
               store: store
           })],
           plugins: [rowEditing],
           emptyText: 'No Matching Records'
       });
       
        grid.getSelectionModel().on('selectionchange', function(selModel, selections){
           grid.down('#delete').setDisabled(selections.length === 0);
       });
       
       // add some buttons to bottom toolbar just for demonstration purposes
       grid.child('pagingtoolbar').add([
           '->',
           {
               text: 'Encode: ' + (encode ? 'On' : 'Off'),
               tooltip: 'Toggle Filter encoding on/off',
               enableToggle: true,
               handler: function (button, state) {
                   var encode = (grid.filters.encode !== true);
                   var text = 'Encode: ' + (encode ? 'On' : 'Off'); 
                   grid.filters.encode = encode;
                   grid.filters.reload();
                   button.setText(text);
               } 
           },
           {
               text: 'Local Filtering: ' + (local ? 'On' : 'Off'),
               tooltip: 'Toggle Filtering between remote/local',
               enableToggle: true,
               handler: function (button, state) {
                   var local = (grid.filters.local !== true),
                       text = 'Local Filtering: ' + (local ? 'On' : 'Off'),
                       newUrl = local ? url.local : url.remote,
                       store = grid.view.getStore();
                    
                   // update the GridFilter setting
                   grid.filters.local = local;
                   // bind the store again so GridFilters is listening to appropriate store event
                   grid.filters.bindStore(store);
                   // update the url for the proxy
                   store.proxy.url = newUrl;

                   button.setText(text);
                   store.load();
               } 
           },
           {
               text: 'All Filter Data',
               tooltip: 'Get Filter Data for Grid',
               handler: function () {
                   var data = Ext.encode(grid.filters.getFilterData());
                   Ext.Msg.alert('All Filter Data',data);
               } 
           },{
               text: 'Clear Filter Data',
               handler: function () {
                   grid.filters.clearFilters();
               } 
           },{
               text: 'Add Columns',
               handler: function () {
                   if (grid.headerCt.items.length < 6) {
                       grid.headerCt.add(createColumns(6, 5));
                       grid.view.refresh();
                       this.disable();
                   }
               }
           }    
       ]);

       var win = Ext.create('Ext.Window', {
           title: '<?php echo $this->gridHeader ?>',
           height: 400,
           width: 700,
           layout: 'fit',
           items: grid
       }).show();

       store.load();
   });
</script>