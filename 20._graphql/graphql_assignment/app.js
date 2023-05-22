import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from 'fs';

const typeDefs = fs.readFileSync('schema.graphql', 'utf-8');

const blogs = [
  { id: '1', title: 'Blog about Apples', description: 'Apples are fruits', completed: false, ownerId: '1' },
  { id: '2', title: 'Blog about Animals', description: 'There are many animals in the world', completed: true, ownerId: '2' },
];

const users = [
  { id: '1', email: 'user1@example.com', password: 'password1' },
  { id: '2', email: 'user2@example.com', password: 'password2' },
];

const resolvers = {
  Query: {
    blogs: () => {
      return { blogs };
    },
    blog: (parent, args) => {
      const { blogId } = args;
      const blog = blogs.find(blog => blog.id === blogId);
      if (!blog) {
        return { errors: ['Blog not found'] };
      }
      return { blog };
    },
  },
  Mutation: {
    createBlog: (parent, args) => {
      const { title, description } = args;
      const newBlog = {
        id: String(blogs.length + 1),
        title,
        description,
        completed: false,
        ownerId: '1', 
      };
      blogs.push(newBlog);
      return { id: newBlog.id };
    },
    createUser: (parent, args) => {
      const { email, password } = args;
      const newUser = {
        id: String(users.length + 1),
        email,
        password,
      };
      users.push(newUser);
      return { id: newUser.id };
    },
    createToken: (parent, args) => {
      const { email, password } = args;
      const user = users.find(user => user.email === email && user.password === password);
      if (!user) {
        return { errors: ['Invalid email or password'] };
      }
      return { token: 'sampleToken' };
    },
  },
  Subscription: {
    reviewBlog: {
      subscribe: (parent, args) => {
        const { token } = args;
        //TODO
      },
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);


//Query example for all blogs
/*
query {
  blogs {
    blogs {
      id
      title
      description
      completed
      ownerId
    }
  }
}

*/

//Query example for single blog
/*
query GetBlog($blogId: ID!) {
  blog(blogId: $blogId) {
    errors
    blog {
      id
      title
      description
      completed
      ownerId
    }
  }
}

//Variable
{
  "blogId": "1"
}

*/

//Query example with mutation

/*
mutation CreateBlog($title: String!, $description: String!) {
  createBlog(title: $title, description: $description) {
    errors
    id
  }
}


//Variables
{
  "title": "Title",
  "description": "Description"
}

*/