/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from "@keystone-6/core";

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  checkbox,
} from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from "@keystone-6/fields-document";

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";
import { isAdmin, isSignedIn, isUsersItem } from "./access";

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      answers: relationship({ ref: "Answer.user", many: true }),
      isAdmin: checkbox(),
    },
    access: {
      operation: {
        query: () => true,
        create: () => true,
        delete: isAdmin,
      },
      filter: {
        update: isUsersItem,
      },
    },
    ui: {
      labelField: "name",
      listView: {
        initialColumns: ["name", "email"],
      },
    },
  }),
  Question: list({
    fields: {
      question: text({ validation: { isRequired: true } }),
      type: relationship({ ref: "Type.question" }),
      answer: relationship({ ref: "Answer.question", many: true }),
    },
    access: {
      operation: {
        query: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    ui: {
      labelField: "question",
      listView: {
        initialColumns: ["question"],
      },
    },
  }),
  Type: list({
    fields: {
      type: integer({ validation: { isRequired: true } }),
      subheading: text(),
      description: text({ ui: { displayMode: "textarea" } }),
      question: relationship({ ref: "Question.type", many: true }),
    },
    access: {
      operation: {
        query: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    ui: {
      labelField: "type",
      listView: {
        initialColumns: ["type", "subheading"],
      },
    },
  }),
  Answer: list({
    fields: {
      answer: integer({ validation: { isRequired: true } }),
      user: relationship({ ref: "User.answers" }),
      question: relationship({ ref: "Question.answer" }),
    },
    access: {
      operation: {
        query: isSignedIn,
        create: isSignedIn,
        update: isUsersItem,
        delete: isUsersItem,
      },
    },
    ui: {
      labelField: "answer",
      listView: {
        initialColumns: ["answer", "user", "question"],
      },
    },
  }),
};
