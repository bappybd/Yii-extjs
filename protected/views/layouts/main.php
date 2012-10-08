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
<link href='http://fonts.googleapis.com/css?family=Metrophobic' rel='stylesheet' type='text/css'/>
<link href='http://fonts.googleapis.com/css?family=Anonymous+Pro' rel='stylesheet' type='text/css'>


<script type="text/javascript" src="<?php echo Yii::app()->baseUrl ?>/js/extJs/bootstrap.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->baseUrl ?>/js/ext4yii-debug.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->baseUrl ?>/js/widget.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->baseUrl ?>/js/application.js"></script>
<script type="text/javascript" src="<?php echo Yii::app()->baseUrl ?>/resources/prettify/prettify.js"></script>
<script type="text/javascript">
window.DocApp = new Ext.create('DocAppApplication.DocAppClass');
</script>
<!-- END -->

</head>
<body>
    <?php echo $content; ?>
</body>
<script>        
  if(window.Ext) {
      Ext.onReady(function(){
          prettyPrint();
      });
  } else {
      prettyPrint();
  }
</script>
</html>
