interface SettingsWrapperProps {
    gbAvailable: number;
    updateAvailable: (method: string) => void;
    setGbAvailable: (gbAvailable: number) => void;
    startDate: number;
    setStartDate: (startDate: number) => void;
}

export default function SettingsWrapper(props: SettingsWrapperProps) {
    function updateStartDate(event: React.ChangeEvent<HTMLInputElement>) {
        const updateDate = parseInt(event.target.value);
        if (updateDate < 1) {
            props.setStartDate(1);
        } else if (updateDate > 31) {
            props.setStartDate(31);
        } else {
            props.setStartDate(updateDate);
        }
    }
    return (
        <div className="wrapper">
            <div className="h-full flex flex-col gap-y-8 items-center justify-center  bg-gray-900 text-white">
                <div className="flex text-4xl items-center justify-center gap-8 ">
                    <span>
                        Data:
                        <input
                            type={"number"}
                            value={props.gbAvailable}
                            className="bg-gray-900 w-24 border-2 border-white rounded-lg px-2 mx-2"
                            onChange={(e) => props.setGbAvailable(parseInt(e.target.value, 10))}
                        />
                        GB
                    </span>
                    {/* <div className="flex flex-col gap-4">
                        <span className="chevron top cursor-pointer" onClick={() => props.updateAvailable("up")}></span>
                        <span
                            className="chevron bottom cursor-pointer"
                            onClick={() => props.updateAvailable("down")}
                        ></span>
                    </div> */}
                </div>
                <span className="text-4xl flex items-center justify-center">
                    Renewal day:
                    <input
                        type={"number"}
                        value={props.startDate}
                        className="bg-gray-900 w-24 border-2 border-white rounded-lg px-2 mx-2"
                        onChange={(e) => props.setStartDate(parseInt(e.target.value, 10))}
                    />
                </span>
            </div>
        </div>
    );
}
