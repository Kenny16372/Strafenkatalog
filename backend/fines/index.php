<?php
include '../shared.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getFines();
        break;
    case 'POST':
        createFine();
        break;
    case 'PUT':
        updateFine();
        break;
    case 'DELETE':
        deleteFine();
        break;
    default:
        http_response_code(405);
}

function getFines()
{
    global $pdo;

    // Prepare and execute the SQL query
    $sql = "SELECT json_agg(fine_sorted) as fines FROM strafenkatalog.fine_sorted";
    $stmt = $pdo->query($sql);

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the result as JSON
    header('Content-Type: application/json');
    echo $result['fines'];
}

function createFine()
{
    global $pdo;

    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $name = $parsed_body['name'];
    $amount = $parsed_body['amount'];
    if (!isset($name) || !isset($amount)) {
        http_response_code(400);
        exit;
    }

    $sql = 'INSERT INTO strafenkatalog.fine ("name", "amount") VALUES (:name, :amount)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $name, 'amount' => $amount]);

    http_response_code(201);
}

function updateFine()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }
    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $name = $parsed_body['name'];
    $amount = $parsed_body['amount'];
    if (!isset($name) || !isset($amount)) {
        http_response_code(400);
        exit;
    }

    $sql = "UPDATE strafenkatalog.fine SET name = :name, amount = :amount WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id, 'name' => $name, 'amount' => $amount]);

    http_response_code(200);
}

function deleteFine()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }

    $sql = "INSERT INTO strafenkatalog.fine_deleted SELECT id FROM strafenkatalog.fine_existing WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);

    http_response_code(200);
}