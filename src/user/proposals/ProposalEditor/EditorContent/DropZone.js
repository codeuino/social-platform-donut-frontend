import React, { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "160px",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone(props) {
  const [proposalId, setProposalId] = useState(props.idContent);

  const onDrop = useCallback((acceptedFiles) => {
    if (proposalId === "new") {
      toast.error(
        "Please save the proposal as a draft before attaching images"
      );
    } else {
      let formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      const URL = `http://localhost:5000/proposal/attach/${props.idContent}`;

      fetch(URL, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: props.token,
        },
      })
        .then((res) => {
          toast.success("Image successfully attached to proposal!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop some images here, or click to select an image. Files
          dropped here would be attached to the proposal.
        </p>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default StyledDropzone;
