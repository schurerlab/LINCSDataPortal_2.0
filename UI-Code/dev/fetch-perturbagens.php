<?php
    header("Access-Control-Allow-Origin: *");

    sleep(0.1);

    $json = '{"data":[{ }]}';

    if(key_exists('term', $_GET)){

      $file = 'fetch-perturbagens_'.$_GET['term'].'.json';

      if(file_exists($file))
        $json = file_get_contents($file);
       
    } 

    echo $json;
?>
