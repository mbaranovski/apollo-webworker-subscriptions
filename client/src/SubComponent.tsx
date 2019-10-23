import React, { useState, useEffect } from 'react';
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

const HELLO_SUB = gql`
  subscription {
      helloSub
  }
`;

export const SubComponent: React.FC = () => {

  const {data} = useSubscription(HELLO_SUB);

  return(
    <>
      <div className="bouncy-ball"></div>
    <div>SubComponent: {data && data.helloSub}</div>
      </>
  )
}
