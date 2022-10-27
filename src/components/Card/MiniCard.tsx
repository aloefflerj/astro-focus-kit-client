import style from './MiniCard.module.scss';
import star from '../../assets/img/star.svg';

interface Props {
  children: React.ReactNode;
  type: 'star' | 'box' | 'button';
  active?: boolean;
}

export function MiniCard({ children, active, type }: Props) {
  switch (type) {
    case 'box': return(
      <div className={style.miniCard} >
          <span className={`${style.miniCardTop} ${style[type]} ${active === true ? 'active' : ''}`}>
              {children}
          </span>
      </div>
    )
    case 'star': return (
      <div className={style.miniCardStar}>
          <img src={star} alt='today-astro-focus-kit'/>
          <p>{children}</p>
      </div>
    )
    case 'button': return (
      <div className={style.miniCardButton}>
          <span className={`${style.miniCardTop} ${style[type]} ${active === true ? 'active' : ''}`}>
              {children}
          </span>
      </div>
    )
  }
}
