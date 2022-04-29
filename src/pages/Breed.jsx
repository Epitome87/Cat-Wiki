import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// const cat = {
//   name: 'Bengal',
//   description:
//     "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first time-cat owners.",
//   temperament: ['Alert', 'Agile', 'Energetic', 'Demanding', 'Intelligent'],
//   origin: 'United States',
//   life_span: '12 - 15 years',
//   adaptability: 5,
//   affection_level: 5,
//   child_friendly: 4,
//   grooming: 1,
//   intelligence: 5,
//   health_issues: 3,
//   social_needs: 5,
//   stranger_friendly: 3,
//   photos: ['', '', '', '', '', ''],
// };

function Breed() {
  const [cat, setCat] = useState(null);

  const { id: breedID } = useParams();
  console.log(breedID);

  const fetchBreedInfo = async () => {
    const breedRes = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${breedID}`, {
      headers: {
        'x-api-key': 'c20f0b07-88d0-4583-838f-fd80fe8a563d',
      },
    });

    const breedData = await breedRes.data[0];

    const imageRes = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${breedID}&limit=8`, {
      headers: {
        'x-api-key': 'c20f0b07-88d0-4583-838f-fd80fe8a563d',
      },
    });

    const imageData = await imageRes.data;

    console.log('IMAGE', imageRes.data);

    setCat({ ...breedData, photos: imageData });
  };

  useEffect(() => {
    fetchBreedInfo();
  }, []);

  console.log('Cat', cat);
  if (!cat) return <div>Fetching Cat information...</div>;

  return (
    <div>
      <img
        src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
        alt={`${cat.name}`}
        width={250}
        height={250}
      />
      <h1>{cat.name}</h1>
      <p>{cat.description}</p>
      <div>
        <div>Temperament:</div>
        {cat.temperament &&
          cat.temperament.split(', ').map((temp) => {
            return <div>{temp}</div>;
          })}
      </div>
      <div>
        <div>Life Span:</div>
        <div>{cat.life_span}</div>
      </div>
      <div>
        <div>Adaptability:</div>
        <div>{cat.adaptability}</div>
      </div>
      <div>
        <div>Affection Level:</div>
        <div>{cat.affection_level}</div>
      </div>
      <div>
        <div>Child Friendly:</div>
        <div>{cat.child_friendly}</div>
      </div>
      <div>
        <div>Grooming:</div>
        <div>{cat.grooming}</div>
      </div>
      <div>
        <div>Intelligence:</div>
        <div>{cat.intelligence}</div>
      </div>
      <div>
        <div>Health Issues:</div>
        <div>{cat.health_issues}</div>
      </div>
      <div>
        <div>Social Needs:</div>
        <div>{cat.social_needs}</div>
      </div>
      <div>
        <div>Stranger Friendly:</div>
        <div>{cat.stranger_friendly}</div>
      </div>

      <h2>Other Photos</h2>
      {cat.photos.map((photo) => {
        return <img src={photo.url} alt={cat.name} width={250} height={250} key={photo.id} />;
      })}
    </div>
  );
}

export default Breed;
