<?php
    header("Access-Control-Allow-Origin: *");

    sleep(0.1);

    $json = '{ }';

    if(key_exists('term', $_GET)){

      $file = 'organized-suggest_'.$_GET['term'].'.json';

      if(file_exists($file))
        $json = file_get_contents($file);
       
    } 

    echo $json;
?>
