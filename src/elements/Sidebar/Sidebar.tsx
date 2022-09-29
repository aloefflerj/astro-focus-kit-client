import { NavLink, useNavigate } from 'react-router-dom';
import { Option } from './Option';
import { Card } from '../../components/Card/Card'

import characterImg from '../../assets/img/char.png';
import logoCard from '../../assets/img/star.svg';
import style from './Sidebar.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { MiniCard } from '../../components/Card/MiniCard';

export function Sidebar() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    navigate('/login');
  }
  
  return (
    <aside className={style.sidebar}>
      <ul>
        <div className={style.sidebarChunk}>
          <li>
            <NavLink to='/' end>
              <Card type='logo'>
                <img src={logoCard} alt='astro-focus-kit-logo' />
                <h1>ASTRO FOCUS KIT</h1>
                <img src={logoCard} alt='astro-focus-kit-logo' />
              </Card>
            </NavLink>
          </li>
          <li>
            <NavLink to='/planet'>
              <Card type='planetOption'>
                <img src={characterImg} alt='character-img' />
              </Card>
            </NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>
              <Option title='TASKS' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/journal'>
              <Option title='JOURNAL' />
            </NavLink>
          </li>
        </div>
        <div className={style.sidebarChunk}>
          <li>
            <NavLink to='/settings'>
              <Option title='SETTINGS' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/view' className='someClass'>
              <Option title='VIEW' />
            </NavLink>
          </li>
          <li>
            <a onClick={handleLogout}>
              <Option type='small' title='LOGOUT' />
            </a>
          </li>
        </div>
      </ul>
    </aside>
  );
}
