import style from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  color?: 'optionColor' | 'taskColor' | 'logoColor' | 'weekDayColor' | 'optionPlanetColor';
}

export function Card({ children, color }: Props) {
  let chosenColor = null;

  switch (color) {
    case 'optionPlanetColor':
      chosenColor = style.optionPlanetColor;
      break;
    case 'optionColor':
      chosenColor = style.optionColor;
      break;
    case 'taskColor':
      chosenColor = style.taskColor;
      break;
    case 'logoColor':
      chosenColor = style.logoColor;
      break;
    case 'weekDayColor':
      chosenColor = style.weekDayColor;
      break;
    default:
      chosenColor = style.default;
      break;
  }

  return (
    <div className={style.card}>
      <span className={`${style.cardTop} ${chosenColor} ${color}`}>
        {children}
      </span>
    </div>
  );
}
