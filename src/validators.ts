import { IErrors, TResolutionsArray } from "./types";
import { ResolutionsList } from "./settings";

export const validationVideo = (title: string, author: string, availableResolutions: TResolutionsArray) => {
  const errors: IErrors = {
    errorsMessages: []
  }

  if (!title || typeof title !== 'string' || !title.trim() || title.trim().length > 40) {
    errors.errorsMessages.push({
      field: 'title',
      message: 'Invalid title'
    })
  }

  if (!author || typeof author !== 'string' || !author.trim() || author.trim().length > 20) {
    errors.errorsMessages.push({
      field: 'author',
      message: 'Invalid author'
    })
  }

  if (availableResolutions && Array.isArray(availableResolutions)) {
    availableResolutions.forEach((resolution) => {
      !ResolutionsList.includes(resolution) && errors.errorsMessages.push({
        field: 'availableResolutions',
        message: `Invalid resolution ${resolution}!`
      })
    })
  }

  return errors
}
