import React, { FC } from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export const DogCard: FC<Dog> = ({ img, name, age, zip_code, breed }) => {
  return (
    <div className="dog-card">
      <div className="dog__photo">
        <img src={img} alt={name} />
      </div>
      <h3>{name}</h3>
      <span>Age: {age}</span>
      <span>Breed: {breed}</span>
      <p>ZipCode: {zip_code}</p>
    </div>
  );
};
