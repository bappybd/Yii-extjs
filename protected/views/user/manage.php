  <?php $this->widget('application.components.widgets.ext.Grid', 
                      array('model' => 'User',
                            'gridHeader'   => 'This is a custom Grid header',
                            'enableEdit'   => true,
                            'dataProvider' =>new CActiveDataProvider('User'),
                            'columns'      => array(
                               'id',
                               'username',
                               'firstname',
                               'lastname',
                               'email',
                               array(
                                  'name'  => 'create_date',
                                  'type'  => 'date',
                                  'value' => '',
                               )
                            ),
                            'remoteUrl' => $this->createUrl('/user/getUsers'),
                            'api'       => array('create'  => $this->createUrl('/user/Create'),
                                                 'update'  => $this->createUrl('/user/Edit'),
                                                 'destroy' => $this->createUrl('/user/Delete'))
                      ) 
        ); 
   ?>