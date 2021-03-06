import React, {Component} from 'react';
// import Dropzone from 'react-dropzone'
import {storage} from './firebase'
import '../css/Full.css'

const imageMaxSize = 2000000
const acceptedFileTypes = 'image/x-png, image/png, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim()
})

class ImageUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            url: '',
            imgSrc: null
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
        // console.log(e.target.files[0]);
        if (e.target.files[0]) {
            if (!this.verifyFile(e.target.files[0])) {
                this.setState({image: null})
                return false
            } else {
                this.previewFile(e.target.files[0]) // delete this line later
                const newImage = e.target.files[0]
                this.setState({image: newImage})
                return true
            }
        }
    }

    previewFile = (files) => {
        const isVerified = this.verifyFile(files)

        if (isVerified) {
            //if handle change is true then convert image to imagebase64{
            // const currentFile = files[0]
            console.log(files)
            // imageBase64Data
            const myFileReader = new FileReader();
            myFileReader.addEventListener("load", () => {
                console.log(myFileReader.result)

                this.setState({imgSrc: myFileReader.result})
            }, false)
            myFileReader.readAsDataURL(files)
        }

    }

    handleUpload = () => {
        if (!this.setState({image: null})) {
            // destructure image
            const {image} = this.state
            console.log(image);
            // save FileReader to variable
            // const reader = new FileReader()
            var uploadTask = storage.ref(`${this.props.location}/${image.name}`).put(image)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress function
                    console.log(snapshot);
                },
                (error) => {
                    //error function
                    console.log(error);
                },
                () => {
                    //complete function
                    var getUrl = storage.ref(this.props.location).child(image.name).getDownloadURL()
                    getUrl.then(url => {
                        console.log(url);
                        this.props.handleImage(url)
                    })
                })
            return true
        } else {
            return false
        }
    }

    render() {
        const {imgSrc} = this.state
        const style = {
            height: '200px',
            width: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid 1px',
            padding: '10px'
        }

        console.log("show up");
        console.log(this.state.url);
        console.log("newImage = " + this.state.image);
        console.log("imgSrc = " + this.state.imgSrc);

        return (
            <div style={{marginLeft: '16px', marginBottom: '5px'}}>
                <div>
                    <input type="file" onChange={this.handleChange} multiple={false} accept={acceptedFileTypesArray}/>
                </div>
                <div style={style}>
                    {imgSrc !== null ?
                        <div>
                            <img src={imgSrc} style={{objectFit: "contain", height: "100%", width: "100%"}}
                                 alt="preview"/>
                        </div> : ''}
                </div>
              <button onClick={this.handleUpload}>Upload</button><button onClick={() => this.props.toggle("image")}>Back</button>
                <br/>
            </div>
        );
    }
}

export default ImageUploader
