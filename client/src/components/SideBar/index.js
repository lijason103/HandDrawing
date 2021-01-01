import React, { useState } from 'react'
import { Dropzone } from '../Dropzone'
import { Section } from './styles'

export const SideBar = (props) => {
  const { onFileLoad } = props
	const [fileUrl, setFileUrl] = useState(null);

  const handleOnDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setFileUrl(URL.createObjectURL(file));
    onFileLoad(file)
  }

	return <Section className="sidebar">
		<Dropzone onDrop={handleOnDrop} />
		<img src={fileUrl} alt="" />
	</Section>;
};
