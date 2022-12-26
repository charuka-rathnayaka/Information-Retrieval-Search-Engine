import scrapy


class LyricsSpiderSpider(scrapy.Spider):
    name = 'lyrics_spider'
    allowed_domains = ['lyricslk.com']
    start_urls = ['https://lyricslk.com/lyrics/artist/17-kasun-kalhara.html']

    def parse(self, response):
        songurls = response.css('div.ResTitleSin a::attr("href")')
        for songurl in songurls:
            yield response.follow(songurl.get(), callback=self.parse_songs)

    def parse_songs(self,response):
        songs = response.css('#lyricsViewer')
        for song in songs:
            yield {
                'name': song.css('#lyricsTitle h2::text').get(),
                'lyrics': song.css('#lyricsBody::text').get()
            }

