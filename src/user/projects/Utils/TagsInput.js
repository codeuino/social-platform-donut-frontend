import React, { useState } from 'react'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import './style.scss'

function TagsInput(props) {
  const [tags, setTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  // const inputRef = useRef(null)

  // function to add tags
  const addTags = (event) => {
    // set suggestedTags 
    setSuggestedTags(props.suggestedTags);
    if(event.target.value !== "" && event.key === "Enter") {
      // set tags to tag array 
      setTags([...tags, event.target.value])
      props.selectedTags([...tags, event.target.value])
      // set input to blank
      event.target.value = ""
    }
  }

  // function to remove tags
  const removeTag = (index) => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index )])
  }

  // search tag
  const searchTag = (event) => {
    const hint = event.target.value;
    const regex = new RegExp(hint, "gi");
    let tags = suggestedTags.filter((tag) => regex.test(tag) === true);
    console.log('suggested tag ', tags)
    // inputRef.current.innerHTML = tags.forEach((tag, index) => (
    //   "<li key={index}>"
    //     + {tag} +
    //   "</li>"
    // ))
  }

  return (
    <div className="tags-input">
        <ul id="tags">
            {tags.map((tag, index) => (
                <li key = {index} className = "single-tag" >
                    <span className="tag-title">{tag}</span>
                    <HighlightOffOutlinedIcon
                      fontSize={"small"}
                      onClick={() => removeTag(index)} 
                      className="tag-close-icon"
                      >
                      close
                      </HighlightOffOutlinedIcon>
                </li>
            ))}
        </ul>
        <input
            type="text"
            onKeyUp={event => addTags(event)}
            onKeyPress={event => searchTag(event)}
            placeholder="Press enter to add tags"
        />
        {/* <span className="suggested__tags" ref={inputRef}></span> */}
    </div>
  )
}

export default TagsInput;