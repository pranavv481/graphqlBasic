const {ApolloServer, gql} = require("apollo-server");

const posts =[
    {
        id:1,
        title:"Hey Graphql"
    },
    {
        id:2,
        title:"Hey Apollo"
    }
]

const authors = [
    {
        id:1,
        postID:1,
        name:"bob"
    },
    {
        id:2,
        postID:2,
        name:"foo"
    },
]

const schema = gql`
type Query{
    posts: [Post],
    author:[Author]
}

type Post{
    id:Int,
    title:String,
    author:[Author]
}

type Author{
    id:Int,
    postID:Int,
    name:String
}

type Mutation{
    createPost(
        id:Int,
        title:String
    ):Post
}

`;

// root resolver

const rootResolver = {
    Query:{
        posts(){
            return posts;
        },
        author(){
            return authors
        }
    },

    Post:{
        author(parent){
            return authors.filter(author=>author.postID===parent.id)
        }
    },
    Mutation:{
        createPost:(_,args)=>{
            return {id:args.id, title:args.title, }
        }
    }
    
}

// apollo server

const server = new ApolloServer({
    typeDefs:schema,
    resolvers:rootResolver
})

server.listen({port:4000}).then(({url})=>console.log(`server ready on ${url}`))

