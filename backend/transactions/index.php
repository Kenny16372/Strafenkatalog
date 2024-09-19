<?php
include '../shared.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getTransactions();
        break;
    case 'POST':
        createTransaction();
        break;
    case 'PUT':
        updateTransaction();
        break;
    case 'DELETE':
        deleteTransaction();
        break;
    case 'PATCH':
        payTransactions();
        break;
    default:
        http_response_code(405);
}

function getTransactions()
{
    global $pdo;

    // Prepare and execute the SQL query
    $sql = "SELECT json_agg(penalty_sorted) as transactions FROM strafenkatalog.penalty_sorted";
    $stmt = $pdo->query($sql);

    // Fetch the result as an associative array
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Output the result as JSON
    header('Content-Type: application/json');
    echo $result['transactions'];
}

function createTransaction()
{
    global $pdo;

    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $fine_id = $parsed_body['fine_id'];
    $player_id = $parsed_body['player_id'];
    $count = $parsed_body['count'];
    if (!isset($fine_id) || !isset($player_id) || !isset($count)) {
        http_response_code(400);
        exit;
    }

    $count_numeric = (float) $count;
    $sql = 'INSERT INTO strafenkatalog.penalty ("fine_id", "player_id", "count", "amount")
            VALUES (:fine_id, :player_id, :count, 
            (SELECT amount FROM strafenkatalog.fine WHERE id = :fine_id) * :count_numeric)';
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute(['fine_id' => $fine_id, 'player_id' => $player_id, 'count' => $count, 'count_numeric' => $count_numeric]);

    if (!$result) {
        http_response_code(400);
        exit;
    }

    http_response_code(201);
}

function updateTransaction()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }
    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $fine_id = $parsed_body['fine_id'];
    $player_id = $parsed_body['player_id'];
    $count = $parsed_body['count'];
    if (!isset($fine_id) || !isset($player_id) || !isset($count)) {
        http_response_code(400);
        exit;
    }

    $sql = "UPDATE strafenkatalog.penalty SET fine_id = :fine_id, player_id = :player_id, count = :count WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id, 'fine_id' => $fine_id, 'player_id' => $player_id, 'count' => $count]);

    http_response_code(200);
}

function deleteTransaction()
{
    global $pdo;

    $id = $_GET['id'];
    if (!isset($id)) {
        http_response_code(400);
        exit;
    }

    $sql = "INSERT INTO strafenkatalog.penalty_deleted SELECT id FROM strafenkatalog.penalty_existing WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $id]);

    http_response_code(200);
}

function payTransactions()
{
    global $pdo;

    $parsed_body = json_decode(file_get_contents('php://input'), true);
    $transaction_ids = $parsed_body['transaction_ids'];
    if (!isset($transaction_ids) || !is_array($transaction_ids)) {
        http_response_code(400);
        exit;
    }

    $placeholders = implode(',', array_fill(0, count($transaction_ids), '(?)'));
    $sql = "INSERT INTO strafenkatalog.settlement (penalty_id) VALUES $placeholders";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($transaction_ids);

    http_response_code(200);
}
