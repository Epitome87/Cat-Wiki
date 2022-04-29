import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Breeds() {
  const [breeds, setBreeds] = useState(null);

  const fetchBreedInfo = async () => {
    const res = await axios.get('https://api.thecatapi.com/v1/breeds/', {
      headers: {
        'x-api-key': 'c20f0b07-88d0-4583-838f-fd80fe8a563d',
      },
    });

    const resData = await res.data;

    const transformedData = resData.map((breed) => {
      // return { id: breed.id, name: breed.name, image: breed.image };
      return { id: breed.id, name: breed.name };
    });

    setBreeds(transformedData);
  };

  useEffect(() => {
    fetchBreedInfo();
  }, []);

  if (!breeds) return <div>Fetching List of Cat Breeds...</div>;

  return (
    <div>
      <h1>List of Cat Breeds</h1>
      {breeds.map((breed) => {
        return (
          <Link to={`/breeds/${breed.id}`} key={breed.id}>
            {/* {breed.image && <img src={breed.image.url} alt={breed.name} width={50} height={50} />} */}
            <p>{breed.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Breeds;
