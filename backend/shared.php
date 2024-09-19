<?php
$config = parse_ini_file('config.ini', true);

$origin_frontend = $config['settings']['origin_frontend'];

// Database connection parameters
$host = $config['database']['host'];
$db = $config['database']['database'];
$user = $config['database']['username'];
$pass = $config['database']['password'];

$pdo;

try {
    // Create a new PDO instance
    $pdo = new PDO("pgsql:host=" . $host . ";dbname=" . $db, $user, $pass);

    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection errors
    echo 'Connection failed: ' . $e->getMessage();
}

header("Access-Control-Allow-Origin: " . $origin_frontend);

// Check if the request method is OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Set the allowed methods and headers
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}