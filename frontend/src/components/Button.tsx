
export const Button = ({onClick, children}: {onClick: () => void, children:React.ReactNode}) =>{

    return(
        <button onClick={onClick} className="bg-[#80b64b] w-full hover:bg-[#9ddc5d] transition-all duration-200 text-white rounded-lg px-6 py-4 gap-6 text-3xl font-bold">
            {children}
        </button>  
    )
}