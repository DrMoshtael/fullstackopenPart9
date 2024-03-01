interface CoursePart {
    name: string,
    exerciseCount: number
}

const Content = ({parts}: {parts:CoursePart[]}) => (
    <div>
        {parts.map(c => 
            <p key={c.name}><strong>{c.name}</strong> has {c.exerciseCount} exercises</p>)}
    </div>
)

export default Content