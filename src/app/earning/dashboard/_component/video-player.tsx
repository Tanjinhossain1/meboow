"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface VideoPlayerProps {
  videoId: string
  isPlaying: boolean
  onPlayerReady: () => void
  onPlayerStateChange: (playing: boolean) => void
  onVideoClick: () => void
}

export function VideoPlayer({
  videoId,
  isPlaying,
  onPlayerReady,
  onPlayerStateChange,
  onVideoClick,
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Set up message listener for YouTube iframe API
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only process messages that might be from YouTube
      if (event.origin !== "https://www.youtube.com") return

      try {
        // YouTube sends data as JSON string
        if (typeof event.data === "string") {
          // Try to parse as JSON
          try {
            const data = JSON.parse(event.data)

            // Handle player state changes
            if (data.event === "onStateChange") {
              // YT.PlayerState.PLAYING = 1, YT.PlayerState.PAUSED = 2
              if (data.info === 1) {
                console.log("YouTube player state: PLAYING")
                onPlayerStateChange(true)
              } else if (data.info === 2) {
                console.log("YouTube player state: PAUSED")
                onPlayerStateChange(false)
              }
            }

            // Handle player ready
            if (data.event === "onReady") {
              console.log("YouTube player is ready")
              onPlayerReady()
            }
          } catch (e) {
            // Not a JSON message
          }
        }
      } catch (e) {
        // Error processing message
        console.error("Error processing YouTube message:", e)
      }
    }

    window.addEventListener("message", handleMessage)

    // Signal that the player is ready after a short delay
    // This is a fallback in case the YouTube API doesn't send the ready event
    const readyTimeout = setTimeout(() => {
      onPlayerReady()
    }, 2000)

    return () => {
      window.removeEventListener("message", handleMessage)
      clearTimeout(readyTimeout)
    }
  }, [onPlayerReady, onPlayerStateChange])

  // Handle play/pause commands
  useEffect(() => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return

    try {
      // Send postMessage to YouTube iframe
      const command = isPlaying ? "playVideo" : "pauseVideo"
      console.log(`Sending ${command} command to YouTube player`)

      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: [],
        }),
        "*",
      )
    } catch (error) {
      console.error("Error sending command to YouTube player:", error)
    }
  }, [isPlaying])

  // Handle click on the video container
  const handleContainerClick = (e: React.MouseEvent) => {
    console.log("Video container clicked")
    // Make sure we're not clicking on the YouTube iframe itself
    if (e.target === containerRef.current) {
      onVideoClick()
    }
  }

  return (
    <div ref={containerRef} className="aspect-video relative cursor-pointer h-[50%] w-[60%] mx-auto" onClick={handleContainerClick}>
      
      <iframe
        ref={iframeRef}
        width="80%"
        height="90%"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${
          typeof window !== "undefined" ? window.location.origin : ""
        }&controls=1&rel=0&showinfo=0&playsinline=1`}
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="mx-auto"
        // allowFullScreen
      ></iframe>

      {/* Transparent overlay to capture clicks */}
      <div 
        className="absolute inset-0 z-10"
        onClick={(e) => {
          e.stopPropagation()
          onVideoClick()
        }}
      ></div>
    </div>
  )
}
