import { User } from "../entities/User"
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql"
import { MyContext } from "src/types"
import argon2 from "argon2"

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string
  @Field()
  password: string
}

// @ObjectType()
// class UserReturn {
//     @Field()
//     createdAt: Date

//     @Field()
// }

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password)
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    })
    await em.persistAndFlush(user)
    return user
  }

  @Mutation(() => User)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOne(User, { username: options.username })
    // if(!user) {
    //     return {
    //         errors: [{name: }]
    //     }
    // }

    return user
  }
}
