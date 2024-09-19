<?php
include '../shared.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getPlayers();
        break;
    case 'POST':
        createPlayer();
        break;
    case 'PUT':
        updatePlayer();
        break;
    case 'DELETE':
        deletePlayer();
        break;
    default:
        http_response_code(405);
}

function getPlayers()
{
    global $pdo;

    // Prepare and execute the SQL query
    $sql = "SELECT json_agg(player_sorted) as players FROM strafenkatalog.player_sorted";
    $stmt = $pdo->query($sql);

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the result as JSON
    header('Content-Type: application/json');
    echo $result['players'];

}

function createPlayer()
{
    global $pdo;

    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $name = $parsed_body['name'];
    if (!isset($name)) {
        http_response_code(400);
        exit;
    }

    $sql = 'INSERT INTO strafenkatalog.player ("name") VALUES (:name)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $name]);

    http_response_code(201);
}

function updatePlayer()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }
    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $name = $parsed_body['name'];
    if (!isset($name)) {
        http_response_code(400);
        exit;
    }

    $sql = "UPDATE strafenkatalog.player SET name = :name WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id, 'name' => $name]);

    http_response_code(200);
}

function deletePlayer()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }

    $sql = "INSERT INTO strafenkatalog.player_deleted SELECT id FROM strafenkatalog.player_existing WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);

    http_response_code(200);
}