import React, { useRef, useState } from 'react';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [connected, setConnected] = useState(false);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;

    const peer = new RTCPeerConnection();

    stream.getTracks().forEach(track => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    peerRef.current = peer;

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    // For demo: Fake answering yourself
    const answerPeer = new RTCPeerConnection();

    answerPeer.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    answerPeer.onicecandidate = async (e) => {
      if (e.candidate) {
        await peer.addIceCandidate(e.candidate);
      }
    };

    peer.onicecandidate = async (e) => {
      if (e.candidate) {
        await answerPeer.addIceCandidate(e.candidate);
      }
    };

    answerPeer.onconnectionstatechange = () => {
      setConnected(true);
    };

    answerPeer.addEventListener("track", (event) => {
      localVideoRef.current.srcObject = event.streams[0];
    });

    stream.getTracks().forEach(track => answerPeer.addTrack(track, stream));

    await answerPeer.setRemoteDescription(peer.localDescription);
    const answer = await answerPeer.createAnswer();
    await answerPeer.setLocalDescription(answer);
    await peer.setRemoteDescription(answerPeer.localDescription);
  };

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Video Consultation</h2>
      <div className="flex space-x-4">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-1/2 border rounded"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/2 border rounded"
        />
      </div>
      <button
        onClick={startCall}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {connected ? 'Connected' : 'Start Call'}
      </button>
    </div>
  );
};

export default VideoCall;
