import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/action';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector((state: RootState) => state.rental.authorizationStatus);
  const userInfo = useSelector((state: RootState) => state.rental.userInfo);
  const favoriteCount = useSelector((state: RootState) => state.rental.favorites.length);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFavoritesClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate('/favorites');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active" href="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === 'AUTH' && userInfo? (
                <>
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      onClick={handleFavoritesClick}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={userInfo.avatarUrl} alt="User avatar" />
                      </div>
                      <span className="header__user-name user__name">
                        {userInfo.email}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteCount}
                      </span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/login">
                    <span className="header__signin">Sign in</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
