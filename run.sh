#!/bin/sh

# add authentication
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# change working directory to current one
cd ~/Desktop/nyt-sudoku/

# first, run Python script that collects NYT sudoku data
python3 data-collection/run.py

# this changes the CSV files within data-collection/
# push changes
git add .
git commit -m 'uploading latest sudoku files'
git push
sleep 10
