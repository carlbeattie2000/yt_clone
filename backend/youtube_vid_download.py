from pytube import YouTube
from pytube.cli import on_progress
from pymongo import MongoClient
import requests, json, shutil, uuid

fuchsia = '\033[38;2;255;00;255m'  # color as hex #FF00FF
reset_color = '\033[39m'

# url is url of youtube video to download.

def download_youtube(video_list):
    for video in video_list:
      yt = YouTube(video, on_progress_callback=on_progress)

      video_id = uuid.uuid4().hex

      # Download save other data like thumbnails etc

      print(f'\n' + fuchsia + 'Downloading: ', yt.title, '~ viewed', yt.views,
            'times.')

      videoSelected = yt.streams.get_highest_resolution()

      video_full_name = video_id + "." + videoSelected.mime_type.split("video/")[1]

      video_details = getVideoDetails(yt, video_full_name, video_id)
      video_details["mime_type"] = videoSelected.mime_type
      video_details["filesize"] = videoSelected.filesize

      saveToMongoDatabase(video_details)
      
      videoSelected.download('public/video_content/videos', video_full_name)

      print(f'\nFinished downloading:  {yt.title}' + reset_color)


def getVideosList(filePath):
  f = open(filePath)

  data = json.load(f)

  return data["urls"]


def getVideoDetails(video, output_video_name, video_id):
  thumbnail = requests.get(f"https://img.youtube.com/vi/{video.video_id}/mqdefault.jpg", stream=True)
  thumbnail_filename = video_id + ".jpg"

  with open(f"public/video_content/images/{thumbnail_filename}", "wb") as out_file:
    shutil.copyfileobj(thumbnail.raw, out_file)
  del thumbnail

  try:
    captions = video.captions['a.en']

    captions.download(video_id+".srt", True, f"public/video_content/captions/", "")
  except:
    print("no captions found")

  videoDetails = {
    "title": video.title,
    "description": video.description,
    "channel_id": "",
    "views": video.views,
    "author": video.author,
    "length": video.length,
    "uploaded": video.publish_date,
    "v_id": video_id
  }

  return videoDetails

def saveToMongoDatabase(object):
  client = MongoClient("mongodb://localhost:27017")

  db = client["youtube_clone"]

  collection = db["uploads"]

  collection.insert_many([object])

download_youtube(getVideosList("./urls.json"))
