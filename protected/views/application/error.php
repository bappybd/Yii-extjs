<?php
$this->pageTitle=Yii::app()->name . ' - Error';
$this->breadcrumbs=array(
	'Error',
);
?>

<h2>Error <?php echo $code; ?></h2>

<div class="error">
<?php echo CHtml::encode($message); ?>

<br/><br/>
<h2>Traces </h2>
<?php 
 $tracesArray = explode('#', $trace); 
 
 foreach((array) $tracesArray as $key=>$value)
 {
    echo "<br />#$value";
 }
?>
</div>