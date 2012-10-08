<style>
    body {
        font: 14px/1.4em "Metrophobic","Helvetica Neue",Arial,"Lucida Grande",sans-serif;
        background-image: url(<?php echo Yii::app()->baseUrl?>/images/bg1.png);
    }    
</style>
<h2>Welcome to Ext4Yii Framework <?php echo Ext4Yii::getVersion()?></h2>
<pre class="changelog">
<?php
    include dirname(__FILE__) . '/../../extensions/ext4yii/CHANGELOG';
?>
</pre>