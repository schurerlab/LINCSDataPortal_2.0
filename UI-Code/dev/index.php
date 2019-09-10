<?php

    $filePath = preg_replace("/\?.+/", "", ltrim($_SERVER["REQUEST_URI"], '/'));

    include $filePath.".php";

?>