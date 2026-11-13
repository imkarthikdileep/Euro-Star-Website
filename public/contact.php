<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

$name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : "";
$email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";
$phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : "";
$message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "";

if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["success" => false, "message" => "Please fill out all required fields."]);
    exit;
}

$to = "info@eurostaremc.com";
$subject = "Euro Star Contact Form: " . $name;
$headers = "From: " . $email . "\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "X-Mailer: PHP/" . phpversion() . "\r\n" .
           "MIME-Version: 1.0\r\n" .
           "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "New inquiry received from eurostaremc.com\n\n" .
        "Name: " . $name . "\n" .
        "Email: " . $email . "\n" .
        "Phone: " . $phone . "\n\n" .
        "Message:\n" . $message . "\n";

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(["success" => true, "message" => "Your message has been sent successfully!"]);
} else {
    // If local PHP mail agent is unconfigured on Hostinger, return fallback signal
    echo json_encode(["success" => false, "message" => "Email agent unavailable on host."]);
}

