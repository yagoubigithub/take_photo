import React, { Component } from "react";
import Photo from "./components/Photo";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import {
  PhotoCamera,
  Close,
  Videocam,
  Camera,
  PlayArrow,
  Pause,
  Brightness1,
  CameraFront,
  CameraRear
} from "@material-ui/icons/";

class App extends Component {
  state = {
    openDialog : false,
   
  }
  handelOpenCloseDialog = () => {
      this.setState({ openDialog: !this.state.openDialog});
    
  };
  getData = val => {
    console.log(val);
       /*  const photos = [...this.state.photos];
    photos.push({ imageData: val, selected: false });
    localStorage.setItem("photos", JSON.stringify(photos));
    this.setState({ photos }); */
  };
  render() {
    return (
      <div>
        <IconButton onClick={this.handelOpenCloseDialog}>
         <PhotoCamera />
        </IconButton>

        <Dialog
          fullScreen
          open={this.state.openDialog}
          onClose={this.handelOpenCloseDialog}
        >
          
            <Photo
              sendData={this.getData}
              photos={this.state.photos}
              handelOpenCloseDialog={this.handelOpenCloseDialog}
            />
          )
        </Dialog>
      </div>
    );
  }
}

export default App;
