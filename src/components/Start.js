const Start = ({changePage}) => {

    const handleStart = () => {
        changePage("Trivia");
    }

    return (
        <div className="w-full h-screen flex flex-row justify-center">
            <div className="flex flex-col justify-center mx-auto">
                <h1 className="text-4xl p-2 mx-auto">Welcome to Music Trivia!</h1>
                <h3 className="text-xl p-2">See how many questions you can answer correctly in a row...</h3>
                <br></br>
                <button 
                    type="button"
                    onClick={handleStart}
                    className="border border-blue-500 text-blue-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline mx-auto"    
                >Start Game!</button>
            </div>
        </div>
    )
}

export default Start;