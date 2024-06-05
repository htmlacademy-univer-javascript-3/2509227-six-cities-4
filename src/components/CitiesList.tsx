import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';  
import { setCity } from '../store/action'; 

const CitiesList: React.FC = () => {
  const cities = useSelector((state: RootState) => state.rental.cities); 
  const currentCity = useSelector((state: RootState) => state.rental.city); 
  const dispatch = useDispatch();

  const handleCitySelect = (city: string) => {
    dispatch(setCity(city)); 
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map(city => (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
              onClick={(e) => {
                e.preventDefault(); 
                handleCitySelect(city); 
              }}
              href="#"
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CitiesList;
