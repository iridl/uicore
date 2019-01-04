import csv, json, random
from geojson import Feature, FeatureCollection, Point

def coord(s):
   if s[-1:] in ['N','S','W','E']:
      n = s[:-1]
      d = s[-1:]
   else:
      n = s
      d = ''
   return float(n) * (1.0 if d in ['N','E',''] else -1.0) + (random.random() * 2 - 1.0)

features = []
with open('africa1.tsv') as csvfile:
    reader = csv.reader(csvfile, delimiter='\t')
    for code, country, elevation, latitude, longitude, station in reader:
        latitude, longitude = map(coord, (latitude, longitude))
        elevation = (None if elevation=="" else float(elevation))
        features.append(
            Feature(
                geometry = Point((longitude, latitude)),
                properties = {
                    'countryCode': int(code),
                    'country': country.capitalize(),
                    'elevation': elevation,
                    'station': station.capitalize(),
                }
            )
        )

collection = FeatureCollection(features)
with open("africa1.geojson", "w") as f:
    f.write('%s' % collection)

