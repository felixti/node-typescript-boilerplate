import { InputType, Field } from 'type-graphql'
import { Example } from '@schemas/example.schema'

@InputType()
export class ExampleInput implements Partial<Example> {
  @Field()
  name: string;

  @Field({ nullable: true })
  value?: string;

  @Field({ nullable: true })
  dateExample?: Date;
}
