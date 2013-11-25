<?php defined('SYSPATH') OR die('No direct script access!');
class Kohana_Counter extends Controller_Template{
    public $template = 'counter';
    protected static $_instance;
    public static function instance($type = 'default'){
        if (!isset(Counter::$_instance)){
			$config = Kohana::$config->load('counter')->get($type);
			Counter::$_instance = new Counter($config);
		}
        return Counter::$_instance;
    }
    protected $_config;
    public function __construct($config = array()){
        parent::before();
		$this->_config = $config;
	}
    public function put($id,$count){
        return $this->template->content = View::factory('counter')
                ->bind('config',$this->_config)->bind('id',$id)->bind('count',$count);
    }
}