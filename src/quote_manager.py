# src/quote_manager.py
import csv
import random
from pathlib import Path
from typing import Dict, List
from threading import Timer
import logging

class QuoteManager:
    def __init__(self, csv_path: str):
        self.csv_path = Path(csv_path)
        self.quotes: List[Dict[str, str]] = []
        self.current_quote: Dict[str, str] = {"quote": "", "author": ""}
        self.timer: Timer | None = None
        self.load_quotes()

    def load_quotes(self) -> None:
        """Load quotes from CSV file."""
        try:
            with open(self.csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                if not reader.fieldnames or set(reader.fieldnames) != {"quote", "author"}:
                    raise ValueError("CSV file must have 'quote' and 'author' columns")
                self.quotes = list(reader)
                if not self.quotes:
                    raise ValueError("CSV file is empty")
        except FileNotFoundError:
            logging.error(f"Could not find quotes file at {self.csv_path}")
            self.quotes = [{"quote": "File not found", "author": "System"}]
        except PermissionError:
            logging.error(f"Permission denied accessing {self.csv_path}")
            self.quotes = [{"quote": "Permission denied", "author": "System"}]
        except (csv.Error, UnicodeDecodeError) as e:
            logging.error(f"Error reading CSV file: {e}")
            self.quotes = [{"quote": "Error reading quotes file", "author": "System"}]
        except ValueError as e:
            logging.error(f"Invalid CSV format: {e}")
            self.quotes = [{"quote": "Invalid quote format", "author": "System"}]

    def get_random_quote(self) -> Dict[str, str]:
        """Return a random quote from the collection."""
        if self.quotes:
            self.current_quote = random.choice(self.quotes)
        return self.current_quote

    def start_timer(self, interval: int = 300) -> None:
        """Start the quote refresh timer (default 5 minutes)."""
        self.stop_timer()  # Clear any existing timer
        self.timer = Timer(interval, self._timer_callback)
        self.timer.start()

    def stop_timer(self) -> None:
        """Stop the current timer if it exists."""
        if self.timer:
            self.timer.cancel()
            self.timer = None

    def _timer_callback(self) -> None:
        """Internal callback for timer - gets new quote and restarts timer."""
        self.get_random_quote()
        self.start_timer()  # Restart the timer