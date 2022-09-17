import style from './User.module.scss';

type UserProps = {
    id: number
    name: string
    mail: string
}

export function User(props: UserProps) {
    return (
        <div className={style.user}>
        <p><b>id</b>: {props.id}</p>
        <p><b>name</b>: {props.name}</p>
        <p><b>mail</b>: {props.mail}</p>
        </div>
    )
}