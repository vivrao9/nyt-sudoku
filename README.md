# What is this repo?
I've always loved doing the sudoku. Doing it over and over and recording my time over the years has made me wonder how I can get faster at solving the puzzle. Enter analytics.

For this project, I created a browser extension that tracks how I fill out the NYT sudoku grid. Thie repo also contains a SQLite3 database tracking daily NYT sudoku grids and my sudoku performance from the extension.

This repo is divided into a few sections:

## data-collection
This repo contains all the files necessary for data collection. It includes the Flask server, browser extension, SQLite3 database, original CSV files (from when I first started this project in grad school) and more.

**A note on the Flask server:** Everytime I completed a sudoku, the browser extension would send a POST request to the Flask API with my sudoku performance as its payload. The Flask server would then add this record to ```nyt-sudoku.db```. Everything is automatically added to GitHub by my Raspberry Pi (the magic of cron jobs).

### run.py
This script collects data on the grids from the NYTimes' page. It collects puzzle_id, date, day_of_week, hint, puzzle, and solution. The script then adds this data to the respective SQLite table.

### server.py
This script contains the Flask server. The server listens for my computer's POST request and — when said request is received — the file adds it to the doks_performance table.

### browser-tracker.js
This file contains the browser extensions that tracks how the sudoku grid is filled out. It largely relies on the MutationObserver API and saves changes to two arrays. Once the extension has detected that the grid has been filled out, it creates a POST request with the data being an array. The data is sent to ```server.py``` which is listening at port 8181.

### .csv files
I started a web scraper — ```run.py``` — to collect grid data in 2021 when I was a grad student. An early version of this script would save data to CSV files. I've still retained a copy of the files, just in case. Sometime in April 2023, I added these rows to the database.

### log.txt
Contains logs from ```server.py```

### nyt-sudoku.db
This SQLite3 database contains all the sudoku data. It has four tables:
- **doks_easy:** Contains data for the Times' easy grids
- **doks_medium:** Contains data for the Times' medium grids
- **doks_hard:** Contains data for the Times' hard grids
- **doks_performance:** Contains data on how I fill out that day's easy grid. Data is collected by ```browser-tracker.js``` and sent to this table through ```server.py```

### manifest.json
Contains metadata on ```browser-extension.js```

## data-analysis
All the files in here are primarily to analyze my sudoku performance. Here you'll find Jupyter notebooks and each Python function's JavaScript counterpart.
