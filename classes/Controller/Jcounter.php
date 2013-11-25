<?php defined('SYSPATH') or die('No direct script access.');
class Controller_Jcounter extends Controller_Base {
    // @TODO: Предусмотреть вывод ошибок для AJAX
    public function before(){
        parent::before();
        $this->auto_render = FALSE;
    }
    public function action_changeCount(){
        try{
            $order = $this->request->post('order');
            $count = $this->request->post('count');
            $orders = $this->session->get('orders');
            $orders[$order]['count'] = $count;
            $this->session->set('orders',$orders);
        }catch(Exception $e){ echo 'error: '.$e; }
    }
}