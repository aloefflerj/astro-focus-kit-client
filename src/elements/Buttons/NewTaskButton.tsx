// import style from '../../components/Card/MiniCard.module.scss';
// import cardStyle from '../../components/Card/Card.module.scss';
import { MiniCard } from "../../components/Card/MiniCard";

export function NewTaskButton() {
    return <MiniCard type="button" active={false}>
        +
    </MiniCard>
}