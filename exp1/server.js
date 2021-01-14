const {graphql, buildSchema} = require("graphql");

// initialize the graphql schama
const schema = buildSchema(`
type Query{
    foo:String
}
`)

// rooot resolver
const root = {foo:()=>'GraphQl server'};

graphql(schema, '{foo}', root).then(res=>{
    console.log(res)
})