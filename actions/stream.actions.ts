"use server";
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;


// Server action that does the logic taps into the apiSecret and creates a token for the user 
export const tokenProvider = async() => {
    const user = await currentUser();
    if(!user) throw new Error('User is not logged in');
    if(!apiKey) throw new Error('No API key');
    if(!apiSecret) throw new Error('No API secret');

    const client = new StreamClient(apiKey,apiSecret);

    const exp = Math.round(new Date().getTime()/1000)+60*60; // The token is valid for only an hour 

    const issued=Math.floor(Date.now()/1000)-60; //Time when the token was issued
    const token=client.createToken(user.id, exp, issued);
    return token;
}