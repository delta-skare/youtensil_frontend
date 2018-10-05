import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'
import { storage } from './firebase'

const imageMaxSize = 2000000
const acceptedFileTypes = 'image/x-png, image/png, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim()})

class ImageUploader extends Component {
  constructor(props){
    super(props)
    this.state = {
      image: null,
      url: ''
    }
  }


  //function that verifies file type and file size
  verifyFile = (files) => {
    const currentFile = files
    const currentFileType = currentFile.type
    const currentFileSize = currentFile.size
    if (currentFileSize > imageMaxSize) {
      alert("This file is not allowed." + currentFileSize + " bytes is too large")
      return false
    }
    if (!acceptedFileTypesArray.includes(currentFileType)) {
      alert("This file is not allowed. Only images are allowed.")
      return false
    }
    return true
  }

  handleChange = (e) => {
    console.log(e.target.files[0]);
    if(e.target.files[0]) {
      if(!this.verifyFile(e.target.files[0])) {
        this.setState({image: null})
      } else {
        // this.verifyFile(e.target.files[0]) // delete this line later
        const newImage = e.target.files[0]
        this.setState({image: newImage})
      }
    }
  }

  // handleDrop = (files, rejectedFiles) => {
  //   if (rejectedFiles && rejectedFiles.length > 0) {
  //     this.verifyFile(rejectedFiles)
  //     }
  //
  //     if (files && files.length > 0) {
  //       const isVerified = this.verifyFile(files)
  //       if (isVerified) {
  //         // imageBase64Data
  //         const currentFile = files[0]
  //         const reader = new FileReader()
  //         reader.addEventListener("load", () => {
  //           console.log(reader.result)
  //           this.setState({ imgSrc: reader.result})
  //         }, false)
  //
  //         reader.readAsDataURL(currentFile)
  //       }
  //     }
  // }


  handleUpload = () => {
    if (!this.setState({image: null})) {
      // destructure image
      const { image } = this.state
      // save FileReader to variable
      // const reader = new FileReader()
      var uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on('state_changed',
      (snapshot) => {
        // progress function
      },
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({url})
        })
      })
      return true
    } else {
      return false
    }
  }

  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }

    console.log("show up");
    console.log(this.state.url);
    console.log(this.state.image);
    return (
      <div style={style}>
        <input type="file" onChange={this.handleChange}/>
          <button onClick={this.handleUpload}>Upload</button>
          <br/>
        <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="imagen" height="300" width="400"/>
      </div>
    );
  }
}

export default ImageUploader
