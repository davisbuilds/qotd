# setup.py
from setuptools import setup, find_packages # type: ignore

setup(
    name="quote-of-day",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "customtkinter>=5.2.2",
        "pillow>=10.2.0",
    ],
    entry_points={
        'console_scripts': [
            'quote-of-day=src.main:main',
        ],
    },
    package_data={
        'src': ['data/*.csv'],
    },
    author="Davis & Claude",
    description="A simple desktop widget showing inspirational quotes",
    python_requires=">=3.8",
)