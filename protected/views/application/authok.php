<div class="example-title">
    Welcome to Enterprise Systems   
</div>
<p>
    You username is <?php echo Yii::app()->user->name;?>
</p>
<p>
    <a href="<?php echo $this->createAbsoluteUrl("application/logout");?>">Click here to logout</a>
</p>