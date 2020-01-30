import mongoose, { Document, Schema } from 'mongoose'

export type Example = Document & {
  name: string
  value: string
}

const ExampleSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    value: {
      type: String,
      trim: true
    }
  }, {
    timestamps: true
  })

export default mongoose.model<Example>('Example', ExampleSchema)
