"use client";
interface SettingsWrapperProps {
    gbAvailable: number;
    updateAvailable: (method: string) => void;
    setGbAvailable: (gbAvailable: number) => void;
    startDate: number;
    setStartDate: (startDate: number) => void;
}

export default function SettingsWrapper({
    gbAvailable,
    updateAvailable,
    setGbAvailable,
    startDate,
    setStartDate,
}: SettingsWrapperProps) {
    function updateStartDate(event: React.ChangeEvent<HTMLInputElement>) {
        const updateDate = parseInt(event.target.value);
        if (updateDate < 1) {
            setStartDate(1);
        } else if (updateDate > 31) {
            setStartDate(31);
        } else {
            setStartDate(updateDate);
        }
    }
    return (
        <div className="wrapper">
            <div className="flex flex-col items-center justify-center h-full text-white bg-gray-900 gap-y-8">
                <div className="flex items-center justify-center gap-8 text-4xl ">
                    <span>
                        Data:
                        <input
                            type={"number"}
                            value={gbAvailable}
                            className="w-24 px-2 mx-2 bg-gray-900 border-2 border-white rounded-lg"
                            onChange={(e) => {
                                setGbAvailable(parseInt(e.target.value, 10));
                                window.localStorage.setItem("gbAvailable", e.target.value);
                            }}
                        />
                        GB
                    </span>
                    {/* <div className="flex flex-col gap-4">
                        <span className="cursor-pointer chevron top" onClick={() => updateAvailable("up")}></span>
                        <span
                            className="cursor-pointer chevron bottom"
                            onClick={() => updateAvailable("down")}
                        ></span>
                    </div> */}
                </div>
                {/* <span className="flex items-center justify-center text-4xl">
                    Renewal day:
                    <input
                        type={"number"}
                        value={startDate}
                        className="w-24 px-2 mx-2 bg-gray-900 border-2 border-white rounded-lg"
                        onChange={(e) => setStartDate(parseInt(e.target.value, 10))}
                    />
                </span> */}
            </div>
        </div>
    );
}
