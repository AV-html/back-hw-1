import { Router } from "express";
import { ICreateVideoReq, IErrors, IVideoDbType, RequestWithBody, RequestWithParams } from "../types";
import { ResolutionsList, videos } from "../settings";

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
  const errors: IErrors = {
    errorMessages: []
  }

  const {title, author, availableResolutions} = req.body

  if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
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
