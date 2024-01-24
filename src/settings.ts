import express from 'express'
import { ICreateVideoReq, IErrors, IVideoDbType, RequestWithBody, RequestWithParams } from "./types";

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
const videos: IVideoDbType[] = [
  {
    id: 0,
    title: '',
    author: '',
    canBeDownloaded: true,
    minAgeRegistration: null,
    createdAt: '2023-12-04T16:26:14.200Z',
    publicationDate: '2023-12-04T16:26:14.200Z',
    availableResolutions: [
      "P144"
    ]
  }
]

app.get('/videos', (req, res) => {
  res.send(videos)
})

app.get('/videos/:id', (req: RequestWithParams<{ id: string }>, res) => {
  const id = +req.params.id
  const video = videos.find((video) => video.id === id)

  if (!video) {
    res.sendStatus(404)
    return
  }
  res.send(video)
})

app.post('/videos', (req: RequestWithBody<ICreateVideoReq>, res) => {
  const errors: IErrors = {
    errorMessages: []
  }

  const {title, author, availableResolutions} = req.body

  if (!title || typeof title !== 'string' ||!title.trim() || title.trim().length > 40) {
    errors.errorMessages.push({
      field: 'title',
      message: 'Invalid title'
    })
  }

  if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
    errors.errorMessages.push({
      field: 'author',
      message: 'Invalid author'
    })
  }

  let totalAvailableResolutions = availableResolutions
  if (availableResolutions && Array.isArray(availableResolutions)) {
    availableResolutions.forEach((resolution) => {
      !ResolutionsList.includes(resolution) && errors.errorMessages.push({
        field: 'availableResolutions',
        message: `Invalid resolution ${resolution}!`
      })
    })
  } else {
    totalAvailableResolutions = []
  }

  if (errors.errorMessages.length) {
    res.status(400).send(errors)
    return
  }

  const createdAt = new Date()
  const publicationDate = new Date()
  publicationDate.setDate(createdAt.getDate() + 1)

  const newVideo: IVideoDbType = {
    id: +publicationDate,
    availableResolutions: totalAvailableResolutions,
    canBeDownloaded: false,
    createdAt: createdAt.toISOString(),
    minAgeRegistration: null,
    publicationDate: publicationDate.toISOString(),
    title,
    author,
  }

  videos.push(newVideo)

  res.status(201).send(newVideo)
})
