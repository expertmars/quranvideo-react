import React, { useState, useEffect } from "react";
import classes from "./Tag.module.css";
import { useSelector, useDispatch } from "react-redux";
import { generateActions } from "../../store/generate-slice";
import { current } from "@reduxjs/toolkit";
import Button from "./Button";

export default function Tag(props) {
  const dispatch = useDispatch();

  const [valueTags, setValueTags] = useState();
  const [inputRef, setInputRef] = useState();
  const [splittingAt, setSplittingAt] = useState();
  const [cursorPos, setCursorPos] = useState();
  const [tags, setTags] = useState(["hello", "world"]);
  const [unChangedTags, setUnChangedTags] = useState();
  const [editing, setEditing] = useState(); // 0, 1, 2

  // const tags = useSelector((state) => state.generate.arab);

  useEffect(() => {
    setTags(props.defaultTags);

    setUnChangedTags(props.defaultTags);
  }, [props.defaultTags]);

  useEffect(() => {
    if (inputRef) inputRef.focus();
  }, [inputRef]);

  const onChangeHandler = (e) => {
    setValueTags(e.target.value);

    // e.target.selectionStart;

    if (e.key === "Enter") {
      e.preventDefault();
      if (editing == null) {
        // setTags((prevState) => [...prevState, valueTags]);
        console.log("this feature is removed");
      } else {
        // setTags((prevState) => {
        //   const tagsNow = [...prevState];
        //   tagsNow.splice(editing, 1, valueTags);
        //   return tagsNow;
        // });
        console.log("this feature is removed");
      }
      setValueTags("");

      setEditing();
    }

    if (e.key === "Escape") {
      setValueTags("");
      setEditing();
    }
  };

  // const clickHandler = (e) => {
  //   const index = tags.findIndex((tags) => tags === e.target.innerHTML);
  //   const filteredTag = tags.filter((tag) => tags.indexOf(tag) !== index);
  //   setTags(filteredTag);
  //   setEditing(index);
  //   console.log(index);
  //   setValueTags(e.target.innerHTML);
  // };

  const clickHandler = (e) => {
    // creating an array to push into tag (state)
    let tagArray = [...tags];
    // console.log(tags);
    // console.log(e.target.innerHTML);
    // console.log(e.target.textContent);

    // finding the index of clicked tag from tags (state)
    const index = tagArray.findIndex((tags) => tags === e.target.textContent);
    // finding the clicked text with the help of index.
    const tagFind = tagArray.find((tag) => tags.indexOf(tag) === index);

    // replacing the clicked text.
    const tagIndex = tagArray.indexOf(tagFind);
    // if (~tagIndex) {
    //   tagArray[tagIndex] = valueTags;
    // }
    // console.log(tagArray);
    // setTags(tagArray);
    setEditing(index);

    // console.log(tagFind);
    setValueTags(e.target.textContent);
  };

  const onUnFocusHandler = () => {
    console.log("unfocused");
    const splittingAt = inputRef.selectionStart;
    setSplittingAt(splittingAt);
    // setEditing();
  };

  const resetData = () => {
    setEditing(); // This will stop editing.
    setSplittingAt(0);
    setValueTags();
  };

  const splitHandler = () => {
    //   console.log(tags);
    if (!splittingAt) {
      return;
    }
    const length = valueTags.length;
    if (splittingAt === 0 || splittingAt === length) {
      setEditing(); // This will stop editing.

      return;
    }
    // const firstPart = valueTags.substring(0, splittingAt); // dfgf''dg "This is| a car".split('|')

    // const secondPart = valueTags.substring(splittingAt, length);

    const res = valueTags.substring(0, splittingAt) + "|" + valueTags.substring(splittingAt, length);
    console.log(res + " =============================================================================================");

    // const res = "fd|sf";
    const splitted = res.split("|");
    console.log(splitted);

    // const splitted = [firstPart, secondPart];

    if (props.arabic) {
      splitted.reverse();
    }

    //  console.log(splitted);

    setEditing(); // This will stop editing.

    const tagsNow = [...tags];

    tagsNow.splice(editing, 1, ...splitted); // splice(0)

    console.log(tagsNow);

    props.mode === "arab" && dispatch(generateActions.splitArab({ tags: tagsNow, index: props.currentIndex }));
    props.mode === "english" && dispatch(generateActions.splitEng({ tags: tagsNow, index: props.currentIndex }));
    props.mode === "local" && dispatch(generateActions.splitLocal({ tags: tagsNow, index: props.currentIndex }));

    // setTags((prevState) => {
    //   const tagsNow = [...prevState];
    //   console.log("EDING", editing);
    //   tagsNow.splice(editing, 1, ...splitted); // splice(0)
    //   console.log(tagsNow);

    //   return tagsNow;
    // });

    resetData();

    // document.getElementById('edit').addEventListener('keyup', e => {
    // })
  };

  const resetHandler = () => {
    console.log("this working?");
    // dispatch(generateActions.resetSplit({ mode: props.mode, index: props.currentIndex }));
    props.mode === "arab" &&
      dispatch(generateActions.resetSplit({ mode: "arab", value: props.lastTags.arab, index: props.currentIndex }));
    props.mode === "english" &&
      dispatch(generateActions.resetSplit({ mode: "eng", value: props.lastTags.eng, index: props.currentIndex }));
    props.mode === "local" &&
      dispatch(generateActions.resetSplit({ mode: "local", value: props.lastTags.local, index: props.currentIndex }));

    setSplittingAt();
  };

  const isSplitAvailable = tags.length <= props.splits.length;

  return (
    <>
      {isSplitAvailable && (
        <h3 className={classes.infoText}>
          <span>
            <img src="https://img.icons8.com/windows/32/000000/info.png" width={16} />
          </span>
          &nbsp; Select where the {props.splits[props.splitCount]} is in the below
        </h3>
      )}

      <div
        className={classes.tageditor}
        style={
          props.page && {
            fontFamily: `QCF2${props.page}`,
            fontSize: "3rem",
          }
        }>
        {/* <button
          onClick={() => {
            inputRef.focus();
          }}>
          Test
        </button> */}

        <ul>
          {tags.map((tag, index) =>
            index === editing ? (
              <input
                type="text"
                id="edit"
                className={classes.edit}
                size={props.arabic ? valueTags.length * 2 : valueTags.length / 1.3}
                ref={(ref) => setInputRef(ref)}
                value={valueTags}
                onKeyDown={onChangeHandler}
                onBlur={onUnFocusHandler}
                onChange={onChangeHandler}
              />
            ) : (
              <li key={tag} style={index === editing ? { color: "#b6134a" } : { color: "#000" }} onClick={clickHandler}>
                {tag}
              </li>
            )
          )}
        </ul>
        {/* {editing == null && (
        <textarea
          name="tagText"
          id="tag"
          cols="10"
          rows="1"
          value={valueTags}
          onKeyDown={onChangeHandler}
          onChange={onChangeHandler}
        ></textarea>
      )} */}
      </div>

      <div>
        {isSplitAvailable && <Button onClick={splitHandler}>Split At Caret</Button>}
        {isSplitAvailable && <Button onClick={resetHandler}>Undo Split</Button>}
      </div>
    </>
  );
}
