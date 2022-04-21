import { GraphQLClient, ClientContext } from "graphql-hooks";
import React from 'react'

const client = new GraphQLClient({
  url: 'http://localhost:4000/graphql'
})

type Props = {
  children?: React.ReactNode
}

const GraphqlProvider: React.FC<Props> = (props) => {
  return (
    <ClientContext.Provider value={client}>
      {props.children}
    </ClientContext.Provider>
  )
}

export default GraphqlProvider;
