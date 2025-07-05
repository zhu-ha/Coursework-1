<?php
session_start();
if (!isset($_SESSION['bookings'])) {
    $_SESSION['bookings'] = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AirLine Reservation System</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
                </svg>
                <span>SkyReserve</span>
            </div>
            <div class="nav-menu">
                <a href="#home" class="nav-link active">Home</a>
                <a href="#bookings" class="nav-link">My Bookings</a>
                <a href="#about" class="nav-link">About</a>
            </div>
        </div>
    </nav>

    <!-- Notification area for messages -->
    <?php if (isset($_GET['success']) || isset($_GET['error'])): ?>
        <div id="notification-data" 
             data-success="<?php echo htmlspecialchars($_GET['success'] ?? ''); ?>"
             data-error="<?php echo htmlspecialchars($_GET['error'] ?? ''); ?>"
             data-seat="<?php echo htmlspecialchars($_GET['seat'] ?? ''); ?>"
             style="display: none;"></div>
    <?php endif; ?>

    <main class="main-content">
        <section id="home" class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">Your Journey Begins Here</h1>
                <p class="hero-subtitle">Experience seamless flight booking with our modern reservation system</p>
                <button class="cta-button" onclick="showBookingForm()">Book Your Flight</button>
            </div>
            <div class="hero-visual">
                <div class="floating-card">
                    <div class="card-content">
                        <div class="flight-icon">✈️</div>
                        <h3>Premium Experience</h3>
                        <p>Book, manage, and enjoy your flights</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="booking-form" class="booking-section hidden">
            <div class="form-container">
                <div class="form-header">
                    <h2>Book Your Flight</h2>
                    <button class="close-btn" onclick="hideBookingForm()">×</button>
                </div>
                <form id="bookingForm" method="POST" action="booking.php">
                    <input type="hidden" name="action" value="create">
                    <div class="form-group">
                        <label for="passengerName">Passenger Name</label>
                        <input type="text" id="passengerName" name="passenger_name" required>
                    </div>
                    <div class="form-group">
                        <label for="flightNumber">Flight Number</label>
                        <input type="text" id="flightNumber" name="flight_number" required>
                    </div>
                    <div class="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="tel" id="phoneNumber" name="phone_number" required>
                    </div>
                    <button type="submit" class="submit-btn">Confirm Booking</button>
                </form>
            </div>
        </section>

        <section id="bookings" class="bookings-section">
            <div class="bookings-container">
                <h2>Your Bookings</h2>
                <div id="bookings-list" class="bookings-list">
                    <?php if (empty($_SESSION['bookings'])): ?>
                        <div class="empty-state">
                            <div class="empty-icon">📅</div>
                            <h3>No bookings yet</h3>
                            <p>Start by booking your first flight</p>
                            <button class="cta-button secondary" onclick="showBookingForm()">Book Now</button>
                        </div>
                    <?php else: ?>
                        <?php foreach ($_SESSION['bookings'] as $index => $booking): ?>
                            <div class="booking-card">
                                <div class="booking-info">
                                    <div class="seat-number">Seat <?php echo $index + 1; ?></div>
                                    <h3><?php echo htmlspecialchars($booking['passenger_name']); ?></h3>
                                    <div class="flight-details">
                                        <span class="flight-number"><?php echo htmlspecialchars($booking['flight_number']); ?></span>
                                        <span class="phone"><?php echo htmlspecialchars($booking['phone_number']); ?></span>
                                    </div>
                                </div>
                                <div class="booking-actions">
                                    <button class="edit-btn" onclick="editBooking(<?php echo $index; ?>)">Edit</button>
                                    <button class="delete-btn" onclick="deleteBooking(<?php echo $index; ?>)">Delete</button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>