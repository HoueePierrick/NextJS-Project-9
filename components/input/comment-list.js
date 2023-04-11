import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((e, i) => {
        return (
          <li key={e.id}>
            <p>{e.text}</p>
            <div>
              By <address>{e.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
// mongodb+srv://phouee:<password>@clustertestph.lyjon.mongodb.net/?retryWrites=true&w=majority
