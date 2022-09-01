import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useAppSelector } from '../store';
import { ThemeEnums } from '../shared/constants/theme-enums';
import { useDispatch } from 'react-redux';
import { setTheme } from '../reducers/ThemeReducer';
const NavBar = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('theme', 'light');
  }, []);

  const handleSwitchTheme = () => {
    switch (theme) {
      case ThemeEnums.LIGHT:
        dispatch(setTheme(ThemeEnums.DARK));
        document.documentElement.setAttribute('theme', 'dark');
        break;
      case ThemeEnums.DARK:
        dispatch(setTheme(ThemeEnums.LIGHT));
        document.documentElement.setAttribute('theme', 'light');
        break;
      default:
        return null;
    }
  };

  return (
    <div className={'navbar_section'}>
      <NavLink to={'/translate'} className={({ isActive }) => (isActive ? 'navbar_links' : 'navbar_links_passive')}>
        Translate
      </NavLink>
      <NavLink to={'/history'} className={({ isActive }) => (isActive ? 'navbar_links' : 'navbar_links_passive')}>
        History
      </NavLink>
      <span onClick={handleSwitchTheme} className="switch-theme">
        {theme === ThemeEnums.LIGHT ? '🌚' : '🌝'}
      </span>
    </div>
  );
};

export default NavBar;
