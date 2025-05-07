"use client";

import { useState, useRef, useEffect } from "react";
import { DollarSign, Eye } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button as MuiButton } from "@mui/material";
import axios from "axios";

// Sample data for videos
// const sampleVideos = [
//   { video: "njmrj2X0fJQ", income: "1" },
//   { video: "ExJf1ESbW4I", income: "2" },
//   { video: "njmrj2X0fJQ", income: "0.2" },
//   { video: "njmrj2X0fJQ", income: "0.1" },
//   { video: "njmrj2X0fJQ", income: "1.5" },
//   { video: "njmrj2X0fJQ", income: "0.5" },
//   { video: "njmrj2X0fJQ", income: "3" },
//   { video: "njmrj2X0fJQ", income: "0.8" },
//   { video: "njmrj2X0fJQ", income: "1.2" },
//   { video: "njmrj2X0fJQ", income: "0.3" },
//   { video: "njmrj2X0fJQ", income: "2.5" },
//   { video: "njmrj2X0fJQ", income: "1.8" },
//   { video: "njmrj2X0fJQ", income: "0.7" },
//   { video: "njmrj2X0fJQ", income: "1.3" },
//   { video: "njmrj2X0fJQ", income: "2.2" },
// ]

export function DashboardContent({
  data,
  user,
  watchedData,
}: {
  data: any;
  user: any;
  watchedData: any;
}) {
  const [sampleVideos] = useState(data);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    +watchedData[watchedData?.length - 1]?.lastVideoIndex + 1 || 0
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [totalBalance, setTotalBalance] = useState(457);
  const [totalViews, setTotalViews] = useState(7);
  const [playerReady, setPlayerReady] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoKey = useRef(0); // Used to force re-render of video component

  const currentVideo = sampleVideos[currentVideoIndex];
  const requiredWatchTime = 35; // seconds

  useEffect(() => {
      let calculateBalance = 0
     if(watchedData?.length > 0){
        watchedData.map((e:any)=>{
              calculateBalance = calculateBalance + +e?.income
        })
     }
     setTotalBalance(calculateBalance)
  }, [watchedData]);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const hasSentRequestRef = useRef(false); // Flag to prevent multiple calls

  // Handle timer logic
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isPlaying) {
      console.log("Starting timer");
      timerRef.current = setInterval(() => {
        setTimeWatched((prev) => {
          const newTime = prev + 1;
          console.log("Time watched:", newTime);

          // Check if we've reached the required watch time
          if (newTime >= requiredWatchTime && !hasSentRequestRef.current) {
            hasSentRequestRef.current = true; // Mark as sent

            clearInterval(timerRef.current!);
            timerRef.current = null;
  
            handleWatchComplete();
  
            const data = {
              videoId: `${currentVideo?.id}`,
              video: currentVideo?.video,
              email: user?.email,
              income: currentVideo?.income,
              lastVideoIndex: `${currentVideoIndex}`,
            };
            fetch('/api/earning/watchComplete', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((res) => {
                  if (!res.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return res.json();
                })
                .then((result) => {
                  console.log('response', result); 
                })
                .catch((error) => {
                  console.error('error', error);
                });
              
            // axios
            //   .post(`/api/earning/watchComplete`, data)
            //   .then((res) =>{
            //       console.log("response", res)
            //     //   window.location.reload()
            //   })
            //   .catch((err) => console.log("error", err));
          }

          return newTime;
        });
      }, 1000);
    } else {
      console.log("Timer paused");
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  const handleWatchComplete = () => {
    setIsPlaying(false);
    setShowSuccessDialog(true);
    // Update balance and views
    setTotalBalance((prev) => prev + Number.parseFloat(currentVideo?.income));
    setTotalViews((prev) => prev + 1);
  };

  const handleNextVideo = () => {
      window.location.reload();
    setShowSuccessDialog(false);
    setIsPlaying(false);
    setTimeWatched(0);
    setPlayerReady(false);
    videoKey.current += 1; // Force re-render of video component
    if (currentVideoIndex < sampleVideos.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    } else {
      // Loop back to the first video when all videos are watched
      setCurrentVideoIndex(0);
    }
  };

  const togglePlayPause = () => {
    console.log("Toggle play/pause, current state:", isPlaying);
    setIsPlaying((prev) => !prev);
  };

  const handlePlayerReady = () => {
    console.log("Player ready event received");
    setPlayerReady(true);
  };

  const handlePlayerStateChange = (playing: boolean) => {
    console.log("Player state changed to:", playing ? "playing" : "paused");
    // Update our state to match the YouTube player state
    setIsPlaying(playing);
  };

  const handleVideoClick = () => {
    console.log("Video container clicked");
    togglePlayPause();
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="bg-purple-500 text-white p-6 rounded-md flex items-center">
          <div className="bg-white rounded-full p-3 mr-4">
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <div className="text-3xl font-bold">${totalBalance}</div>
            <div className="text-sm">Account Balance</div>
          </div>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-md flex items-center">
          <div className="bg-white rounded-full p-3 mr-4">
            <Eye className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <div className="text-3xl font-bold">{watchedData?.length}</div>
            <div className="text-sm">Total Views</div>
          </div>
        </div>
      </div>

      <div className="p-4 text-center">
        <h2 className="text-lg font-medium mb-4">
          Watch videos and earn money!
        </h2>

        <div className="mb-2 text-sm">
          View this video for 35 seconds and get ${currentVideo?.income}
        </div>

        <div className="border border-red-500 rounded-md overflow-hidden mb-4">
          <VideoPlayer
            key={`video-${currentVideoIndex}-${videoKey.current}`}
            videoId={currentVideo?.video}
            isPlaying={isPlaying}
            onPlayerReady={handlePlayerReady}
            onPlayerStateChange={handlePlayerStateChange}
            onVideoClick={handleVideoClick}
          />
        </div>

        <div className="space-y-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${(timeWatched / requiredWatchTime) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <Button
              onClick={togglePlayPause}
              //   className="bg-purple-600 hover:bg-purple-600 text-white"
              style={{ background: "#7367f0", color: "white" }}
              disabled={!playerReady}
            >
              {isPlaying ? "Pause Video" : "Watch Video"}
            </Button>
            <div className="text-sm text-gray-600 flex items-center">
              {timeWatched}/{requiredWatchTime} seconds
            </div>
          </div>

          <br />

          <br />
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <h3 className="text-lg font-medium text-green-600">Success!</h3>
            <p className="mt-2">
              {`You've`} earned ${currentVideo?.income} for watching this video.
            </p>
          </div>
          <DialogFooter>
            <MuiButton
              variant={"contained"}
              color="secondary"
              onClick={handleNextVideo}
              className="w-full"
            >
              OK
            </MuiButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
