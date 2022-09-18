import style from './MiniCard.module.scss';
import star from '../../assets/img/star.svg';

interface Props {
  children: React.ReactNode;
  type: 'star' | 'box';
  active?: boolean;
}

export function MiniCard({ children, active, type }: Props) {
  return type === 'box' ? (
    <div className={style.miniCard}>
        <span className={`${style.miniCardTop} ${style[type]} ${active === true ? 'active' : ''}`}>
            {children}
        </span>
    </div>
  ) : (
    <div className={style.miniCardStar}>
        <img src={star} alt='today-astro-focus-kit'/>
        <p>{children}</p>
    </div>
  );
}
