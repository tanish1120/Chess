import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard=({chess, board, socket, setBoard}:{
    chess: any,
    setBoard: any,
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null) [][];
    socket: WebSocket;
}) =>{
    const [from,setFrom] = useState<null | Square>(null);

    return(
        <div>
            {
                board.map((row,i) => {
                    return <div key={i} className="flex">
                        {row.map((square, j) => {
                            const squareRepresentaion = String.fromCharCode(97 + (j % 8))+""+ (8-i) as Square; 
                            console.log(squareRepresentaion);
                            return<div onClick={()=>{
                                if(!from){
                                    setFrom(squareRepresentaion);
                                }else{
                                    socket.send(JSON.stringify({
                                        type: MOVE,
                                        payload: {
                                            move:{
                                                from,
                                                to: squareRepresentaion
                                            }
                                        }
                                    }))
                                    setFrom(null);
                                    chess.move({
                                        from,
                                        to: squareRepresentaion
                                    });
                                    setBoard(chess.board());
                                    console.log({
                                        from,
                                        to: squareRepresentaion
                                    })
                                }
                            }} key={j} className={`w-16 h-16 ${(i+j)%2==0? 'bg-[#ebecd0]':'bg-[#779556]'} flex justify-center items-center`}>
                                <div className="w-full justify-center flex h-full">
                                    <div className="h-full justify-center flex flex-col">
                                        {square ? <img className="w-10" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null} 
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                })
            }
        </div>
    )
}