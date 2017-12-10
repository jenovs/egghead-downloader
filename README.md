A simple scraper to create a script for downloading free videos from egghead.  
Has no external dependencies (i.e. no need to `npm install` anything).

## Usage

Clone the repo.

Paste the course URL into `input.txt`.

In terminal navigate to the project folder and run `node index.js`.

The file `script.sh` will be created.

Copy the `script.sh` to a desired location.

Make it executable with:  
`$ sudo chmod a+x ./script.sh`

Run the script to start download:  
`$ ./script.sh`

The script will create a folder named after the course and download the videos.
