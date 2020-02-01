import 'dotenv/config'

import mongoose from 'mongoose'

import { ExampleResolver } from './example.resolver'

import { ExampleSchema } from '@schemas/example.schema'

describe('Example Tests', () => {
  const resolver = new ExampleResolver()

  beforeAll(async () => {
    if (!process.env.DB_HOST) {
      throw new Error('MongoDB server not initialized')
    }

    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await ExampleSchema.deleteMany({})
  })

  it('Given new input should retrieve created examples', async () => {
    const dateExample1 = new Date()
    await resolver.addExample({
      name: 'Felipe Augusto Felix',
      value: 'Teste',
      dateExample: dateExample1
    })

    const dateExample2 = new Date()
    await resolver.addExample({
      name: 'Felipe Augusto Felix',
      value: 'Teste 2',
      dateExample: dateExample2
    })

    const examples = await resolver.examples()

    expect(examples.length).toBe(2)

    expect(examples).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Felipe Augusto Felix', value: 'Teste', dateExample: dateExample1 }),
        expect.objectContaining({ name: 'Felipe Augusto Felix', value: 'Teste 2', dateExample: dateExample2 })
      ])
    )
  })

  it('Given example id should retrieve an example', async () => {
    const dateExample1 = new Date()
    const created = await resolver.addExample({
      name: 'Felipe Augusto Felix',
      value: 'Teste',
      dateExample: dateExample1
    })

    const example = await resolver.example(created._id)

    expect(example).not.toBeNull()

    expect(example).toEqual(
      expect.objectContaining({ _id: created._id, name: created.name, value: created.value, dateExample: created.dateExample })
    )
  })
})
