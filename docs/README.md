# React Rails Refactoring

Utility tools you need to refactor a whole Rails app to a Rails API and a React view.

## railsify Motivation

One common scenario is when you refactor a page which has various Rails objects(models). For example, In React you want to manipulate articles, commenter, and comments in one page. One way is to dispatch ajax requests for various interactions on the page(Update/Delete/Create). In our example, it creates 9 distinct ajax functions.

This solution introduces the following problems
- Too many Rails Route duplication in React
- Logic duplication in Rails if for example, you have more complex
  Controller which manage the authorization
- More crowded actions in Redux

The second approach is to get the benefit of nested attributes in Rails.
A challenge we face is how to convert a normalized or non-normalized
state and send Rails friendly params. `railsify` method converts
React/Redux store data to Rails nested attributes.

## Quick Start

```js
import { railsify } from 'react_rails_params'

const state = {
id: 1,
title: "article title",
articleAuthor: {id: 1, name: "user"},
comments: [
  {id: 1, body: "comment", commenter: {id: 2, name: "commenter"}},
  {id: 2, body: "comment", commenter: {id: 3, name: "commenter"}},
]
}

const railsified = railsify(state, "article", { decamelized: true,
idAssociations: ['commenter']})

// it produces

{
article: {
  id: 1,
  title: "article title",
  article_author_attributes: { id: 1, name: "user" },
  comments_attributes: [
    {id: 1, body: "comment", commenter_id: 2 },
    {id: 2, body: "comment", commenter_id: 3 }
  ]
}
}

```


