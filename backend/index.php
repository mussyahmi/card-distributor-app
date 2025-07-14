<?php
header("Content-Type: application/json");

// Handle CORS for frontend dev
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

function error($message) {
    echo json_encode(["error" => $message]);
    exit;
}

// Validate input
if (!isset($_GET['people']) || !is_numeric($_GET['people'])) {
    error("Input value does not exist or value is invalid");
}

$people = (int)$_GET['people'];
if ($people <= 0) {
    error("Input value does not exist or value is invalid");
}

// Create and shuffle the deck
$suits = ['S', 'H', 'D', 'C'];
$values = [
    1 => 'A', 2, 3, 4, 5, 6, 7, 8, 9,
    10 => 'X', 11 => 'J', 12 => 'Q', 13 => 'K'
];

$deck = [];
foreach ($suits as $suit) {
    foreach ($values as $num => $val) {
        $deck[] = "$suit-$val";
    }
}

shuffle($deck);

// Distribute cards
$result = array_fill(0, $people, []);
foreach ($deck as $index => $card) {
    $result[$index % $people][] = $card;
}

// Output
foreach ($result as $cards) {
    echo implode(",", $cards) . "\n";
}
?>
