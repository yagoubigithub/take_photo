 # Photo
 > This component is for capturing an image with getUserMedia HTML5 and return a an image of type Base64 .
 you simply use the data returned from the component like this :
```<img src={value returned from the component} width="" height />```
__it's work corecctely with Dialog component of material-ui__

### Demo [Photo](https://vigilant-galileo-3e06a1.netlify.com/)

## simple Exemple :
In parent compnent  :
don't forget the audio file:
``` "../audio/camera-shutter-click-03.mp3";```

###### to open and close dialog :

```
 state = {
    openDialog : false,
  }
  handelOpenCloseDialog = () => {
      this.setState({ openDialog: !this.state.openDialog});
  };
```
### get the Data:
```
getData = src => {
    console.log(src);
    //the src  is an image of type base64 or array of images type base64
    //you can send the image with method  POST  as a text
  };
```

### The button that open the dialog :
```
<IconButton onClick={this.handelOpenCloseDialog}>
         <PhotoCamera />
        </IconButton>
```

### the dialog and the photo component inside of him :
```
 <Dialog
          fullScreen
          open={this.state.openDialog}
          onClose={this.handelOpenCloseDialog}
        >
            <Photo
              sendData={this.getData}
              handelOpenCloseDialog={this.handelOpenCloseDialog}
            />
          )
        </Dialog>
 ```
###### The props isMulti when is true the Photos component return array of images of type base64 when is false the component return an image : 
##### Exemple :
```
 <Photo
              sendData={this.getData}
              isMulti={true}
              handelOpenCloseDialog={this.handelOpenCloseDialog}
            />
```