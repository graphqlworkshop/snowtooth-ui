import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

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

const SET_LIFT_STATUS_MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      changed
      lift {
        id
        name
        status
      }
    }
  }
`;

export default function App() {
  const { loading, data } = useQuery(ALL_LIFTS_QUERY);
  const [setStatus] = useMutation(SET_LIFT_STATUS_MUTATION);

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
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>
                  <StatusIndicator
                    status={lift.status}
                    onSelect={status =>
                      setStatus({
                        variables: {
                          id: lift.id,
                          status
                        }
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

const StatusIndicator = ({ status = "CLOSED", onSelect = f => f }) => (
  <>
    <Circle
      color="green"
      selected={status === "OPEN"}
      onClick={() => onSelect("OPEN")}
    />
    <Circle
      color="yellow"
      selected={status === "HOLD"}
      onClick={() => onSelect("HOLD")}
    />
    <Circle
      color="red"
      selected={status === "CLOSED"}
      onClick={() => onSelect("CLOSED")}
    />
  </>
);

const Circle = styled.div`
  border-radius: 50%;
  background-color: ${({ color, selected }) =>
    selected ? color : "transparent"};
  border: solid 2px ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? "0" : "2")};
  width: 20px;
  height: 20px;
  cursor: pointer;
  float: left;
  margin: 0 4px;
`;
