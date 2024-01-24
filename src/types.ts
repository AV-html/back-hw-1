import { ResolutionsList } from "./settings";
import { Request } from "express";

export type TResolutionsArray = typeof ResolutionsList

export interface IVideoDbType {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRegistration: number | null
  createdAt: string
  publicationDate: string
  availableResolutions: TResolutionsArray
}

export interface ICreateVideoReq {
  title: string
  author: string
  availableResolutions: TResolutionsArray
}

export interface IErrorMessage {
  message: string
  field: string
}
export interface IErrors {
  errorMessages: IErrorMessage[]
}

export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
