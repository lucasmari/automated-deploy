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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
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
  );
};

export default GamesList;
