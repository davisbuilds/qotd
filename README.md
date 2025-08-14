# Quote of the Day Widget

A simple desktop widget that displays inspiring quotes. Quotes refresh automatically every 5 minutes, or you can manually refresh them using the refresh button.

## Features

- Draggable interface
- Quotes auto-refresh every 5 minutes
- Manual refresh button
- Minimalist design
- Dark mode by default

## Prerequisites

- Python 3.8 or higher
- [uv](https://docs.astral.sh/uv/) package manager

## Installation

1. Clone this repository:

```bash
git clone https://github.com/[your-username]/qotd.git
cd qotd
```

2. Install dependencies using uv:
```bash
uv sync
```

This will automatically:
- Create a virtual environment
- Install all dependencies
- Install the project in development mode

## Running the Widget

To run the widget:

```bash
# Using uv run (recommended)
uv run quote-of-day

# Or activate the virtual environment first
uv shell
quote-of-day
```

You can:

- Click and drag the window to move it
- Click the refresh button (↻) to get a new quote
- Press Escape to close the widget

### Project Structure

```
quote-of-day/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── quote_manager.py
│   ├── ui/
│   │   ├── __init__.py
│   │   └── window.py
|   └── data/
│       └── quotes.csv
├── tests/
│   └── test_quote_manager.py
├── pyproject.toml
└── README.md
```

## Development

This project uses:

- customtkinter for the UI
- Python's built-in csv module for quote management
- logging for error tracking

## License

MIT License

Copyright (c) 2025 Davis
