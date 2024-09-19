<?php
include '../shared.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$type = $_GET['type'] ?? '';
switch ($type) {
    case 'penalty_sum':
        getPenaltySum();
        break;
    case 'penalty_count':
        getPenaltyCount();
        break;
    case 'penalty_open':
        getPenaltyOpen();
        break;
    case 'penalty_settled':
        getPenaltySettled();
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid type parameter']);
}

function getPenaltySum()
{
    global $pdo;

    $sql = "SELECT json_agg(players_by_penalty_sum) as result FROM strafenkatalog.players_by_penalty_sum";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo $result['result'];
}

function getPenaltyCount()
{
    global $pdo;

    $sql = "SELECT json_agg(players_by_penalty_count) as result FROM strafenkatalog.players_by_penalty_count";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo $result['result'];
}

function getPenaltyOpen()
{
    global $pdo;

    $sql = "SELECT json_agg(players_by_penalty_open) as result FROM strafenkatalog.players_by_penalty_open";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo $result['result'];
}

function getPenaltySettled()
{
    global $pdo;

    $sql = "SELECT json_agg(players_by_penalty_settled) as result FROM strafenkatalog.players_by_penalty_settled";
    $stmt = $pdo->query($sql);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo $result['result'];
}
