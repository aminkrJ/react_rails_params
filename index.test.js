import { railsify, isArrayOfObjects } from './src/index'

describe('isArrayOfObjects', () => {
  it('all are strings', () => {
    const object = ["a", "b"]

    expect(isArrayOfObjects(object)).toBeFalsy();
  })

  it('all are strings', () => {
    const object = ["a", {id: 1, title: "test"}]

    expect(isArrayOfObjects(object)).toBeFalsy();
  })
})

it('array of premitive data', () => {
  const article = {
    id: 1,
    tags: ["test1", "test2", "test3"]
  }

  const expected = {
    id: 1,
    tags: ["test1", "test2", "test3"]
  }

  expect(railsify(article)).toMatchObject(expected)
})

it('with primitive data', () => {
  const article = {
    id: 1,
    title: "test"
  }

  const expected = {
    id: 1,
    title: "test"
  }

  expect(railsify(article)).toMatchObject(expected)
});

it('with null value', () => {
  const article = {
    id: 1,
    title: null
  }

  const expected = {
    id: 1,
    title: null
  }

  expect(railsify(article)).toMatchObject(expected)
});

it('decamelize', () => {
  const article = {
    id: 1,
    userModel: {
      id: 1,
      name: "Tom",
      roleModel: {
        id: 1,
        nameModel: "admin"
      }
    }
  }

  const expected = {
    id: 1,
    user_model_attributes: {
      id: 1,
      name: "Tom",
      role_model_attributes: {
        id: 1,
        name_model: "admin"
      }
    }
  }
  expect(railsify(article, null, { decamelize: true })).toMatchObject(expected)
});

it('with primitive data and root', () => {
  const article = {
    id: 1,
    title: "test"
  }

  const expected = {
    article: {
      id: 1,
      title: "test"
    }
  }

  expect(railsify(article, 'article')).toMatchObject(expected)
});

it('with object', () => {

  const article = {
    id: 1,
    user: {
      id: 1,
      name: "Tom",
      role: {
        id: 1,
        name: "admin"
      }
    }
  }

  const expected = {
    id: 1,
    user_attributes: {
      id: 1,
      name: "Tom",
      role_attributes: {
        id: 1,
        name: "admin"
      }
    }
  }

  expect(railsify(article)).toMatchObject(expected)
});

it('with array', () => {
  const article = {
    id: 1,
    user: {
      id: 1,
      name: "Tom"
    },
    title: "test",
    comments: [{
      id: 1,
      user: {
        id: 1,
        name: "Alex",
        logos: [
          { id: 1 }
        ]
      }
    }, {
      id: 2,
      user: {
        id: 2,
        name: "Dolex"
      }
    }]
  }

  const expected = {
    id: 1,
    user_attributes: {
      id: 1,
      name: "Tom"
    },
    title: "test",
    comments_attributes: [
      {
        id: 1,
        user_attributes: {
          id: 1,
          name: "Alex",
          logos_attributes: [{
            id: 1
          }]
        }
      },
      {
        id: 2,
        user_attributes: {
          id: 2,
          name: "Dolex"
        }
      }
    ]
  }

  expect(railsify(article)).toMatchObject(expected)
});
