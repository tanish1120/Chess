import { useEffect, useState } from "react"

const WS_URL = "http://localhost:8080";

export const useSocket = () =>{
    const [socket,setScoket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = ()=>{
            setScoket(ws);
        }

        ws.onclose = ()=>{
            setScoket(null);
        }

        return ()=> {
            ws.close();
        }
    },[])
    return socket;
}