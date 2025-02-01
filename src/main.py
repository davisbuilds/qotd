# src/main.py
import sys
import logging
from pathlib import Path
import customtkinter as ctk
from src.ui.window import QuoteWidget

def setup_logging():
    """Configure logging for the application"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('quote_widget.log'),
            logging.StreamHandler(sys.stdout)
        ]
    )

def main():
    try:
        # Setup logging
        setup_logging()
        logging.info("Starting Quote of the Day application")

        # Configure appearance
        ctk.set_appearance_mode("light")  # or "dark"
        ctk.set_default_color_theme("blue")

        # Initialize main window
        app = ctk.CTk()
        app.title("Quote of the Day")
        
        # Keep window on top but allow normal controls
        # app.attributes('-topmost', True)
        
        # Set initial size and position
        window_width = 350
        window_height = 200
        screen_width = app.winfo_screenwidth()
        screen_height = app.winfo_screenheight()
        x_position = (screen_width - window_width) // 2
        y_position = (screen_height - window_height) // 2
        app.geometry(f"{window_width}x{window_height}+{x_position}+{y_position}")

        # Set minimum size
        app.minsize(300, 150)
        app.maxsize(400, 400)  # Adjust these numbers as needed

        # Create and pack the widget
        widget = QuoteWidget(app)
        widget.pack(expand=True, fill="both")
        
        def on_closing():
            app.quit()
            app.destroy()  # Ensure complete cleanup

        # Add close button functionality
        app.protocol("WM_DELETE_WINDOW", on_closing)
        app.bind("<Escape>", lambda e: on_closing())

        logging.info("Application initialized successfully")
        app.mainloop()

    except Exception as e:
        logging.error(f"Application error: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main()