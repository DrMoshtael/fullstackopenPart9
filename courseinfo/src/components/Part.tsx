import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({part}:{part:CoursePart}) => {
    let nonBase;
    switch (part.kind) {
        case "basic":
            nonBase = (
                <p><i>{part.description}</i></p>
            );
            break;
        case "group":
            nonBase = (
                <p>Number of group project: {part.groupProjectCount}</p>
            )
            break;
        case "background":
            nonBase = (
                <div>
                    <p><i>{part.description}</i></p>
                    <p>Background material: {part.backgroundMaterial}</p>
                </div>
            )
            break;
        case "special":
            nonBase = (
                <div>
                    <p><i>{part.description}</i></p>
                    Requirements: 
                    <ul>{part.requirements.map((r,index) => <li key={index}>{r}</li>)}</ul>
                </div>
            )
            break;
        default:
            return assertNever(part);
    }
    return (
        <div>
            <h3>{part.name}</h3>
            <p>Number of exercises: {part.exerciseCount}</p>
            {nonBase}
        </div>
    )
};

export default Part;