<?php

class ApplicationController extends Controller {

    private $directLink;
    protected $isdoc = false;
    
    /**
    * This is the action to handle external exceptions.
    */
   public function actionError()
   {
       $this->layout = '//layout/partial';
       
       if($error=Yii::app()->errorHandler->error)
       {
         if(Yii::app()->request->isAjaxRequest)
            echo $error['message'];
         else
            $this->render('error', $error);
       }
   }
    
    public function actionDashboard() {
        $this->render('dashboard');
    }

    public function getCurrentTheme() {
        if (isset($_GET['theme'])) {
            Yii::app()->session['theme'] = $_GET['theme'];
            return Yii::app()->session['theme'];
        } else if (isset(Yii::app()->session['theme'])) {
            return Yii::app()->session['theme'];
        } else {
            Yii::app()->session['theme'] = 'default';
            return Yii::app()->session['theme'];
        }
    }

    public function getThemesList() {
        $list = array(
            array('theme' => 'default', 'text' => 'Blue Theme'),
            array('theme' => 'gray', 'text' => 'Gray Theme'),
            array('theme' => 'access', 'text' => 'Access Theme'),
                //array('theme' => 'neptune', 'text' => 'Neptune Theme'),
        );
        return $list;
    }

    public function getDirectUrl($theme = null) {
        if (is_null($theme)) {
            return $this->createAbsoluteUrl('application/index') . "#!{$this->directLink}";
        } else {
            return $this->createAbsoluteUrl('application/index', array('theme' => $theme)) . "#!{$this->directLink}";
        }
    }

    public function actionSource() {
        $list = Utils::glob_recursive(dirname(__FILE__) . '/../includes/*');
        $files = array();
        foreach ($list as $item) {
            $item = realpath($item);
            $files[md5($item)] = $item;
        }
        if (isset($_GET['file'])) {
            $file = $_GET['file'];
            if (isset($files[$file])) {
                $source = file_get_contents($files[$file]);
                $source = preg_replace(array("\n@<br/>@\n", '@<(private|xhtml)[^>]*?>.*?</(private|xhtml)>@siu'), array('', ''), $source);
                $this->renderExt4Yii('source', array(
                    'source' => htmlentities($source)
                ));
            }
        } else {
            $this->render('empty');
        }
    }

    /**
     * Router action for rendering content 
     */
    public function actionGo() {
        if (!$this->renderByCategory('example')) {
            if (!$this->renderByCategory('docs')) {
                if (!$this->renderByCategory('media')) {
                    $this->render('empty');
                }
            }
        }
    }

    /**
     * Default action 
     */
    public function actionIndex() {
        $this->render('index');
    }

    /**
     * Renders a view based on its category and name
     * @param type $category
     * @return boolean 
     */
    private function renderByCategory($category) {
        $categories = array_keys($_GET);
        if (isset($_GET[$category])) {
            $folder = $_GET[$category];
            $this->directLink = "$category/$folder";
            if ($category == 'docs') {
                $this->isdoc = true;
                $text = $this->render("application.includes.docs.docmain", array('docfile' => "{$folder}.php"), true);
                echo $this->format($text);
            } else {
                $this->renderExt4Yii("application.includes.{$category}.{$folder}.runner");
            }
            return true;
        } else {
            return false;
        }
    }

    private function format($text) {
        $text = str_replace(array(
            '<codemark>',
            '</codemark>'
                ), array(
            "<span class='codemark'>",
            '</span>'
                ), $text);
        return $text;
    }

    /**
     * Authentivation demo action 
     */
    public function actionAuthOk() {
        $this->renderExt4Yii('authok');
    }

    public function actionLogout() {
        Yii::app()->user->logout();
        $this->redirect($this->createUrl("auth/login", array('notop' => true)));
    }

}

?>
