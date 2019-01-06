import React, { Component } from "react";
import Photo from "./components/Photo";
import IconButton from "@material-ui/core/IconButton";
import { Dialog } from "@material-ui/core";

import {
  PhotoCamera,
 
} from "@material-ui/icons/";

class App extends Component {
  state = {
    openDialog : false,
   
  }
  handelOpenCloseDialog = () => {
      this.setState({ openDialog: !this.state.openDialog});
    
  };
  getData = src => {
    console.log(src);
    
     
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
              isMulti={false}
              handelOpenCloseDialog={this.handelOpenCloseDialog}
            />
          )
        </Dialog>

      </div>
    );
  }
}

export default App;
