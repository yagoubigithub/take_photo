import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import soundFile from "../audio/camera-shutter-click-03.mp3";

import {
  PhotoCamera,
  Close,
  Videocam,
  Camera,
  PlayArrow,
  Pause,
  Brightness1,
  CameraFront,
  CameraRear,
  Replay
} from "@material-ui/icons/";


const styles = {
    container: {
      position: "relative",
      display: "block",
      height: "100%",
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
        photos: this.props.photos,
      };
      componentDidMount(){
  
        const video = document.getElementById("video"),
        canvas = document.getElementById("canvas"),
        capture = document.getElementById("capture"),
        replay = document.getElementById("replay");
      let width = 0;
      let height = 0;
      capture.style.opacity = 0;
      replay.style.opacity = 0;
      video.addEventListener("loadedmetadata", function() {
        capture.style.opacity = 1;
        width = this.videoWidth;
        height = this.videoHeight;
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
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
          video:{facingMode:{ideal : "environment"} },
          audio: false
        },
        (stream)=> {
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
          document
          .getElementById("closeBtn").addEventListener("click",()=>{
            stream.getVideoTracks()[0].stop();
    
          });
        },
        (error)=> {
          //error
        }
      );
      }

      handelCapture = () => {
        const video = document.getElementById("video"),
          canvas = document.getElementById("canvas"),
          span_img = document.getElementById("span_img"),
          context = canvas.getContext("2d"),
          replay = document.getElementById("replay");
        span_img.innerHTML = "";
    
        var img = document.createElement("img");
        span_img.appendChild(img);
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        this.props.sendData(canvas.toDataURL("image/png"));
    
        console.log("capture");
        var audio = new Audio(soundFile);
        audio.play();
        img.setAttribute("src", canvas.toDataURL("image/png"));
        img.setAttribute("width", window.innerWidth);
    
        img.style.opacity = 1;
        replay.style.opacity = 1;
        replay.addEventListener("click",()=>{
            img.style.opacity= 0;

        });
       
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
                  id="capture">
                  <Camera fontSize="large" />
                </IconButton>

                <IconButton
                  style={{ position: "absolute", bottom: 0, left: "0" }}
                
                  id="replay">
                  <Replay fontSize="large" />
                </IconButton>
    
    
          </div>
        );
      }
}
 
export default withStyles(styles)(Photo);
