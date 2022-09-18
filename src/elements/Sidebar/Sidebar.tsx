import { Link } from 'react-router-dom'

import styles from './Sidebar.module.scss'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <ul>
                <li><Link to='/'>home</Link></li>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/register'>register</Link></li>
                <li><Link to='/tasks'>tasks</Link></li>
                <li><Link to='/planet'>planet</Link></li>
                <li><Link to='/journal'>journal</Link></li>
                <li><Link to='/settings'>settings</Link></li>
                <li><Link to='/note'>note</Link></li>
            </ul>
      </aside>
    )
}