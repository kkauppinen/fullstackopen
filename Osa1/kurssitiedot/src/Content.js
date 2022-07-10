import Part from "./Part";

const Content = (props) => {
    return (
        <div>
            <Part data={props.content[0]} />
            <Part data={props.content[1]} />
            <Part data={props.content[2]} />
        </div>
    );
}

export default Content;