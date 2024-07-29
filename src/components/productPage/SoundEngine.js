import SectionHeadlines from './SectionHeadline';
import PulsingCircles from './PulsingCircles';

const SoundEngine = ({
    dataAndEquipment,
    handleToggleEngine,
    startEngine,
    audioRef,
    type,
}) => {
    return (
        <div className="flex flex-col">
            {/* <div className="flex justify-center items-center mb-4">
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                <SectionHeadlines className="w-[240px] h-[120px]" />
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
            </div> */}
            <SectionHeadlines type={type} />
            <p className="text-2xl font-bold mb-4 text-center uppercase">
                {dataAndEquipment.titleSound
                    ? dataAndEquipment.titleSound
                    : 'CUTS THROUGH MARROW AND BONE – AND THROUGH ASPHALT'}
            </p>
            <div className="flex">
                <div className="relative">
                    <img
                        src={dataAndEquipment.imgStartEngineer}
                        alt="start-engineer"
                        className="w-full"
                    />
                    <div className="absolute flex flex-col justify-center w-[700px] h-[400px] top-[30%] right-0">
                        <button
                            onClick={handleToggleEngine}
                            className="absolute rounded-full w-[160px] h-[160px] left-[270px] bg-white z-20 text-[22px] font-bold text-[#919191] mb-[20px]"
                        >
                            <span className="hover:text-[#16171a]">
                                {startEngine ? 'STOP ENGINE' : 'START ENGINE'}
                            </span>
                        </button>
                        {startEngine && (
                            <div className="w-full h-[500px] absolute z-10">
                                {/* <div className='w-[500px] h-[500px] border-2 border-[#808080] rounded-full absolute right-[100px]'></div>
                                            <div className='w-[400px] h-[400px] border-2 border-[#808080] rounded-full absolute right-[150px] top-[50px]'></div>
                                            <div className='w-[300px] h-[300px] border-2 border-[#808080] rounded-full absolute right-[200px] top-[100px]'></div> */}
                                <PulsingCircles />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <audio
                        ref={audioRef}
                        // controls
                        src={dataAndEquipment.sound}
                    />
                </div>
            </div>
        </div>
    );
};

export default SoundEngine;
