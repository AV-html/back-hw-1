import express from 'express'
import { IVideoDbType } from "./types";
import { videosRouter } from "./routes/videos-router";

export const app = express()

app.use(express.json()) // Для получения доступа к body (Иначе на POST запросе body будет undefined)

export const ResolutionsList = [
  "P144",
  "P240",
  "P360",
  "P480",
  "P720",
  "P1080",
  "P1440",
  "P2160"
]
export const videos: IVideoDbType[] = [
  {
    id: 0,
    title: '',
    author: '',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: '2023-12-04T16:26:14.200Z',
    publicationDate: '2023-12-04T16:26:14.200Z',
    availableResolutions: [
      "P144"
    ]
  }
]


app.delete('/testing/all-data', (req, res) => {
  videos.length = 0
  res.sendStatus(204)
})

app.use('/videos', videosRouter)
