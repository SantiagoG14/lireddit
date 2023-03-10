import { Post } from "../entities/Post"
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql"
import { MyContext } from "../types"

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {})
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Arg("_id", () => Int) _id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { _id })
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, { title })
    await em.persistAndFlush(post)
    return post
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("_id") _id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { _id })
    if (!post) {
      return null
    }

    if (typeof title !== "undefined") {
      post.title = title
      await em.persistAndFlush(post)
    }

    return post
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("_id") _id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { _id })
    } catch {
      return false
    }
    return true
  }
}
