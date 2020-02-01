import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { Example, ExampleSchema } from '@schemas/example.schema'
import { ObjectIdScalar } from '@graphql/scalars/object-id.scalar'
import { ExampleInput } from './types/example.input'

@Resolver(of => Example)
export class ExampleResolver {
  @Query(returns => [Example])
  async examples (): Promise<Example[]> {
    return ExampleSchema.find({})
  }

  @Query(returns => Example, { nullable: true })
  async example (@Arg('exampleId', type => ObjectIdScalar) exampleId: ObjectId) : Promise<Example | null> {
    const example = ExampleSchema.findById(exampleId)
    return example
  }

  @Mutation(returns => Example)
  async addExample (
    @Arg('example') exampleInput: ExampleInput
  ): Promise<Example> {
    const example = new ExampleSchema({
      ...exampleInput
    } as Example)

    return example.save()
  }

  @Mutation(returns => Example)
  async updateExample (
    @Arg('exampleId') exampleId: ObjectId,
    @Arg('example') exampleInput: ExampleInput
  ): Promise<Example | null> {
    const updated = ExampleSchema.findByIdAndUpdate(exampleId, { ...exampleInput })
    return updated
  }

  @FieldResolver({ nullable: false })
  examplesCount (
    @Root() example: Example
  ) {
    return ExampleSchema.count({})
  }
}
