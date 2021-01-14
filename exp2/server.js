const express = require("express");
const {graphqlHTTP} =require('express-graphql');
const {buildSchema} = require("graphql");

const schema = buildSchema(
    `type Query{
        boo:String
    }`
)

const root ={boo:()=>'pranav'}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema:schema,
    rootValue:root
}))

app.listen(4000,()=>{
    console.log("server graphql")
})
