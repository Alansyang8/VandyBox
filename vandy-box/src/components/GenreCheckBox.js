function GenreCheckBox(props) {
  return (
    <label>
      <input
        type="checkbox"
        onChange={(event) => {
          props.HandleCheckBox(event.target.checked, props.ID);
        }}
      />{" "}
      {props.genre}
    </label>
  );
}

export default GenreCheckBox;
