import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ALL_LIFTS_QUERY = gql`
  query {
    allLifts {
      id
      name
      status
      capacity
      trailAccess {
        id
        name
      }
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(ALL_LIFTS_QUERY);
  return (
    <section>
      <h1>Snowtooth Lift Status</h1>
      {loading && <p>loading...</p>}
      {data && !loading && (
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map(lift => (
              <tr>
                <td>{lift.name}</td>
                <td>{lift.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
