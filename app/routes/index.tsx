import { useState } from "react";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import axios from "axios";
import Spinner from "~/components/Spinner";

const deepgramApiKey = "fb3b9cb4d6d95eabf648a2002a367c464ab4b238";
const uploaderApiKey = "public_FW25bQH36a9X3U1PmgRaMNvxvuzm"

const Main = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [transcript, setTranscript] = useState<string | null>(null)
  const uploader = Uploader({ apiKey: uploaderApiKey });

  const handleUploadAudio = (files: Array<any>) => {
    setLoading(true)
    axios.post('https://api.deepgram.com/v1/listen', {
        url: files[0].fileUrl,
      }, {
        headers: {
          'Authorization': 'Token ' + deepgramApiKey,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setLoading(false)
        setTranscript(response.data.results.channels[0].alternatives[0].transcript)
      })
      .catch((err) => {
        setLoading(false)
        setTranscript(null)
      });
  }
  return (
    <main className="main">
      {transcript ? (
        <div className="max-w-[600px] w-full h-[400px] mx-auto rounded shadow-lg p-8 pt-10">
          <div className="text-2xl font-bold mb-10">Transcript</div>
          <textarea className="w-full text-left h-[255px] rounded border outline-none p-4 text-sm no-resize-textarea" value={transcript} readOnly />
      </div>
      ) : loading ? (
        <div className="max-w-[600px] w-full h-[400px] mx-auto rounded pt-10 text-center shadow-lg">
          <div className="text-2xl font-bold mb-24">Analyzing your call</div>
          <div className="flex justify-center"><Spinner /></div>
        </div>
      ) : null}
      <div className={`${(transcript || loading) ? 'hidden' : ''} max-w-[600px] w-full h-[400px] mx-auto rounded shadow-lg py-10`}>
        <div className="text-2xl font-bold mb-8">Upload A Call Recording</div>
        <UploadDropzone 
          uploader={uploader}
          options={{
            multi: false,
            showFinishButton: true,
            styles: {
              colors: {
                primary: "#377dff"
              }
            },
            mimeTypes: [
              "audio/wav",
              "audio/mp3",
              "audio/mpeg",
              "audio/ogg",
              "audio/flac",
              "video/mp4",
            ]
          }}
          onComplete={handleUploadAudio}
          width="500px"
          className="mx-auto"
          height="250px"
        />
      </div>
    </main>
  )
};

const Footer = () => (
  <footer className="footer">
    Developed by Milan Dukic@2023
  </footer>
);

export default function Index() {
  return (
    <div className="container">
      <Main />
      <Footer />
    </div>
  );
}
