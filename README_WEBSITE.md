# SkyReserve - Airline Reservation System (Website Version)

🛩️ **A modern, Apple-inspired web application for airline reservations**

This is the website version of the airline reservation system, featuring a beautiful Apple-like UI with smooth animations and responsive design.

## ✨ Features

- **Apple-inspired Design**: Clean, modern interface using Inter fonts and Apple's design principles
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fluid transitions and hover effects for enhanced user experience
- **Real-time Validation**: Form validation with instant feedback
- **Session-based Storage**: Bookings persist during your browser session
- **CRUD Operations**: Create, Read, Update, and Delete flight bookings
- **Keyboard Shortcuts**: 
  - `Escape` - Close forms/dialogs
  - `Cmd/Ctrl + K` - Quick booking form

## 🚀 Quick Start

### Prerequisites
- PHP 7.4 or higher
- Web server (Apache, Nginx, or PHP built-in server)

### Setup

1. **Clone the repository and switch to the website branch:**
   ```bash
   git clone https://github.com/zhu-ha/Coursework-1.git
   cd Coursework-1
   git checkout website-ui
   ```

2. **Start the PHP development server:**
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

## 🎯 How to Use

### Making a Booking
1. Click "Book Your Flight" on the homepage
2. Fill in passenger details:
   - Passenger Name
   - Flight Number
   - Phone Number
3. Click "Confirm Booking"
4. Your seat number will be automatically assigned

### Managing Bookings
- **View All Bookings**: Scroll down to the "Your Bookings" section
- **Edit Booking**: Click the "Edit" button on any booking card
- **Delete Booking**: Click the "Delete" button and confirm the action

### Navigation
- **Home**: Landing page with booking form
- **My Bookings**: View and manage your reservations
- **About**: Information about the service

## 🎨 Design Features

- **Color Scheme**: Apple's signature blue (#007AFF) with clean grays
- **Typography**: Inter font family for optimal readability
- **Shadows**: Subtle depth with multiple shadow layers
- **Border Radius**: Consistent rounded corners (8px, 12px, 16px)
- **Animations**: Smooth transitions with proper easing
- **Backdrop Blur**: Modern glassmorphism effects

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Full layout with side-by-side hero)
- **Tablet**: 768px-1199px (Stacked layout)
- **Mobile**: <768px (Single column, touch-optimized)

## 🔧 Technical Details

### File Structure
```
├── index.php          # Main application page
├── booking.php        # Backend CRUD operations
├── style.css          # Apple-inspired styling
├── script.js          # Interactive functionality
└── README_WEBSITE.md  # This documentation
```

### PHP Features
- Session management for data persistence
- Input validation and sanitization
- AJAX endpoints for dynamic updates
- Error handling with user-friendly messages

### JavaScript Features
- ES6+ syntax with modern browser APIs
- Intersection Observer for scroll animations
- Fetch API for AJAX requests
- Event delegation and proper cleanup

### CSS Features
- CSS Custom Properties (CSS Variables)
- Flexbox and Grid layouts
- CSS Animations and Transitions
- Media queries for responsiveness

## 🛡️ Security

- All user inputs are sanitized using `htmlspecialchars()`
- Form validation on both client and server side
- Session-based data storage (no persistent database in this demo)
- CSRF protection through proper form handling

## 🌟 Browser Support

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## 📝 Notes

- This is a demo application using PHP sessions for data storage
- In production, consider using a proper database (MySQL, PostgreSQL)
- Add authentication and user management for multi-user support
- Implement proper error logging and monitoring

## 🎨 Customization

The design system uses CSS custom properties, making it easy to customize:

```css
:root {
    --primary-blue: #007AFF;        /* Change primary color */
    --background-gray: #F2F2F7;     /* Change background */
    --radius-medium: 12px;          /* Adjust border radius */
    --spacing-lg: 24px;             /* Modify spacing */
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Enjoy your flight booking experience! ✈️**