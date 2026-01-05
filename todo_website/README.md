# Todo Website

A simple, clean, and functional todo list web application built with vanilla HTML, CSS, and JavaScript.

## Features

- Add, complete, and delete tasks
- Filter tasks by all/active/completed
- Clear all completed tasks
- Persistent storage using localStorage
- Responsive design for mobile and desktop
- Clean, modern UI with smooth animations

## Getting Started

Simply open `index.html` in your web browser. No build process or dependencies required.

### Opening the App

1. Navigate to the project directory
2. Open `index.html` in your preferred web browser
3. Start managing your todos!

Alternatively, you can use a local development server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server (requires installation)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
todo_website/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── app.js          # Application logic and state management
├── README.md       # Project documentation
└── CLAUDE.md       # Developer guidance for Claude Code
```

## How It Works

- **State Management**: Todos are stored in memory and persisted to localStorage
- **Event Handling**: DOM event listeners handle user interactions
- **Filtering**: Client-side filtering for all/active/completed views
- **Data Persistence**: Automatic save to localStorage on every change

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- localStorage API
- CSS Flexbox and Grid

## License

This project is open source and available for personal or educational use.
