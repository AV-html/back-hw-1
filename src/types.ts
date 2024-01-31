import { ResolutionsList } from "./settings";
import { Request } from "express";

export type TResolutionsArray = typeof ResolutionsList

export interface IVideoDbType {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number | null
  createdAt: string
  publicationDate: string
  availableResolutions: TResolutionsArray
}

export interface ICreateVideoReq {
  title: string
  author: string
  availableResolutions?: TResolutionsArray
}

export interface IUpdateVideoReq {
  title: string,
  author: string,
  availableResolutions?: TResolutionsArray,
  canBeDownloaded?: boolean,
  minAgeRestriction?: number,
  publicationDate?: string
}

export interface IErrorMessage {
  message: string
  field: string
}
export interface IErrors {
  errorMessages: IErrorMessage[]
}

export type RequestWithParams<P = {id: string}> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>

export type RequestParamsBody<B, P = {id: string}> = Request<P, {}, B, {}>
