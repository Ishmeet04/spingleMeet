"use client";
import Loader from '@/components/ui/ui/Loader';
import MeetingRoom from '@/components/ui/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/ui/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';


const Meeting = ({params: {id}} : {params: {id: string}}) => {
  const {user, isLoaded} =useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false)
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup/>
          ): (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main> 
  )
}

export default Meeting