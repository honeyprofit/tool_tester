# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A vanilla JavaScript todo list web application with no build process or external dependencies. The app uses localStorage for data persistence and provides filtering, completion tracking, and task management features.

## Architecture

### Core Components

**State Management** (app.js)
- In-memory `todos` array holds the current state
- Each todo has: `id`, `text`, and `completed` properties
- localStorage provides persistence across sessions
- All state changes trigger `saveTodos()` and `renderTodos()`

**Rendering Pattern**
- Pure function `getFilteredTodos()` derives display state from current filter
- `renderTodos()` regenerates the entire list on each state change
- Event delegation on `#todo-list` handles clicks for checkboxes and delete buttons
- XSS protection via `escapeHtml()` function

**Filter System**
- Three filters: 'all', 'active', 'completed'
- `currentFilter` state tracked globally
- Filters don't modify underlying data, only what's displayed

### File Organization

- `index.html` - DOM structure, semantic HTML
- `styles.css` - All styling, mobile-responsive with media queries
- `app.js` - Complete application logic and state management

## Development Commands

### Running Locally

No build process required. Open `index.html` directly in a browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Testing Changes

Simply refresh the browser after editing files. Use browser DevTools to:
- Inspect localStorage: `localStorage.getItem('todos')`
- Clear storage: `localStorage.clear()`
- Debug state: Add `console.log(todos)` in app.js

## Key Patterns

**Event Handling**: All events attached in `attachEventListeners()` after DOM load
**Data Flow**: User action → Update state → Save to localStorage → Re-render
**HTML Escaping**: Always use `escapeHtml()` when displaying user-generated content
