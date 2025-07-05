<?php
session_start();

// Initialize bookings array if not exists
if (!isset($_SESSION['bookings'])) {
    $_SESSION['bookings'] = [];
}

// Handle different actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'create':
            createBooking();
            break;
        case 'update':
            updateBooking();
            break;
        case 'delete':
            deleteBooking();
            break;
        default:
            header('Location: index.php?error=invalid_action');
            exit;
    }
} else {
    header('Location: index.php');
    exit;
}

function createBooking() {
    $passengerName = trim($_POST['passenger_name'] ?? '');
    $flightNumber = trim($_POST['flight_number'] ?? '');
    $phoneNumber = trim($_POST['phone_number'] ?? '');
    
    // Validate input
    if (empty($passengerName) || empty($flightNumber) || empty($phoneNumber)) {
        header('Location: index.php?error=missing_fields');
        exit;
    }
    
    // Check if maximum bookings reached (limit to 100 like original Java code)
    if (count($_SESSION['bookings']) >= 100) {
        header('Location: index.php?error=booking_full');
        exit;
    }
    
    // Create new booking
    $booking = [
        'passenger_name' => htmlspecialchars($passengerName),
        'flight_number' => htmlspecialchars($flightNumber),
        'phone_number' => htmlspecialchars($phoneNumber),
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    $_SESSION['bookings'][] = $booking;
    $seatNumber = count($_SESSION['bookings']);
    
    header("Location: index.php?success=booking_created&seat=$seatNumber");
    exit;
}

function updateBooking() {
    $index = intval($_POST['booking_index']);
    $passengerName = trim($_POST['passenger_name'] ?? '');
    $flightNumber = trim($_POST['flight_number'] ?? '');
    $phoneNumber = trim($_POST['phone_number'] ?? '');
    
    // Validate input
    if (empty($passengerName) || empty($flightNumber) || empty($phoneNumber)) {
        header('Location: index.php?error=missing_fields');
        exit;
    }
    
    // Check if booking exists
    if (!isset($_SESSION['bookings'][$index])) {
        header('Location: index.php?error=booking_not_found');
        exit;
    }
    
    // Update booking
    $_SESSION['bookings'][$index] = [
        'passenger_name' => htmlspecialchars($passengerName),
        'flight_number' => htmlspecialchars($flightNumber),
        'phone_number' => htmlspecialchars($phoneNumber),
        'created_at' => $_SESSION['bookings'][$index]['created_at'],
        'updated_at' => date('Y-m-d H:i:s')
    ];
    
    header('Location: index.php?success=booking_updated');
    exit;
}

function deleteBooking() {
    $index = intval($_POST['booking_index']);
    
    // Check if booking exists
    if (!isset($_SESSION['bookings'][$index])) {
        header('Location: index.php?error=booking_not_found');
        exit;
    }
    
    // Remove booking and reindex array
    array_splice($_SESSION['bookings'], $index, 1);
    
    header('Location: index.php?success=booking_deleted');
    exit;
}

// Handle GET requests for AJAX
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['ajax'])) {
    header('Content-Type: application/json');
    
    switch ($_GET['action']) {
        case 'get_booking':
            $index = intval($_GET['index']);
            if (isset($_SESSION['bookings'][$index])) {
                echo json_encode([
                    'success' => true,
                    'booking' => $_SESSION['bookings'][$index]
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'error' => 'Booking not found'
                ]);
            }
            break;
        case 'get_all_bookings':
            echo json_encode([
                'success' => true,
                'bookings' => $_SESSION['bookings']
            ]);
            break;
        default:
            echo json_encode([
                'success' => false,
                'error' => 'Invalid action'
            ]);
    }
    exit;
}
?>