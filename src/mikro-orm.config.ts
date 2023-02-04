import { __prod__ } from "./constants"
import path from "path"
import { MikroORM } from "@mikro-orm/core"

export default {
  entities: ["./dist/entities"],
  entitiesTs: ["./src/entities"],
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}",
  },
  dbName: "postgres",
  debug: !__prod__,
  type: "postgresql",
  password: "s#1014907",
} as Parameters<typeof MikroORM.init>[0]
