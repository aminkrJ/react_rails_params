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
