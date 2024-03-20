<?php

if ($api == "hotelguest") {
    if ($method == "GET") {
        include_once "get.php";
    }

    if ($method == "POST") {
        include_once "post.php";
    }
    if ($method == "PUT") {
        include_once "put.php";
    }
 
    if ($method == "DELETE") {
        include_once "delete.php";
    }
}