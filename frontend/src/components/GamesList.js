import React from 'react';
import Games from './Games';
import { useQuery, gql } from '@apollo/client';

const GAMES_QUERY = gql`
  {
    games {
      id
      name
    }
  }
`;

const GamesList = () => {
  const { loading, error, data } = useQuery(GAMES_QUERY);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      <div className="content-container">
        <h1>Games</h1>
        <div>
          {data && (
            <>
              {data.games.map((games) => (
                <Games key={games.id} games={games} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GamesList;
