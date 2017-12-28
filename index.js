const fs = require('fs');
const https = require('https');

let url = fs.readFileSync('./input.txt', 'utf8');

if (!url.length) {
  return console.log('No url in input.txt');
}

// remove the line break character if present
if (url.indexOf('\n')) {
  url = url.substring(0, url.length - 1);
}

try {
  https.get(url, res => {
    let text = '';

    res.on('data', c => {
      text += c;
    });

    res.on('end', () => {
      const ind = text.indexOf('data-component-name="App"');
      const start = text.indexOf('>', ind) + 1;
      const end = text.indexOf('</', start);
      let data;
      try {
        data = JSON.parse(text.substring(start, end));
      } catch (e) {
        return console.log('Error: The input address is probably wrong');
      }
      createScript(data);
    });
  });
} catch (e) {
  return console.log('Error:', e.message);
}

function createScript(data) {
  if (!data.course) {
    return console.log(`No free lessons found :(`);
  }

  const d = data.course.course;
  const title = d.title;
  const description = d.description.replace(/`/g, '');
  const instructor = d.instructor.full_name;
  const lessons = d.lessons;
  const url = d.url;

  result = [];

  const readme = `"${title}\nby ${instructor}\n\n${url}\n\n${description}"`;
  const command = `#!/bin/sh\nFOLDER="${title} by ${instructor}"\nmkdir "$FOLDER"\necho ${readme} >> "$FOLDER/README"`;
  result.push(command);

  let lessonCount = 0;

  for (let i in lessons) {
    if (!lessons[i].media_urls) {
      continue;
    }
    const title = lessons[i].title;
    const url = lessons[i].media_urls.hls_url;

    result.push(
      `ffmpeg -i ${url} -c copy "$FOLDER/${+i + 1 < 10 ? 0 : ''}${+i +
        1} - ${title}.mkv"`
    );
    lessonCount++;
  }

  if (!lessonCount) {
    return console.log(`No free lessons found :(`);
  }

  fs.writeFileSync('script.sh', result.join('\n'), { mode: 0777 });
  console.log(
    `Script successfully created (${lessonCount} lesson${
      lessonCount == 1 ? '' : 's'
    })!`
  );
}
