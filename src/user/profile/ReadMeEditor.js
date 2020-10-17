import React from 'react'
import { Editor } from "@tinymce/tinymce-react";

const ReadMeEditor = (props) => {
    return (  
        <Editor
        value={props.longDesc}
        apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
        init={{
          height: "100%",
          width: "100%",
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "textpattern",
          ],
          textpattern_patterns: [
            { start: "#", format: "h1" },
            { start: "##", format: "h2" },
            { start: "###", format: "h3" },
            { start: "####", format: "h4" },
            { start: "#####", format: "h5" },
            { start: "######", format: "h6" },
            { start: "* ", cmd: "InsertUnorderedList" },
            { start: "- ", cmd: "InsertUnorderedList" },
            {
              start: "1. ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "decimal" },
            },
            {
              start: "1) ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "decimal" },
            },
            {
              start: "a. ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "lower-alpha" },
            },
            {
              start: "a) ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "lower-alpha" },
            },
            {
              start: "i. ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "lower-roman" },
            },
            {
              start: "i) ",
              cmd: "InsertOrderedList",
              value: { "list-style-type": "lower-roman" },
            },
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={props.onEditorChange}
      />
    );
}
 
export default ReadMeEditor;