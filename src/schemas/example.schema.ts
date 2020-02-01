import { ObjectId } from 'mongodb'
import { ObjectType, Field, Int } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'

@ObjectType()
export class Example {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true, trim: true })
  name: string

  @Field()
  @Property({ trim: true })
  value?: string

  @Field()
  @Property()
  dateExample?: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(type => Int)
  examplesCount: number
}

export const ExampleSchema = getModelForClass(Example, { schemaOptions: { timestamps: true } })
