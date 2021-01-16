import React from 'react';
import News from './News';
import { useQuery, gql } from '@apollo/client';

const NEWS_QUERY = gql`
  {
    news {
      id
      title
      body
      postedBy {
        name
      }
    }
  }
`;

const NewsList = () => {
  const { loading, error, data } = useQuery(NEWS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error}</p>;

  return (
    <div>
      {data && (
        <>
          {data.news.map((news) => (
            <News key={news.id} news={news} />
          ))}
        </>
      )}
    </div>
  );
};

export default NewsList;
