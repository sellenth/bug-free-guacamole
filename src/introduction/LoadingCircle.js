import React from 'react';
import TitleText from './TitleText';

const width = 400;
const height = 400;
const cx = width / 2;
const rx = cx;
const cy = height / 2;
const ry = cy

function percentage_to_radians(percentage) {
    return Math.PI * 2 / 100 * percentage;
}

function advanceScript(setPercentage, setScriptIdx) {
    let percentage = 0;
    let scriptIdx = 0;
    let intervalID = setInterval(() => {
        percentage += 0.5;
        setPercentage(percentage);
        if (percentage >= 100) {
            percentage = 0;
            scriptIdx ++;
            setScriptIdx(scriptIdx)
        }
    }, 18)
}

function constructPathString(percent) {
    let largeArcFlag = percent > 50 ? 1 : 0;

    //Arcs (rx, ry, x-rot, large-arc, sweep, x-end, y-end)
    return [
        "M", 200, 200,
        "H", 400,
        "A", rx, ry, 0, largeArcFlag, 1, cx + Math.cos(percentage_to_radians(percent)) * rx, cy + Math.sin(percentage_to_radians(percent)) * ry,
        "Z"
    ].join(" ")
}

const centerOnScreen = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}

const LoadingCircle = ({ script }) => {
    const [percentage, setPercentage] = React.useState(0);
    const [scriptIdx, setScriptIdx] = React.useState(0);
    const currentTitle = script[scriptIdx]

    //On element mount, start incrementing the percentage
    React.useEffect(() => {
        advanceScript(setPercentage, setScriptIdx)
    }, []);

    return (
        <>
            <svg style={centerOnScreen} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                <circle cx={cx} cy={cy} r={cx - 1}></circle>
                <g fill="white" transform={`rotate(-90, ${cx}, ${cy})`}>
                    <path d={constructPathString(percentage)} />
                </g>
            </svg>
            <TitleText text={currentTitle} />
        </>
    )
}

export default LoadingCircle;