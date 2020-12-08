import "./MessageSender.css";
import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../../../../Shared/i18nContext";
import { IconButton, LinearProgress, TextField } from "@material-ui/core";
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
import VoiceMessagePlayer from "../VoiceMessagePlayer/VoiceMessagePlayer";
import { chatService } from "../../../../Shared/Services/chatService";

const maximumImageCount = 10;
const maximumFileSizeMB = 100;
const maximumRecordingDurationSeconds = 60;

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

export default function MessageSender({ chatId }) {
  const messageInputRef = useRef();
  const [isLoading, setIsLoading] = useState();
  const {
    isRecording,
    stop: stopRecording,
    start: startRecording,
  } = useVoiceRecorder((data) => {
    setRecordingDuration(0);
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
      .then(() => setImageDataUrlsToUpload([]))
      .catch((error) => {
        console.error(error);
        setError(i18n.somethingWentWrong);
      })
      .finally(() => setIsLoading(false));
  });

  //This is a workaround to stop recording by timeout.
  const [
    isRecordingNeedsToBeStopped,
    setIsRecordingNeedsToBeStopped,
  ] = useState();
  if (isRecording && isRecordingNeedsToBeStopped) {
    try {
      stopRecording();
    } catch (error) {
      if (error.code !== 11) {
        console.log(error);
      }
    } finally {
      setIsRecordingNeedsToBeStopped(false);
    }
  }

  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceDataUrlToUpload, setVoiceDataUrlToUpload] = useState();
  const [imageDataUrlsToUpload, setImageDataUrlsToUpload] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const timer = isRecording
      ? setInterval(() => {
          setRecordingDuration((oldDuration) => {
            if (oldDuration === maximumRecordingDurationSeconds) {
              return 0;
            }
            return oldDuration + 1;
          });
        }, 1000)
      : null;

    return () => (timer ? clearInterval(timer) : null);
  }, [isRecording]);

  const handleSendButtonClick = () => {
    let sendMessagePromise;
    if (voiceDataUrlToUpload) {
      sendMessagePromise = chatService
        .uploadAttachmentAsync(voiceDataUrlToUpload)
        .then((attachmentUrl) =>
          chatService.sendMessageToChatAsync(chatId, "voice", attachmentUrl)
        );
    } else if (imageDataUrlsToUpload.length > 0) {
      sendMessagePromise = Promise.all(
        imageDataUrlsToUpload.map((imageDataUrlToUpload) =>
          chatService
            .uploadAttachmentAsync(imageDataUrlToUpload)
            .catch((error) => {
              setError(i18n.somethingWentWrong);
              console.error(error);
            })
            .then((attachmentUrl) => {
              if (attachmentUrl) {
                chatService.sendMessageToChatAsync(
                  chatId,
                  "image",
                  attachmentUrl
                );
              }
            })
        )
      );
    } else if (messageInputRef.current && messageInputRef.current.value) {
      sendMessagePromise = chatService.sendMessageToChatAsync(
        chatId,
        "text",
        messageInputRef.current.value
      );
    }

    if (sendMessagePromise) {
      setIsLoading(true);
      sendMessagePromise
        .then(() => {
          setVoiceDataUrlToUpload(null);
          setImageDataUrlsToUpload([]);
          if (messageInputRef.current) {
            messageInputRef.current.value = null;
          }
        })
        .catch((error) => {
          console.error(error);
          setError(i18n.somethingWentWrong);
        })
        .finally(() => setIsLoading(false));
    }
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
      .then(() => setVoiceDataUrlToUpload(null))
      .catch((error) => {
        console.error(error);
        setError(i18n.somethingWentWrong);
      })
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

  useEffect(() => {
    if (!isRecording) {
      return;
    }
    const timer = setTimeout(() => {
      if (isRecording) {
        setIsRecordingNeedsToBeStopped(true);
      }
    }, maximumRecordingDurationSeconds * 1000);
    return () => clearTimeout(timer);
  }, [isRecording]);

  const handleRecordVoiceButtonClick = () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  };

  const handledeleteVoiceButtonClick = () => {
    setVoiceDataUrlToUpload(null);
  };

  const i18n = useI18n();

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
        onClick={handleRecordVoiceButtonClick}
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
        ) : isRecording ? (
          <div className="audio-recording-placeholder">
            <p>{i18n.speakPlease}</p>
            <LinearProgress
              variant="determinate"
              value={
                100 * (recordingDuration / maximumRecordingDurationSeconds)
              }
            />
          </div>
        ) : voiceDataUrlToUpload ? (
          <div className="voice-message-preview-container">
            <VoiceMessagePlayer src={voiceDataUrlToUpload} />
            <IconButton onClick={handledeleteVoiceButtonClick}>
              <DeleteForeverRounded />
            </IconButton>
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
