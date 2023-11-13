import express from 'express'
import { addPlace, deletePlace, getPlaceById, getPlaces, updatePlace } from '../controllers/place-controller.js'

const placeRouter = express.Router()

placeRouter.get('/', getPlaces)
placeRouter.get('/:id', getPlaceById)
placeRouter.post('/', addPlace)
placeRouter.put('/:id', updatePlace)
placeRouter.delete('/:id', deletePlace)

export default placeRouter