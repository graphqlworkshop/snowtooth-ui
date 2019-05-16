import React from 'react'
import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'

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
`

const LIFT_STATUS_MUTATION = gql`
  mutation SetLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      status
    }
  }
`

const Button = styled.div`
    border-radius: 50%;
    background-color: ${props => (props.selected ? props.color : 'none')};
    border: ${props => (props.selected ? 'none' : `solid 2px ${props.color}`)}
    width: 30px;
    height: 30px;
`

const App = () => (
  <Query query={ALL_LIFTS_QUERY}>
    {({ loading, data, error }) => {
      if (error) return `Error! ${error.message}`
      if (loading) return 'Loading...'
      return (
        <section>
          {!loading &&
            data.allLifts.map(lift => (
              <div key={lift.id}>
                <h3>{lift.name}</h3>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <Button
                      selected={lift.status === 'OPEN'}
                      color="green"
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'OPEN' }
                        })
                      }
                    />
                  )}
                </Mutation>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <Button
                      selected={lift.status === 'HOLD'}
                      color="yellow"
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'HOLD' }
                        })
                      }
                    />
                  )}
                </Mutation>
                <Mutation mutation={LIFT_STATUS_MUTATION}>
                  {changeStatus => (
                    <Button
                      selected={lift.status === 'CLOSED'}
                      color="red"
                      onClick={() =>
                        changeStatus({
                          variables: { id: lift.id, status: 'CLOSED' }
                        })
                      }
                    />
                  )}
                </Mutation>
                <h3>Trails</h3>
                <ul>
                  {lift.trailAccess.map(trail => (
                    <li key={trail.id}>{trail.name}</li>
                  ))}
                </ul>
              </div>
            ))}
        </section>
      )
    }}
  </Query>
)

export default App
