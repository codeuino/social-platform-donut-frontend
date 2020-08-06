import React  from 'react';
import { Editor } from "@tinymce/tinymce-react";

const ReadMePreview = (props) => {
    return ( 
        <Editor
        value={props.longDesc}
        disabled={true}
        apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
        init={{
          height: "100%",
          width: "100%",
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar: false,
        }}
      />
     );
}
 
export default ReadMePreview;