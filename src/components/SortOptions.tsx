import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../store/action';
import { RootState, AppDispatch } from '../store';

const SortOptions: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortType = useSelector((state: RootState) => state.rental.sortType);
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (newSortType: string) => {
    dispatch(setSortType(newSortType));
    setIsOpen(false);
  };

  const toggleSortOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onClick={toggleSortOptions}
    >
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use href="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          <li
            className={`places__option ${
              sortType === 'Popular' ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortChange('Popular')}
          >
            Popular
          </li>
          <li
            className={`places__option ${
              sortType === 'Price: low to high' ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortChange('Price: low to high')}
          >
            Price: low to high
          </li>
          <li
            className={`places__option ${
              sortType === 'Price: high to low' ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortChange('Price: high to low')}
          >
            Price: high to low
          </li>
          <li
            className={`places__option ${
              sortType === 'Top rated first' ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortChange('Top rated first')}
          >
            Top rated first
          </li>
        </ul>
      )}
    </form>
  );
};

export default SortOptions;
