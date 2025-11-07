# tests/test_quote_manager.py
import unittest
from pathlib import Path
import tempfile
import csv
from src.quote_manager import QuoteManager
import time

class TestQuoteManager(unittest.TestCase):
    def setUp(self):
        """Create a temporary CSV file with test quotes before each test."""
        self.temp_dir = tempfile.mkdtemp()
        self.csv_path = Path(self.temp_dir) / "test_quotes.csv"
        
        # Create test quotes
        self.test_quotes = [
            {"quote": "Test quote 1", "author": "Author 1"},
            {"quote": "Test quote 2", "author": "Author 2"},
            {"quote": "Test quote 3", "author": "Author 3"}
        ]
        
        # Write test quotes to temporary CSV
        with open(self.csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["quote", "author"])
            writer.writeheader()
            writer.writerows(self.test_quotes)
        
        self.quote_manager = QuoteManager(str(self.csv_path))

    def tearDown(self):
        """Clean up temporary files after each test."""
        self.csv_path.unlink(missing_ok=True)  # Delete temp CSV
        self.quote_manager.stop_timer()  # Ensure timer is stopped

    def test_load_quotes(self):
        """Test that quotes are loaded correctly from CSV."""
        self.assertEqual(len(self.quote_manager.quotes), 3)
        self.assertIn(self.test_quotes[0], self.quote_manager.quotes)

    def test_get_random_quote(self):
        """Test that get_random_quote returns a valid quote."""
        quote = self.quote_manager.get_random_quote()
        self.assertIn(quote, self.test_quotes)
        self.assertIsInstance(quote, dict)
        self.assertIn("quote", quote)
        self.assertIn("author", quote)

    def test_timer_callback(self):
        """Test that timer callback updates current quote."""
        initial_quote = self.quote_manager.current_quote
        self.quote_manager._timer_callback()
        self.assertIn(self.quote_manager.current_quote, self.test_quotes)

    def test_file_not_found(self):
        """Test handling of non-existent CSV file."""
        nonexistent_path = Path(self.temp_dir) / "nonexistent.csv"
        manager = QuoteManager(str(nonexistent_path))
        self.assertEqual(len(manager.quotes), 1)
        self.assertEqual(manager.quotes[0]["quote"], "File not found")
        self.assertEqual(manager.quotes[0]["author"], "System")

    def test_invalid_csv_format(self):
        """Test handling of malformed CSV file."""
        # Create CSV with wrong columns
        bad_csv_path = Path(self.temp_dir) / "bad.csv"
        with open(bad_csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["wrong", "columns"])
            writer.writeheader()
            writer.writerow({"wrong": "data", "columns": "more"})
        
        manager = QuoteManager(str(bad_csv_path))
        self.assertEqual(len(manager.quotes), 1)
        self.assertEqual(manager.quotes[0]["quote"], "Invalid quote format")

if __name__ == '__main__':
    unittest.main()