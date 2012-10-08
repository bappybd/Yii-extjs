<?php
/**
 * Starting including various parts to build the application 
 */
?>

<!-- LOADING ANIMATION -->
<div id="loading-mask" style=""></div>
<div id="loading">
  <div class="loading-indicator">
      <img src="/images/extanim32.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>Ext JS 4.1 - <a href="http://www.sencha.com">sencha.com</a>
      <br /><span id="loading-msg">Loading styles and images...</span>
  </div>
</div>
<!-- END -->


<!-- HEADER/NORTH -->
<?php $this->renderPartial('_header') ?>

<!-- LEFT/WEST -->
<?php $this->renderPartial('_left') ?>

<!-- BODY/CENTER -->
<?php $this->renderPartial('_body') ?>

<!-- RIGHT/EAST -->
<?php $this->renderPartial('_right') ?>

<!-- BOTTOM/SOUTH -->
<?php $this->renderPartial('_bottom') ?>

