# src/ui/window.py
import customtkinter as ctk
from pathlib import Path
from src.quote_manager import QuoteManager

class QuoteWidget(ctk.CTkFrame):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Configure the window appearance
        self.configure(fg_color=("white", "gray20"))  # Light/dark mode colors
        
        # Create quote manager
        quotes_path = Path(__file__).parents[2] / "data" / "quotes.csv"
        self.quote_manager = QuoteManager(str(quotes_path))
        
        # Create UI elements
        self.setup_ui()
        
        # Start quote timer
        self.quote_manager.start_timer()

        # Bind cleanup to window destroy event
        if isinstance(self.master, ctk.CTk):
            self.master.bind("<Destroy>", self.cleanup)

    def cleanup(self, event=None):
        """Stop the timer and cleanup resources when closing"""
        if self.quote_manager:
            self.quote_manager.stop_timer()

    def setup_ui(self):
        # App title
        self.title_label = ctk.CTkLabel(
            self,
            text="Quote of the Day",
            font=("Arial", 16, "bold")
        )
        self.title_label.pack(pady=(15, 0))

        # Subtitle
        self.subtitle_label = ctk.CTkLabel(
            self,
            text="by Davis & Claude",
            font=("Arial", 10),
            text_color="gray60"  # Subtle gray color
        )
        self.subtitle_label.pack(pady=(0, 15))

        # Quote text
        self.quote_label = ctk.CTkLabel(
            self,
            text="",
            wraplength=300, # Wrap text at 300 pixels
            font=("Arial", 14), 
            justify="center"  # Center the text
        )
        self.quote_label.pack(pady=(0, 5), padx=20, expand=True)  # Added expand=True

        # Author text
        self.author_label = ctk.CTkLabel(
            self,
            text="",
            font=("Arial", 12, "italic")
        )
        self.author_label.pack(pady=(0, 10))

        # Refresh button
        self.refresh_btn = ctk.CTkButton(
            self,
            text="↻",
            width=30,
            height=30,
            command=self.refresh_quote
        )
        self.refresh_btn.pack(pady=(0, 10))

        # Initial quote
        self.refresh_quote()

    def refresh_quote(self):
        quote = self.quote_manager.get_random_quote()
        self.quote_label.configure(text=f'"{quote["quote"]}"')
        self.author_label.configure(text=f"-- {quote['author']}")