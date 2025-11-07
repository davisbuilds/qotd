# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running and Development Commands

### Running the Application

```bash
# Primary method using uv (recommended)
uv run quote-of-day

# Alternative command
uv run qotd

# If virtual environment is activated
quote-of-day
```

### Testing
```bash
# Run tests using unittest
python -m unittest tests/test_quote_manager.py

# Run all tests
python -m unittest discover tests/
```

### Environment Setup
```bash
# Install dependencies and setup environment
uv sync

# Activate virtual environment
uv shell
```

## Architecture Overview

### Core Components

**Application Entry Point (`src/main.py`)**
- Configures CustomTkinter appearance (dark mode by default)
- Sets up logging to both file (`quote_widget.log`) and console
- Creates the main CTk window with specific dimensions (350x225px, centered)
- Handles window lifecycle and ESC key binding for exit

**Quote Management (`src/quote_manager.py`)**
- Loads quotes from CSV file with "quote" and "author" columns
- Provides random quote selection with error handling for missing/malformed files
- Implements auto-refresh timer (5-minute intervals by default)
- Thread-safe timer management with proper cleanup

**UI Layer (`src/ui/window.py`)**
- CustomTkinter-based widget with draggable interface
- Displays quotes with proper text wrapping (300px width)
- Manual refresh button (↻) for immediate quote updates
- Responsive layout with title, subtitle, quote text, author, and refresh button

### Data Structure

- Quotes stored in CSV format at `data/quotes.csv`
- Each row requires "quote" and "author" fields
- Quote manager handles file not found, permission errors, and format validation

### Dependencies

- `customtkinter>=5.2.2` for modern UI components
- `pillow>=10.2.0` for image processing support
- Python 3.8+ required

### Testing Strategy

- Unit tests for QuoteManager using temporary CSV files
- Tests cover normal operation, error handling, and timer functionality
- Mock file scenarios for error condition testing

## Key Implementation Notes

- Application defaults to dark mode via `ctk.set_appearance_mode("dark")`
- Window is resizable (min: 300x150, max: 400x400) but starts at 350x225
- Timer automatically restarts after each quote refresh
- Logging captures both application events and errors to `quote_widget.log`
- Proper resource cleanup on window close (timer termination)
