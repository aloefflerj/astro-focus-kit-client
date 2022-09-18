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
                <Card type='imageOptionCard'>
                    <img src={characterImg} alt="character-img"/>
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
