import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";

// TODO: Remove, there's code repetition
export const INIT_GAME = "init_game";
export const MOVE = "move"; 
export const GAME_OVER = "game_over";

export const Game = () =>{
    
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch (message.type){
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move Made");
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    },[socket])

    if(!socket) return <div>Connecting...</div>

    return(
        <div className="justify-center flex">
            <div className="pt-8 w-full max-w-screen-lg">
                <div className="grid grid-cols-6 gap-4 ">
                    <div className="col-span-4 w-full flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board}/>
                    </div>
                    <div className="col-span-2 bg-[#262522] p-5 rounded-md flex justify-center w-full ">
                        <div className="pt-8 w-full">
                            {!started && <Button onClick={()=>{
                                socket.send(JSON.stringify({
                                    type: INIT_GAME
                                }))
                            }}>
                                Play
                            </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}