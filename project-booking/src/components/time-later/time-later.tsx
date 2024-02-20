import React, { useEffect, useState } from "react";
interface Props {
  callTimeLater: boolean;
}
const TimeLater: React.FC<Props> = (props: Props) => {
  const [seconds, setSeconds] = useState(120);
  useEffect(() => {
    setSeconds(120);
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.callTimeLater]);
  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return <div>{seconds > 0 ? <p>{formatTime(seconds)}</p> : <p>00:00</p>}</div>;
};
export default TimeLater;
