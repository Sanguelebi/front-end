function ChoosePlatformBanner() {
    return (
        <>
            <div className="relative text-center">
                <img className="w-full" src="/choose.svg" alt="choose" />

                <div className="w-full absolute top-[25%] left-0 translate-y-[-50%] text-center text-6xl font-bold text-white mt-10">
                    <h1>საგნების არჩევის სივრცე</h1>
                </div>
                <div className="w-full absolute top-[30%] left-0 translate-y-[-50%] text-center text-2xl text-white mt-20">
                    <h3> თქვენი თავისუფალი არჩევანი</h3>
                </div>
                <div className="flex flex-row justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] gap-7">
                    <button className=" p-4 text-center text-white  border-2 border-solid rounded-md">
                        თავისუფალი კრედიტი
                    </button>
                    <button className=" p-4 text-center text-white  border-2 border-solid rounded-md">
                        პროფრსიული არჩევითი
                    </button>
                </div>
            </div>

            <div className="justify-center items-center">
                <div className="flex justify-center items-center">
                    <img src="/clock.svg" alt="clock" />
                </div>
                <div className="text-center text-4xl text-primary">
                    <p className="">თქვენთვის ასარჩევი საგანი ვერ მოიძებნა... </p>
                </div>
            </div>
        </>
    );
}

export default ChoosePlatformBanner;
