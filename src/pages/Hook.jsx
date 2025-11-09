import { useState, useEffect, useRef, useId } from "react";

export default function Hook() {
    let a = 0;
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);
    const inputRef = useRef(null);
    const uploadRef = useRef(null);
    const isStop = useRef(false);
    const inputId = useId();

    function addA() {
        a++;
        console.log("a =", a);
    }
    function addB() {
        // setNum(b + 1);
        // setNum(b + 1);
        setB((prev) => {
            return prev + 1;
        });
    }
    function stop() {
        isStop.current = !isStop.current;
    }

    function upload() {
        uploadRef.current.onClick();
    }

    useEffect(() => {
        setC(5);
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        if (isStop) {
            setC((prev) => prev + 1)
        }
    }, [b])

    return (
        <>
            <section>
                <div>Number A:{a}</div>
                <button onClick={addA}>點我</button>
            </section>
            <section>
                <div>Number B:{b}</div>
                <button onClick={addB}>點我</button>
            </section>
            <section>
                <div>Number C:{c}</div>
                <button onClick={stop}>Stop</button>
            </section>
            <section>
                <label htmlFor={inputId}>Input:</label>
                <input id={inputId} type="text" ref={inputRef} />
            </section>
            <section>
                <input type="file" ref={uploadRef} style={{ display: "hidden" }} />
                <button onClick={upload}>Upload</button>
            </section>
        </>
    )
}