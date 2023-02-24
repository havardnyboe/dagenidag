export interface historie {
  year: number;
  content: string;
}

export interface sitat {
  author: string;
  content: string;
}

export function Historie(props: historie) {
  return (
    <div className="historie">
      <span>{props.year}</span>
      <p>{props.content}</p>
    </div>
  );
}

export function Sitat(props: sitat) {
  return (
    <div className="sitat">
      <p>
        {props.content}
        <span>{props.author}</span>
      </p>
    </div>
  );
}
