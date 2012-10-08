  <?php $this->widget('application.components.widgets.ext.Grid', 
                      array('model' => 'User',
                            'gridHeader' => 'This is a custom Grid header',
                            'enableEdit' => true,
                            'columns' => array(
                               'username',
                               'firstname',
                               'lastname',
                               'email',
                               'status',
                               'create_date'
                            ),
                            'remoteUrl' => $this->createUrl('/user/getUsers'),
                            'api'       => array('create'  => $this->createUrl('/user/Create'),
                                                 'update'  => $this->createUrl('/user/Edit'),
                                                 'destroy' => $this->createUrl('/user/Delete'))
                      ) 
        ); 
   ?>