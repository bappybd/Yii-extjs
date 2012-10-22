<?php

/**
 * Extjs Grid Widget 
 * 
 */
class Grid extends CWidget{
   
   public $dataProvider;
   
   public $enableEdit = false;
   public $api = array('read' => '', 'create' => '', 'update' => '', 'destroy' => '');
   
   public $model;
   public $modelName;
   public $modelColumns;
   public $modelColumnsLabels;
   
   public $fields         = array();
   public $columns        = array();
   public $displayColumns = array();
   public $sorters        = array();
   
   public $gridFields  = array();
   public $gridColumns = array();
   public $gridSorters = array();
   
   public $idProperty = "id";
   public $gridHeader;
   public $remoteUrl  = "";
   public $remoteSort = 1;
   public $pageSize   = 50;
   
   const DEFAULT_SORT_DIRECTION = 'ASC';

   public function init(){
       if($this->dataProvider instanceof CActiveDataProvider){
          $this->model = $this->dataProvider->model;
       }
      
      
   
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
         
$this->initColumns($this->model); return;
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
   
   /**
    * Creates column objects and initializes them.
    */
   public function initColumns($model){
       $fieldType                = 'string';
       
       
       if($this->dataProvider instanceof CActiveDataProvider){
          $this->modelColumns = $this->dataProvider->model->attributeNames();
          $this->idProperty   = $this->dataProvider->model->primaryKey;
       }
       else if($this->dataProvider instanceof IDataProvider){
          // use the keys of the first row of data as the default columns
          $data = $this->dataProvider->getData();
          if(isset($data[0]) && is_array($data[0]))
             $this->modelColumns=array_keys($data[0]);
       }
       
       $this->modelColumnsLabels = $this->dataProvider->model->attributeLabels();

       //set displayed columns
       $columnsDetails = array();
       foreach($this->columns as $thisColumn){
           if(is_array($thisColumn)){
              $columnName   = $thisColumn['name'];
              $columnId     = isset($thisColumn['id'])     ? trim($thisColumn['type'])   : $columnName;
              $columnType   = isset($thisColumn['type'])   ? trim($thisColumn['type'])   : "";
              $columnHeader = isset($thisColumn['header']) ? trim($thisColumn['header']) : "";
              $this->displayColumns[] = $thisColumn['name'];
              
           }else{
              $columnName             = $thisColumn;
              $columnType             = $fieldType;
              $columnId               = $columnName;
              $columnHeader           = "";
              $this->displayColumns[] = $thisColumn;
           }
           
           $columnsDetails[$columnName]           = array();
           $columnsDetails[$columnName]['name']   = $columnName;
           $columnsDetails[$columnName]['id']     = $columnName;
           $columnsDetails[$columnName]['type']   = !empty($columnType) ? $columnType : $fieldType;
           $columnsDetails[$columnName]['header'] = $columnHeader;
           
       }

       if(count($this->modelColumns)){
          foreach($this->modelColumns as $attributeName ){
             if(!in_array($attributeName, $this->displayColumns)){
                continue;
             }
                       
             
            
             $fieldObject            = new StdClass();
             $fieldObject->name      = $attributeName;
             $fieldObject->formName  = CHtml::resolveName($this->model, $attributeName);
             $fieldObject->formId    = CHtml::getIdByName($fieldObject->formName);
             $fieldObject->label     = $this->model->getAttributeLabel($attributeName);
             $fieldObject->type      = isset($columnsDetails[$attributeName]['type']) ? $columnsDetails[$attributeName]['type'] : $fieldType;
            
            $column                  = new StdClass();
            if(in_array($fieldObject->type, array('date','datetime'))){
               $column->xtype        = 'datecolumn';
            }
            $column->header          = $fieldObject->label;
            $column->dataIndex       = $fieldObject->name;
            $column->text            = $fieldObject->label;
            $column->id              = $fieldObject->name;
            $column->flex            = 1;
            $column->filterable      = true;
            if(in_array($fieldObject->type, array('date', 'datetime'))){
               $column->renderer     = "Ext.util.Format.dateRenderer('m/d/Y')";
            }
            
            //grid filter
            $column->filter   = $this->getGridColumnFilter($fieldObject);
            
            //add column editor
            if($this->enableEdit){
               $column->editor =  $this->getColumnEditor($fieldObject);
            }

            $this->gridColumns[] = $column;

            //adding grid fields
            $field       = $this->getGridFieldType($fieldObject);

            $this->gridFields[] = $field;
          }
       }
       
       /*echo "<pre>";print_r($this->gridColumns);echo "<pre/>";
       echo "<pre>";print_r($this->gridFields);echo "<pre/>";exit;*/
   }
   
   public function getGridColumnFilter($field){
      $filter           = new StdClass();//adding column filter
      $filter->type     = $field->type;
      $filter->disabled = false;               
      
      return $filter;
   }
   
   public function getGridColumnFilterType($type){
   
      return $type;
   }
   
   public function getGridFieldType($column){
      
      $field       = new StdClass();
      $field->name = $column->name;
      $field->type = $column->type ;
      
      if(in_array($column->type, array('date', 'datetime'))){
         $field->type              = 'date';
         $field->dateFormat        = 'Y-m-d';
      }
      
      
      return $field;
   }
   
   public function getColumnEditor($column){
      $editor             = new StdClass();
      
      if(in_array($column->type, array('date','datetime'))){
         $editor->xtype  = 'datefield';
         $editor->format = 'Y-m-d';
      }
      
      $editor->allowBlank = 0;
   
      return $editor;
   }
   
   public function getGridSorterColumn(){
      $sorter              = array();
      $sortersArray        = array();
      $sortField           = "";
      
      if(isset($this->model->primaryKey)){
         $sortField           = $this->model->getPrimaryKey();
      }

      if(empty($sortField)){
         $sortField = $this->model->safeAttributeNames[0];
      }
      if(empty($this->idProperty)){
         $this->idProperty = $this->model->safeAttributeNames[0];
      }
      
      $sorter['property']  = $sortField;
      $sorter['direction'] = self::DEFAULT_SORT_DIRECTION;
      $sortersArray[]      = $sorter;
      
      return $sortersArray;
   }
}