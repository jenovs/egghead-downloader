A simple scraper to create a script for downloading free videos from egghead.  
Has no external dependencies (i.e. no need to `npm install` anything).

Script requires `ffmpeg` to download the videos.  
[Download ffmpeg](https://www.ffmpeg.org/download.html)

## Usage

Clone the repo.

Paste the course URLs into `input.txt` (one url per line).

> If you only have one url you can provide it as a command line argument:
>
> ```
> $ node index.js https://egghead.io/lesson/url
> ```

In terminal navigate to the project folder and run `node index.js`.

The file `scriptN.sh` will be created, where `N` is 0, 1, 2 etc.

Copy the `script.sh` to a desired location.

Run the script to start download:  
`$ ./script.sh`

The script will create a folder named after the course and download the videos.
