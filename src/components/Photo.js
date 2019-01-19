import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";

import { withStyles } from "@material-ui/core/styles";
import soundFile from "../audio/camera-shutter-click-03.mp3";

import { Close, Camera, Replay } from "@material-ui/icons/";
import { Button } from "@material-ui/core";

const styles = {
  container: {
    position: "relative",
    display: "block",
    height: "100vh",
    background: "#ddd",
    overflow: "hidden",
    maxWidth: "100%"
  },
  video: {
    position: "fixed",
    background: "#555",
    maxWidth: "100%"
  },
  canvas: {
    position: "absolute",
    opacity: 0
  },
  img: {
    position: "fixed"
  }
};
class Photo extends Component {
  state = {
    photos: [],
    photo: null,
    temp: null
  };
  componentDidMount() {
    const video = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      capture = document.getElementById("capture");
    let width = 0;
    let height = 0;
    capture.style.display = 'none';
    if(this.props.width !== undefined && !isNaN(this.props.width)){
      video.setAttribute("width", this.props.width);

    }
    if(this.props.height !== undefined && !isNaN(this.props.height)){
      video.setAttribute("height", this.props.height);

    }
    if(this.props.isMulti){
        document.getElementById("replay").style.display = 'none';
        document.getElementById("save").style.display = 'none';
    }
  

 
     video.addEventListener("loadedmetadata", function() {
      capture.style.display = 'inline-flex';
      width = video.videoWidth;
      height = video.videoHeight;
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      console.log(width,height);
      //
      // ...
    });
    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: { facingMode: { ideal: "environment" } },
        audio: false
      },
      stream => {
        //
        if (window.URL) {
          try {
            video.src = window.URL.createObjectURL(stream);
          } catch (error) {
            video.srcObject = stream;
          }
        } else {
          video.src = stream;
        }
        video.play();
        document.getElementById("closeBtn").addEventListener("click", () => {
          stream.getVideoTracks()[0].stop();
          if (this.props.isMulti) {
            this.props.sendData(this.state.photos);
          } else {
            this.props.sendData(this.state.photo);
          }
        });
      },
      error => {
        //error
      }
    );
  }

  handelCapture = () => {
    const video = document.getElementById("video"),
      canvas = document.getElementById("canvas"),
      span_img = document.getElementById("span_img"),
      context = canvas.getContext("2d");
    span_img.innerHTML = "";
    var audio = new Audio(soundFile);
    audio.play();
    var img = document.createElement("img");
    span_img.appendChild(img);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    if (this.props.isMulti) {
      const temp = canvas.toDataURL("image/png"),
      replay = document.getElementById("replay"),
      save =  document.getElementById("save");
     save.addEventListener("click", () => {
        
        const photos = [...this.state.photos];
        photos.push(temp);
        this.setState({ photos });
        img.style.transition = "transform 1s";

        img.style.transform = `translate(-${video.videoWidth}px,-${
          video.videoHeight
        }px)`;
        replay.style.display = 'none';
        save.style.display = 'none';

      });

    } else {
      this.setState({ photo: canvas.toDataURL("image/png") });
    }

    console.log("capture");

    img.setAttribute("src", canvas.toDataURL("image/png"));
    img.setAttribute("width", window.innerWidth);

    

    img.style.opacity = 1;
    if(this.props.isMulti){
        const replay = document.getElementById("replay"),
        save = document.getElementById("save");
        replay.style.display = 'inline-flex';
        save.style.display = 'inline-flex';
        replay.addEventListener("click", () => {
          img.style.opacity = 0;
          replay.style.display = 'none';
            save.style.display = 'none';
        });
    }else{
        document.getElementById("replay").addEventListener("click", () => {
            img.style.opacity = 0;
          
          });
    }
    
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {/*   close Button*/}
        <IconButton
          onClick={this.props.handelOpenCloseDialog}
          id="closeBtn"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }}
        >
          <Close fontSize="large" />
        </IconButton>
        <video className={classes.video} id="video" autoPlay />
        <canvas className={classes.canvas} id="canvas" />
        <span id="span_img" className={classes.img} />

        <IconButton
          style={{ position: "absolute", bottom: 0, left: "47vw" }}
          onClick={this.handelCapture}
          id="capture"
        >
          <Camera fontSize="large" />
        </IconButton>

        <IconButton
          style={{ position: "absolute", bottom: 0, left: "0" }}
          id="replay"
        >
          <Replay fontSize="large" />
        </IconButton>

        {this.props.isMulti ? (
          <Button
            style={{ position: "absolute", bottom: 0, right: "0" }}
            id="save"
          >
            Enregistrer
          </Button>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(Photo);
