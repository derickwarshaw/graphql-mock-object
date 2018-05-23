import { runQuery } from "graphql-server-core"
import { inspect } from "util"

import { mockSchema as schema } from "../../graphql-mock-object"

describe("typeDefs", () => {
  describe("Query", () => {
    it("__type should match snapshot", async () => {
      const { data, errors } = await runQuery({
        query: `{
          Query: __type(name: "Query") {
            fields {
              name
              description
              args { name description defaultValue }
              type { name }
            }
          }
        }`,
        schema,
      })

      expect(errors).toBeUndefined()
      expect(data).toMatchSnapshot()
    })
  })

  describe("MockObject", () => {
    it("__type should match snapshot", async () => {
      const { data, errors } = await runQuery({
        query: `{
          MockObject: __type(name: "MockObject") {
            inputFields { name description defaultValue }
            fields {
              name
              description
              args { name description defaultValue }
              type { name }
            }
          }
        }`,
        schema,
      })

      expect(errors).toBeUndefined()
      expect(data).toMatchSnapshot()
    })

    it("should return consistent, random values", async () => {
      const query = `{
        Mock {
          Boolean
          Float
          ID
          Int
          List(length: 2) {
            ID
          }
          Mock {
            ID
          }
          Null
          String
        }
      }`

      const { data, errors } = await runQuery({ query, schema })

      expect(errors).toBeUndefined()
      expect(data).toMatchSnapshot()

      const duplicate = await runQuery({ query, schema })

      expect(duplicate.data).toEqual(data)
    })
  })
})