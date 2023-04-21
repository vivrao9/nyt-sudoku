# Information about data-collection/

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
