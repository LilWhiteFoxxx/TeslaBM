import SectionHeadlines from './SectionHeadline';

const DataAndEquipment = ({ dataAndEquipment, type }) => {
    return (
        <div className="relative flex flex-col">
            {/* <div className="flex justify-center items-center mb-4">
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                <SectionHeadlines className="w-[240px] h-[120px]" />
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
            </div> */}
            <SectionHeadlines type={type} />
            <p className="text-2xl font-bold mb-4 text-center uppercase">
                {dataAndEquipment.titleData
                    ? dataAndEquipment.titleData
                    : 'BORN ON THE RACETRACK'}
            </p>
            <div className="relative flex justify-center items-center">
                <img
                    src={dataAndEquipment.imgData}
                    alt="data"
                    className="w-full"
                />
                <div className="absolute inset-20 flex justify-center items-center">
                    <div className="flex flex-col absolute top-0 left-0 m-4 text-center">
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-[60px] font-bold w-[300px]">
                                {dataAndEquipment.atbOne.atbNumber}
                            </p>
                            <div className="w-[300px] h-[2px] bg-black my-2"></div>
                            <p className="text-[16px] font-bold w-[300px]">
                                {dataAndEquipment.atbOne.atbName}
                            </p>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-[60px] font-bold w-[300px]">
                                {dataAndEquipment.atbTwo.atbNumber}
                            </p>
                            <div className="w-[300px] h-[2px] bg-black my-2"></div>
                            <p className="text-[16px] font-bold w-[300px]">
                                {dataAndEquipment.atbTwo.atbName}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center absolute top-0">
                        <div className="flex">
                            <svg
                                version="1.1"
                                class="animatedfacts__circleLeft"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 51.1 250.9"
                                width={'120px'}
                                height={'240px'}
                                color="black"
                            >
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="50.8"
                                    y1="10.4"
                                    x2="33.5"
                                    y2="0.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="45.1"
                                    y1="21"
                                    x2="27.2"
                                    y2="11.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="39.9"
                                    y1="31.9"
                                    x2="21.6"
                                    y2="23.7"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="35.3"
                                    y1="43"
                                    x2="16.6"
                                    y2="35.8"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="31.3"
                                    y1="54.4"
                                    x2="12.2"
                                    y2="48.2"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="27.8"
                                    y1="65.9"
                                    x2="8.5"
                                    y2="60.7"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="25.0"
                                    y1="77.6"
                                    x2="5.5"
                                    y2="73.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="22.8"
                                    y1="89.5"
                                    x2="3.1"
                                    y2="86.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="21.3"
                                    y1="101.4"
                                    x2="1.4"
                                    y2="99.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="20.3"
                                    y1="113.4"
                                    x2="0.3"
                                    y2="112.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="0"
                                    y1="125.4"
                                    x2="20"
                                    y2="125.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="0.3"
                                    y1="138.5"
                                    x2="20.3"
                                    y2="137.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="1.4"
                                    y1="151.6"
                                    x2="21.3"
                                    y2="149.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="3.1"
                                    y1="164.5"
                                    x2="22.8"
                                    y2="161.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="5.5"
                                    y1="177.4"
                                    x2="25"
                                    y2="173.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="8.5"
                                    y1="190.1"
                                    x2="27.8"
                                    y2="185"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="12.2"
                                    y1="202.7"
                                    x2="31.3"
                                    y2="196.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="16.6"
                                    y1="215"
                                    x2="35.3"
                                    y2="207.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="21.6"
                                    y1="227.1"
                                    x2="39.9"
                                    y2="219"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="27.2"
                                    y1="238.9"
                                    x2="45.1"
                                    y2="229.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="33.5"
                                    y1="250.4"
                                    x2="50.8"
                                    y2="240.4"
                                ></line>
                            </svg>
                            <img
                                className="w-[300px] h-[240px] my-4"
                                src={dataAndEquipment.iconData}
                                alt="data2"
                            />
                            <svg
                                version="1.1"
                                class="animatedfacts__circleRight"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 51.1 250.9"
                                width={'120px'}
                                height={'240px'}
                                color="black"
                            >
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="0"
                                    y1="10.4"
                                    x2="17.3"
                                    y2="0.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="5.7"
                                    y1="21"
                                    x2="23.6"
                                    y2="11.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="10.9"
                                    y1="31.9"
                                    x2="29.2"
                                    y2="23.7"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="15.5"
                                    y1="43"
                                    x2="34.2"
                                    y2="35.8"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="19.6"
                                    y1="54.4"
                                    x2="38.6"
                                    y2="48.2"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="23"
                                    y1="65.9"
                                    x2="42.3"
                                    y2="60.7"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="25.8"
                                    y1="77.6"
                                    x2="45.4"
                                    y2="73.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="28"
                                    y1="89.5"
                                    x2="47.7"
                                    y2="86.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="29.6"
                                    y1="101.4"
                                    x2="49.4"
                                    y2="99.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="30.5"
                                    y1="113.4"
                                    x2="50.5"
                                    y2="112.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="50.8"
                                    y1="125.4"
                                    x2="30.8"
                                    y2="125.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="50.5"
                                    y1="138.5"
                                    x2="30.5"
                                    y2="137.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="49.4"
                                    y1="151.6"
                                    x2="29.6"
                                    y2="149.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="47.7"
                                    y1="164.5"
                                    x2="28"
                                    y2="161.4"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="45.4"
                                    y1="177.4"
                                    x2="25.8"
                                    y2="173.3"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="42.3"
                                    y1="190.1"
                                    x2="23"
                                    y2="185"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="38.6"
                                    y1="202.7"
                                    x2="19.6"
                                    y2="196.5"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="34.2"
                                    y1="215"
                                    x2="15.5"
                                    y2="207.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="29.2"
                                    y1="227.1"
                                    x2="10.9"
                                    y2="219"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="23.6"
                                    y1="238.9"
                                    x2="5.7"
                                    y2="229.9"
                                ></line>
                                <line
                                    class="animatedfacts__circleLine"
                                    x1="17.3"
                                    y1="250.4"
                                    x2="0"
                                    y2="240.4"
                                ></line>
                            </svg>
                        </div>
                        <p className="text-lg text-black text-center mt-4">
                            {dataAndEquipment.descData
                                ? dataAndEquipment.descData
                                : 'Water/oil-cooled four-cylinder four-stroke in-line engine'}
                        </p>
                        <div className="flex items-center justify-center w-[220px] h-[40px] bg-black mt-4">
                            <p className="text-white font-bold text-[15px]">
                                DATA & EQUIPMENT
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col absolute top-0 right-0 m-4 text-center">
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-[60px] font-bold w-[300px]">
                                {dataAndEquipment.atbThree.atbNumber}
                            </p>
                            <div className="w-[300px] h-[2px] bg-black my-2"></div>
                            <p className="text-[16px] font-bold w-[300px]">
                                {dataAndEquipment.atbThree.atbName}
                            </p>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-[60px] font-bold w-[300px]">
                                {dataAndEquipment.atbFour.atbNumber}
                            </p>
                            <div className="w-[300px] h-[2px] bg-black my-2"></div>
                            <p className="text-[16px] font-bold w-[300px]">
                                {dataAndEquipment.atbFour.atbName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataAndEquipment;
