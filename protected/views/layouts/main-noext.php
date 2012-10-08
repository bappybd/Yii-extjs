<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title><?php echo Yii::app()->name ?></title>       
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />


<!-- CSS JAVASCRIPT -->
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl ?>/js/extJs/resources/css/ext-all-scoped.css"/>             
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl ?>/css/main.css"/> 
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl ?>/css/icons32.css"/>
<link href="<?php echo Yii::app()->baseUrl ?>/resources/prettify/prettify.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->baseUrl ?>/js/extJs/shared/app.css"/>             


<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/extJs/ext-all.js', CClientScript::POS_HEAD); ?>
<?php Yii::app()->clientScript->registerScriptFile(Yii::app()->baseUrl.'/js/extJs/shared/app.js', CClientScript::POS_HEAD); ?>
<?php
   if(isset($this->appScript) && count($this->appScript))
   {
      foreach($this->appScript as $script)
      {
         $path = Yii::app()->assetManager->publish($script, true);
         Yii::app()->clientScript->registerScriptFile($path, CClientScript::POS_HEAD);
      }
   }
?>

<!-- END -->

</head>
<body>
    <?php echo $content; ?>
</body>

</html>
