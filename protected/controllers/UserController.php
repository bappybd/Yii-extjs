<?php

class UserController extends Controller
{
   public $layout = '//layouts/main-noext';
   public $appScript = array();

   
   /**
    * Displays the index page
    */
   public function actionManage()
   {
      $this->render('manage');
   }
   
   public function actionGetUsers()
   {
      $response        = new StdClass();
      $response->total = 0;
      $response->data  = array();
      
      $data = array();
      $page =  isset($_REQUEST['page']) ? (int) $_REQUEST['page'] : 1;
      $start = isset($_REQUEST['start']) ? (int) $_REQUEST['start'] : 0;
      $limit = isset($_REQUEST['limit']) ? (int) $_REQUEST['limit'] : 10;
      $order = '';
      $sortJSON =  isset($_REQUEST['sort']) ? trim($_REQUEST['sort']) : "";

      if(!empty($sortJSON))
      {
         $sortArray = json_decode($sortJSON);
         
         if(count($sortArray))
         {
            $sortBy = array();
            foreach($sortArray as $thisSort)
            {
               $sortBy[] = $thisSort->property." ".$thisSort->direction;
            }
            
            $order = is_array($sortBy) ? implode(',', $sortBy) : '';
         }
         
      }
      

      $criteria = new CDbCriteria();
      $totalCount = User::model()->count($criteria);
      
      $criteria->order  = $order;
      $criteria->offset = $start;
      $criteria->limit  = $limit;
      $results          = User::model()->findAll($criteria);
      
      foreach($results as $thisResult)
      {
         $row    = $thisResult->attributes;
         $data[] = $row;
         unset($row);
      }
      
      $response->total = $totalCount;
      $response->data  = $data;
      
      echo json_encode($response);
   }

   
   public function actionCreate(){
      $response          = new StdClass();
      $response->success = false;
      $response->message = 'An Error Has Occureed.';
      $response->data    = new StdClass();
      
      if($this->request->method == 'POST'){
            if(is_array($this->params)){
               foreach($this->params as $param){
                  $id = (int) $param->id;
                  if($id){
                     $model = User::model()->findByPk($id);
                  }else{
                     $model = new User();
                     $model->attributes = (array) $param;
                     if($model->validate()){
                        $model->save();
                     }else{
                        //echo "<pre>";print_r($model->attributes);echo "<pre/>";
                        //echo "<pre>";print_r($model->getErrors());echo "<pre/>";
                     }
                  }
               }
               $response->success = true;
               $response->message = 'User Successfully Created.';
            }
         
      }
      
      echo json_encode($response);
   }
   
   public function actionDelete(){
      $response = new StdClass();
      $response->success = false;
      $response->message = 'An Error Has Occureed.';
      $response->data    = new StdClass();
      
      if(isset($_POST)){
         $response->success = true;
         $response->message = 'User Successfully Deleted.';
      }
   
      echo json_encode($response);
   }
}