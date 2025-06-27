"use client";
import Loader from '@/components/ui/ui/Loader';
import MeetingRoom from '@/components/ui/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/ui/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState, use } from 'react';


// const Meeting = ({params: {id}} : {params: {id: string}}) => {
interface MeetingProps {
  params: Promise<{ id: string }> // ✅ Updated type to match new behavior
}

const Meeting = ({ params }: MeetingProps) => {
  const { id } = use(params);
  const { isLoaded} =useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false)
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setisSetupComplete={setisSetupComplete} />
          ): (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main> 
  )
}

export default Meeting