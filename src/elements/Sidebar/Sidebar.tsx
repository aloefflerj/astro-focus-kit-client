import { NavLink } from 'react-router-dom';
import { Option } from './Option';
import { Card } from '../../components/Card/Card';

import characterImg from '../../assets/char.png'
import style from './Sidebar.module.scss';

export function Sidebar() {
  return (
    <aside className={style.sidebar}>
      <ul>
        <div className={style.sidebarChunk}>
          <li>
            <NavLink to='/planet'>
                <Card color='optionPlanetColor'>
                    <img src={characterImg} alt="sd"/>
                </Card>
            </NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>
              <Option title='Tasks' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/journal'>
              <Option title='Journal' />
            </NavLink>
          </li>
        </div>
        {/* <li><NavLink to='/'><Card /></NavLink></li>
                <li><NavLink to='/login'>login</NavLink></li>
                <li><NavLink to='/register'>register</NavLink></li>
                <li><NavLink to='/note'>note</NavLink></li> */}
        <div className={style.sidebarChunk}>
          <li>
            <NavLink to='/settings'>
              <Option title='Settings' />
            </NavLink>
          </li>
          <li>
            <NavLink to='/view'>
              <Option title='View' />
            </NavLink>
          </li>
        </div>
      </ul>
    </aside>
  );
}
