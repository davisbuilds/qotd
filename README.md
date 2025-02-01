# Quote of the Day Widget

A simple desktop widget that displays inspiring quotes. Quotes refresh automatically every 5 minutes, or you can manually refresh them using the refresh button.

## Features

- Draggable interface
- Auto-refresh quotes every 5 minutes
- Manual refresh button
- Minimalist design
- Supports both light and dark modes

## Installation

1. Clone this repository:

```bash
git clone https://github.com/[your-username]/qotd_v01.git
cd qotd_v01
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
.\venv\Scripts\activate
```

3. Install required packages:

```bash
pip install -r requirements.txt
```

## Running the Widget

To run the widget:

```bash
python -m src.main
```

You can:

- Click and drag the window to move it
- Click the refresh button (↻) to get a new quote
- Press Escape to close the widget

## Development

This project uses:

- customtkinter for the UI
- Python's built-in csv module for quote management
- logging for error tracking

## License

MIT License

Copyright (c) 2025 Davis
