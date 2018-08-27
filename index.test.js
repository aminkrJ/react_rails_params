import { railsify } from './index'

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
    comments: [{
      id: 1,
      user: {
        id: 1,
        name: "Alex"
      }
    }]
  }

  const expected = {
    id: 1,
    user_attributes: {
      id: 1,
      name: "Tom"
    },
    comments_attributes: [
      {
        id: 1,
        user_attributes: {
          id: 1,
          name: "Alex"
        }
      }
    ]
  }

  expect(railsify(article)).toMatchObject(expected)
});
