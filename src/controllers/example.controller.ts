import { Request, Response } from 'express'
import ExampleSchema, { Example } from '@schemas/Example'

export const controller = ({
  readAll,
  readOne,
  createOne,
  updateOne
})

async function readAll (req: Request, res: Response): Promise<Response> {
  try {
    const examples = await ExampleSchema.find({})
    return res.json(examples)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

async function readOne (req: Request, res: Response): Promise<Response> {
  try {
    const example = await ExampleSchema.findById(req.params.id)
    return res.json(example)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

async function createOne (req: Request, res: Response): Promise<Response> {
  try {
    const example = await ExampleSchema.create(req.body)
    return res.json(example).status(201)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}

async function updateOne (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const example = await ExampleSchema.findById(id)
    const modifiedExample = <Example>{ ...example, ...req.body }
    const updatedExample = await ExampleSchema.findByIdAndUpdate(id, {
      name: modifiedExample.name,
      value: modifiedExample.value
    })
    return res.json(updatedExample).status(200)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
