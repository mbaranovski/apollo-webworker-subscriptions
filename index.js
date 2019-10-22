const { ApolloServer, gql, PubSub } = require("apollo-server");

const pubsub = new PubSub();
console.log("asd");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Subscription {
    helloSub: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  },
  Subscription: {
    helloSub: {
      subscribe: () => {
        let i = setInterval(() => {
          pubsub.publish("testSub", { helloSub: `elo ${i++}` });
        }, 1000);

        return pubsub.asyncIterator(["testSub"]);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
