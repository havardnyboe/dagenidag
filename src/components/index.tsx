import style from "./components.module.sass";

export interface historie {
  year: [num: number, alt?: string];
  content: string;
}

export function historieYear(arr: string[]) {
  const newArr: historie["year"] = [0];
  newArr[0] = Number(arr.shift());
  if (arr.length > 0) newArr.push(" " + arr.shift(), ...arr);
  return newArr;
}

export interface sitat {
  author: string;
  content: string;
}

export function Historie(props: historie) {
  return (
    <section className={style.historie}>
      <span>{props.year}</span>
      <p>{props.content}</p>
    </section>
  );
}

export function Sitat(props: sitat) {
  return (
    <section className={style.sitat}>
      <p>
        {props.content}
        <span>{props.author}</span>
      </p>
    </section>
  );
}
