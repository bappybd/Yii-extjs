<?php

/**
 * Extjs Grid Widget 
 * 
 */
class Grid extends CWidget{
   
   public $enableEdit = false;
   public $api = array('read' => '', 'create' => '', 'update' => '', 'destroy' => '');
   
   public $model;
   public $modelName;
   public $modelColumns;
   public $modelColumnsLabels;
   
   public $fields  = array();
   public $columns = array();
   public $sorters = array();
   
   public $gridFields  = array();
   public $gridColumns = array();
   public $gridSorters = array();
   
   public $gridHeader;
   public $remoteUrl  = "";
   public $remoteSort = 1;
   public $pageSize   = 50;
   
   const DEFAULT_SORT_DIRECTION = 'ASC';

   public function init(){
      if(!empty($this->model)){
         $this->model = new $this->model;
         if($this->model !== null){
            //set Grid Model Name
            $this->modelName =  get_class($this->model);
            
            //set Grid Header name
            if(empty($this->gridHeader)){
               $this->gridHeader = "Grid $this->modelName";
            }
            
            //set Grid Colmns
            $this->createColumn();
            
            //set Grid Store Sorters
            $this->gridSorters = $this->getGridSorterColumn();
         }
      }
      
      //set remote url
      if(empty($this->remoteUrl)){
         $this->remoteUrl = $this->controller->createUrl('/');
      }
   }
   
   public function run(){  
         
      try{
         if($this->model !== null){
            $this->render('grid', array());
         }
      }catch(Exception $e){
         echo $e->getMessage();exit;
      }
   }
   
   public function createColumn(){
      if($this->model !== null){
         $tableSchema              = $this->model->getTableSchema();
         $this->modelColumns       = $tableSchema->columns;
         $this->modelColumnsLabels = $this->model->attributeLabels();
         
     //echo "<pre>";print_r($this->modelColumns);echo "<pre/>";exit;
         if(count($this->modelColumns)){
            foreach($this->modelColumns as $Cname => $thisColumn){
               if(in_array($thisColumn->name, $this->columns)){
                  $column                  = new StdClass();
                  
                  if(in_array($thisColumn->dbType, array('date','datetime'))){
                     $column->xtype        = 'datecolumn';
                  }
                  $column->header          = $this->modelColumnsLabels[$thisColumn->name];      
                  $column->dataIndex       = $thisColumn->name;
                  $column->text            = $this->modelColumnsLabels[$thisColumn->name];
                  $column->id              = $thisColumn->name;
                  $column->flex            = 1;
                  $column->filterable      = true;
                  if(in_array($thisColumn->type, array('date', 'datetime'))){
                     $column->renderer     = "Ext.util.Format.dateRenderer('m/d/Y')";
                  }
                  
                  $filter           = new StdClass();//adding column filter
                  $filter->type     = $this->getGridColumnFilterType($thisColumn->type);
                  $filter->disabled = false;               
                  $column->filter      = $filter;
                  
                  //add column editor
                  if($this->enableEdit){
                     $column->editor =  $this->getColumnEditor($thisColumn);
                  }
                  
                  $this->gridColumns[] = $column;
                  
                  //adding grid fields
                  $field       = $this->getGridFieldType($thisColumn);
                  
                  $this->gridFields[] = $field;
               }
            }
         }
      }
   }
   
   public function getGridColumnFilterType($type){
   
      return $type;
   }
   
   public function getGridFieldType($column){
      
      $field       = new StdClass();
      $field->name = $column->name;
      $field->type = $column->type ;
      
      if(in_array($column->dbType, array('date', 'datetime'))){
         $field->type              = 'date';
         $field->dateFormat        = 'Y-m-d';
      }
      
      
      return $field;
   }
   
   public function getColumnEditor($column){
      $editor             = new StdClass();
      
      if(in_array($column->dbType, array('date','datetime'))){
         $editor->xtype  = 'datefield';
         $editor->format = 'Y-m-d';
      }
      
      $editor->allowBlank = 0;
   
      return $editor;
   }
   
   public function getGridSorterColumn(){
      $sorter              = array();
      $sortersArray        = array();
      $sortField           = $this->model->getPrimaryKey();

      if(empty($sortField)){
         $sortField = $this->model->safeAttributeNames[0];
      }
      
      $sorter['property']  = $sortField;
      $sorter['direction'] = self::DEFAULT_SORT_DIRECTION;
      $sortersArray[]      = $sorter;
      
      return $sortersArray;
   }
}