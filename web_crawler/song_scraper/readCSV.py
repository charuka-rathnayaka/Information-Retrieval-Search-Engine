import csv
import glob

files = glob.glob("./*.csv")
line_count = 0
data_array = []
for filename in files:
    print(filename)
    with open(filename,encoding='utf-8', errors='ignore') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if (row[0] != 'name'):
                name_singer = row[0].split("-")
                song_name = name_singer[0].strip()
                singer_name = name_singer[1].strip()
                lyrics = row[1].strip()
                u_album =row[2].replace('"', '')
                u_year = row[3].replace('"', '')
                if(len(u_album)>4):
                    album = u_album.strip()
                else:
                    album='unknown'
                if (len(u_year) > 2):
                    year = u_year.strip()
                else:
                    year = 'unknown'

                featured_artists = row[4].split(",")
                featured_artists = [i.strip() for i in featured_artists]
                metaphor_meaning = row[5].split('-')

                metaphor = metaphor_meaning[0].replace('"', '').strip()
                # print(metaphor)
                meaning = metaphor_meaning[1].replace('"', '').strip()
                data_array.append([song_name,singer_name,album,year,featured_artists,lyrics,metaphor,meaning])
                line_count+=1
# for a in data_array:
#     print(a[0],a[1])
#     print(a[4][0])

print("number of songs",line_count)

fieldNames = ['Song Name', 'Singer', 'Album', 'Year', 'Featured Artists', 'Lyrics', 'Metaphor', 'interpretation']

with open('text_corpus.csv', 'w',newline='',encoding='utf-8', errors='ignore') as f:
    # using csv.writer method from CSV package
    write = csv.writer(f)
    write.writerow(fieldNames)
    write.writerows(data_array)

print("Data Saved  ---->  <----")