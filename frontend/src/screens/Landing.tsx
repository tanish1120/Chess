import { useNavigate } from "react-router-dom"

export const Landing = () =>{

    const navigate = useNavigate();

    return(
        <div className="flex justify-center">
            <div className="pt-12 w-full max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"/chess.png"} className=" max-w-lg"/>
                    </div>
                    <div className="flex flex-col justify-center gap-5">

                        <div className="flex justify-center">
                            <h1 className="text-6xl w-[80%] font-bold text-center text-white">Play Chess Online <br/> on the #2 Site!</h1>
                        </div>

                        
                        <div className="mt-10 flex justify-center">
                            <button onClick={()=>{
                                navigate('/game');
                            }} className="bg-[#80b64b] hover:bg-[#9ddc5d] transition-all duration-200 text-white flex rounded-lg px-6 py-4 gap-6 items-center text-3xl font-bold">
                                <div className="w-[25%]">
                                    <img src={"/chesspiece.svg"}/>
                                </div>
                                <div className="w-[75%]">
                                    Play Online
                                </div>
                                
                            </button>  
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}