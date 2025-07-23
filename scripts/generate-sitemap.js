import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve } from 'path'

const hostname = 'https://ommateam.com';
const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
];

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream(resolve('public', 'sitemap.xml'));

(async () => {
  for (const page of pages) {
    sitemap.write(page);
  }
  sitemap.end();

  const data = await streamToPromise(sitemap);
  writeStream.write(data.toString());
})();
