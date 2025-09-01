<?php
session_start();
header('Content-Type: text/plain');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['items']) || empty($data['items'])) {
    echo "Your cart is empty.";
    exit;
}

$total_price = $data['total'];
echo "Thank you for your purchase! Your order for $" . number_format($total_price, 2) . " has been confirmed.";

// Clear the cart after the succesful checkout
$_SESSION['cart'] = [];
?>