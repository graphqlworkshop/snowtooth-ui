import {
  gql,
  useQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { StatusIndicator } from "./StatusIndicator";

const QUERY = gql`
  query AllLifts {
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

const MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription {
    liftStatusChange {
      id
      status
    }
  }
`;

export function App() {
  const { loading, data } = useQuery(QUERY);
  const [setStatus] = useMutation(MUTATION);
  useSubscription(SUBSCRIPTION);

  if (loading) return <p>loading lifts</p>;

  return (
    <section>
      <h1>Snowtooth Lift Status</h1>

      {data && !loading && (
        <table className="lifts">
          <thead>
            <tr>
              <th>Lift Name</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allLifts.map((lift) => (
              <tr key={lift.id}>
                <td>{lift.name}</td>
                <td>
                  <StatusIndicator
                    status={lift.status}
                    onChange={(status) =>
                      setStatus({
                        variables: {
                          id: lift.id,
                          status,
                        },
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
