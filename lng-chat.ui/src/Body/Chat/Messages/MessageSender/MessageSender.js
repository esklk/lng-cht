import "./MessageSender.css";
import React, { useRef, useState } from "react";
import { useI18n } from "../../../../Shared/i18nContext";
import { IconButton, TextField } from "@material-ui/core";
import {
  DeleteForeverRounded,
  MicOffRounded,
  MicRounded,
  PhotoLibraryRounded,
  SendRounded,
} from "@material-ui/icons";
import ImageUploading from "react-images-uploading";
import Resizer from "react-image-file-resizer";
import { Alert } from "@material-ui/lab";
import { useVoiceRecorder } from "use-voice-recorder";

const maximumImageCount = 10;
const maximumFileSizeMB = 100;

const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export default function MessageSender({ onMessageSend }) {
  const messageInputRef = useRef();
  const [isLoading, setIsLoading] = useState();
  const {
    isRecording,
    stop: stopRecording,
    start: startRecording,
  } = useVoiceRecorder((data) => {
    new Promise((resolve) => {
      setIsLoading(true);
      let reader = new FileReader();
      reader.onload = function () {
        let dataURL = reader.result;
        resolve(dataURL);
      };
      reader.readAsDataURL(data);
    })
      .then((dataUrl) => setVoiceDataUrlToUpload(dataUrl))
      .catch(() => setError(i18n.somethingWentWrong))
      .finally(() => setIsLoading(false));
  });
  const [voiceDataUrlToUpload, setVoiceDataUrlToUpload] = useState();
  const [imageDataUrlsToUpload, setImageDataUrlsToUpload] = useState([]);
  const [error, setError] = useState();
  const i18n = useI18n();

  const handleSendButtonClick = () => {
    console.log(messageInputRef.current.value);
    messageInputRef.current.value = null;
  };

  const handleImageUploadingSelect = (imageList) => {
    if (imageList.length + imageDataUrlsToUpload.length > maximumImageCount) {
      setError(`${i18n.numberOfSelectedImagesExceedsAllowed} ${10}`);
      return;
    }
    setIsLoading(true);
    Promise.all(imageList.map((x) => resizeImage(x.file)))
      .then((compressedDataUrls) =>
        setImageDataUrlsToUpload((x) => x.concat(compressedDataUrls))
      )
      .finally(() => setIsLoading(false));
  };

  const handleImageUploadingError = (error) => {
    if (error.maxNumber) {
      setError(`${i18n.numberOfSelectedImagesExceedsAllowed} ${10}`);
    } else if (error.maxFileSize) {
      setError(
        `${i18n.selectedImageSizeExceedsAllowed} ${maximumFileSizeMB}MB`
      );
    } else {
      setError(i18n.somethingWentWrong);
    }
  };

  const handleDeleteImageButtonClick = (dataUrlToDelete) => {
    setImageDataUrlsToUpload((x) =>
      x.filter((dataUrl) => dataUrl !== dataUrlToDelete)
    );
  };

  return isLoading ? (
    <div className="middle-container">
      <p>{i18n.pleaseWait}</p>
    </div>
  ) : error ? (
    <div className="middle-container">
      <Alert onClose={() => setError(null)} severity="error">
        {error}
      </Alert>
    </div>
  ) : (
    <div className="message-input-container">
      <ImageUploading
        multiple
        onChange={handleImageUploadingSelect}
        onError={handleImageUploadingError}
        maxFileSize={maximumFileSizeMB * 1048576}
        maxNumber={maximumImageCount}
        dataURLKey="data_url"
      >
        {({ onImageUpload }) => (
          <div className="upload-image-wrapper">
            <IconButton onClick={onImageUpload} className="btn-upload-image">
              <PhotoLibraryRounded />
            </IconButton>
          </div>
        )}
      </ImageUploading>
      <IconButton
        onClick={() => (isRecording ? stopRecording() : startRecording())}
        className="btn-record-voice"
      >
        {isRecording ? <MicOffRounded /> : <MicRounded />}
      </IconButton>
      <div className="message-data">
        {imageDataUrlsToUpload.length > 0 ? (
          <div className="image-list-preview">
            {imageDataUrlsToUpload.map((imageDataUrl) => (
              <div className="image-preview-item">
                <IconButton
                  onClick={handleDeleteImageButtonClick.bind(
                    this,
                    imageDataUrl
                  )}
                  className="btn-delete"
                >
                  <DeleteForeverRounded />
                </IconButton>
                <img
                  key={imageDataUrl.slice(-10)}
                  src={imageDataUrl}
                  alt="Upload preview"
                />
              </div>
            ))}
          </div>
        ) : (
          <TextField
            multiline
            placeholder={i18n.typeAMessage}
            inputRef={messageInputRef}
            max-rows={3}
          />
        )}
      </div>
      <IconButton className="btn-send" onClick={handleSendButtonClick}>
        <SendRounded />
      </IconButton>
    </div>
  );
}
