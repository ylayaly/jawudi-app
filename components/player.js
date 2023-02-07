import React, { useEffect, useState } from 'react';

export default function PlayerVideo({source, showVideo, className = "", parentClass="", setPercent = null, id = ""}) {
    const [playerVideo, setPlayerVideo] = useState(null)

    useEffect(() => {
        if(playerVideo){
            if(showVideo){
                playerVideo.play()

            }else{
                playerVideo.pause()
            }
        }
        if(setPercent){
            document.querySelector('#video'+id).ontimeupdate = function() {
                let totalLength = playerVideo.duration % 60;   
                let percentageCompleted = (playerVideo.currentTime / totalLength) * 360;    
                setPercent(percentageCompleted)
            }
        };

    }, [showVideo, playerVideo])

    return (
        <div className={parentClass}>
            <video
                id={"video"+id}
                className={className}
                ref={player => {
                    setPlayerVideo(player);
                }}
                src={source}
                playsInline
                />
        </div>
    )
}