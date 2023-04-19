# What is this repo?
I've always loved doing the sudoku. Doing it over and over and recording my time over the years has made me wonder how I can get faster at solving the puzzle. Enter analytics.

For this project, I created a browser extension that tracks how the NYT sudoku grid is filled out. Thie repo also contains a SQLite3 database tracking daily NYT sudoku grids and my sudoku performance from the extension.

This repo is divided into a few sections:

## data-collection
This repo contains all the files necessary for data collection. It includes the Flask server, browser extension, SQLite3 database, original CSV files (from when I first started this project in grad school) and more.

**A note on the Flask server:** Everytime I completed a sudoku, the browser extension would send a POST request to the Flask API with my sudoku performance as its payload. The Flask server would then add this record to ```nyt-sudoku.db```. Everything is automatically added to GitHub by my Raspberry Pi (the magic of cron jobs).

## data-analysis
All the files in here are primarily to analyze my sudoku performance. Here you'll find Jupyter notebooks and each Python function's JavaScript counterpart.
