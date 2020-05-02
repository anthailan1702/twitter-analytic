from auth2 import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET
import os
import json
import sys
from datetime import datetime

import tweepy
import couchdb
from dotenv import load_dotenv
load_dotenv()

SERVER_URL = os.getenv("COUCHDB_URL") or 'http://localhost:5984'
DB_USER = os.getenv("COUCHDB_USER") or 'admin'
DB_PASSWD = os.getenv("COUCHDB_PASSWORD") or 'password'
DB = os.getenv("DB_NAME") or 'austweetsdb'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

filter_terms = ['covid19', 'coronavirus', 'quarantine2020', 'stayhome', 'quarantine', 'self isolation']
AUS_GEO_CODE = [112.46,-44.37,153.53,-10.62]


try:
    server = couchdb.Server(SERVER_URL)
    server.resource.credentials = (DB_USER, DB_PASSWD)
    print("Connected to server")
except:
    print("Cannot find CouchDB Server ... Exiting\n")
    raise

try:
    db = server.create(DB) 
    print("Created new database ", db)
except couchdb.http.PreconditionFailed:
    db = server[DB]
    print("Server database exists. Writing to ", db)


class StreamListener(tweepy.StreamListener):
    def __init__(self, db):
        self.db = db
        self.tweet_count = 0
        self.received_friend_ids = False

    def on_connect(self):
        print("Connected to the Twitter API")
    
    def on_error(self, status_code):
        if status_code != 200:
            print("Error: disconnecting from the Twitter API")
            return False
    def on_timeout(self):
        print(sys.stderr, "Timeout...")
        return True

    def on_data(self, data):
        try:
            tweet_data = json.loads(data)
            if tweet_data["place"] is not None and tweet_data["place"]["country_code"] == "AU":
                if 'id_str' in tweet_data:
                    tweet_data['_id'] = tweet_data["id_str"]
                else:
                    pass
                db.save(tweet_data)
        except Exception as e:
            print("Error loading tweet ", e)
        

stream = tweepy.Stream(auth, StreamListener(DB), timeout=120) 
try:
    stream.filter(locations=AUS_GEO_CODE)  
except Exception as e:
    print (sys.stderr, "Error: '%s' '%s'" % (str(datetime.now()), str(e)))
except KeyboardInterrupt:
    print("Stopped")
finally:
    print (sys.stderr, "disconnecting...")
    stream.disconnect()