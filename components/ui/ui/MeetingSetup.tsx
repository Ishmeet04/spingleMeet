"use client";
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import { on } from 'events'
import React, { useEffect, useState } from 'react'
import { Button } from './button';

const MeetingSetup = ({setisSetupComplete}:{
    setisSetupComplete: (value : boolean)=>void}) => {
    const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false)
    const call = useCall();
    
    if(!call){
        throw new Error("useCall must be used within StreamCall component");
        
    }
    
    useEffect(() => {
     if(isMicCamToggledOn){
        call?.camera.disable();
        call?.microphone.disable();
     }else{
        call?.camera.enable();
        call?.microphone.enable();
     }
     return () => {
      // ✅ Cleanup on unmount to stop local media
      call?.camera.disable();
      call?.microphone.disable();
    //   call?.leave(); // Optional: only if leaving on unmount
    };

    }, [isMicCamToggledOn, call?.camera, call?.microphone])
    
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input type="checkbox" 
                checked={isMicCamToggledOn}
                onChange={(e)=>setisMicCamToggledOn(e.target.checked)}
                />Join with Mic and Camera Off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={async()=>{
                await call.join();
                if (isMicCamToggledOn) {
           // ✅ Disable again after join to stop publishing tracks
                   await call.camera.disable();
                   await call.microphone.disable();
                }
                setisSetupComplete(true);
            }}>
            Join Meeting 
        </Button>
    </div>
  )
}

export default MeetingSetup