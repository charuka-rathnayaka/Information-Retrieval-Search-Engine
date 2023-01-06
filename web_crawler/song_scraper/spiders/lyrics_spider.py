import scrapy
import re
CLEANR = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')


class LyricsSpiderSpider(scrapy.Spider):
    name = 'lyrics_spider'
    allowed_domains = ['lyricslk.com']
    # start_urls = ['https://lyricslk.com/lyrics/artist/17-kasun-kalhara.html']
    start_urls = ['https://lyricslk.com/search.php?q=2&by=forArtist&page=3']

    def cleanhtml(self,raw_html):
        cleantext = re.sub(CLEANR, '', raw_html)
        return cleantext

    def parse(self, response):
        songurls = response.css('div.ResTitleSin a::attr("href")')
        for songurl in songurls:
            yield response.follow(songurl.get(), callback=self.parse_songs)

    def parse_songs(self,response):
        songs = response.css('#lyricsViewer')
        for song in songs:
            lyrics = song.css('#lyricsBody').get()
            cleanedLyrics = self.cleanhtml(lyrics)

            yield {
                'name': song.css('#lyricsTitle h2::text').get(),
                'lyrics':cleanedLyrics
            }

