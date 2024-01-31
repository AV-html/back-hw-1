import { Router } from "express";
import {
  ICreateVideoReq,
  IUpdateVideoReq,
  IVideoDbType,
  RequestParamsBody,
  RequestWithBody,
  RequestWithParams
} from "../types";
import { videos } from "../settings";
import { validationVideo } from "../validators";

export const videosRouter = Router({})

videosRouter.get('/', (req, res) => {
  res.send(videos)
})

videosRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res) => {
  const id = +req.params.id
  const video = videos.find((video) => video.id === id)

  if (!video) {
    res.sendStatus(404)
    return
  }
  res.send(video)
})

videosRouter.post('/', (req: RequestWithBody<ICreateVideoReq>, res) => {
  const {title, author, availableResolutions = []} = req.body

  const errors = validationVideo(title, author, availableResolutions)

  if (errors.errorsMessages.length) {
    res.status(400).send(errors)
    return
  }

  const createdAt = new Date()
  const publicationDate = new Date()
  publicationDate.setDate(createdAt.getDate() + 1)

  const newVideo: IVideoDbType = {
    id: +publicationDate,
    availableResolutions,
    canBeDownloaded: false,
    createdAt: createdAt.toISOString(),
    minAgeRestriction: null,
    publicationDate: publicationDate.toISOString(),
    title,
    author,
  }

  videos.push(newVideo)

  res.status(201).send(newVideo)
})

videosRouter.put('/:id', (req: RequestParamsBody<IUpdateVideoReq>, res) => {
  const id = +req.params.id

  const {
    title,
    author,
    availableResolutions = [],
    canBeDownloaded,
    minAgeRestriction,
    publicationDate
  } = req.body

  const errors = validationVideo(title, author, availableResolutions)
  if (!minAgeRestriction || typeof minAgeRestriction !== 'number' || minAgeRestriction > 18 || minAgeRestriction < 1) {
    errors.errorsMessages.push({
      field: 'minAgeRestriction',
      message: 'Invalid author'
    })
  }

  videos.forEach((video) => {
    if (video.id === id) {

    }
  })

  const video = videos.find(video => video.id === id)

  if (!video) {
    res.sendStatus(404)
    return
  }

  video.title = title
  video.author = author
  video.availableResolutions = availableResolutions
  canBeDownloaded && (video.canBeDownloaded = canBeDownloaded)
  minAgeRestriction && (video.minAgeRestriction = minAgeRestriction)
  publicationDate && (video.publicationDate = publicationDate)

  res.sendStatus(204)
})

videosRouter.delete('/:id', (req: RequestWithParams, res) => {
  const id = +req.params.id

  const indexVideo = videos.findIndex((video) => video.id === id)

  if (indexVideo === -1) {
    res.sendStatus(404)
    return
  }

  videos.splice(indexVideo, 1)

  res.sendStatus(204)
})
