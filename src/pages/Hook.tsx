import { useState, useEffect, useRef, useId } from "react";

export default function Hook() {
    let a = 0;
    const [b, setB] = useState(0);
    const [bMsg, setBMsg] = useState("");
    const [c, setC] = useState(0);
    const [data, setData] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const uploadRef = useRef<HTMLInputElement>(null);
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

    function upload() {
        uploadRef.current?.click();
    }

    function loading() {
        if (isStop.current) {
            return
        }
        console.log("開始取得 1 資料!");
        setData("資料獲取中...");
        isStop.current = true;
        setTimeout(() => {
            isStop.current = false;
            setData("資料已取得");
        }, 3000)
    }
    function loading2() {
        if (isStop.current) {
            return
        }
        console.log("開始取得 2 資料!");
        setData("資料獲取中...");
        isStop.current = true;
        setTimeout(() => {
            isStop.current = false;
            setData("資料已取得");
        }, 3000)
    }

    useEffect(() => {
        setC(5);
        inputRef.current?.focus();
    }, [])

    useEffect(() => {
        setBMsg("Change!");
        let time = setTimeout(() => {
            setBMsg("");
        }, 1500)

        return () => {
            clearTimeout(time);
        }
    }, [b])

    return (
        <>
            <section>
                <div>不用 useState 顯示 A: <strong>{a}</strong></div>
                <button onClick={addA}>點我</button>
            </section>
            <section>
                <div>使用 useState 顯示 B : <strong>{b}</strong></div>
                <button onClick={addB}>點我</button>
            </section>
            <section>
                <div>使用 useEffect : 監測 B</div>
                <div style={{ height: "1.5rem" }}><strong>{bMsg}</strong></div>
                <div>使用 useEffect 初始化 C : <strong>{c}</strong></div>
            </section>
            <section>
                <div>使用 useRef 阻止重複點擊 : </div>
                <div style={{ height: "1.5rem" }}><strong>{data}</strong></div>
                <button onClick={loading}>資料獲取1</button>
                <button onClick={loading2}>資料獲取2</button>
            </section>
            <section>
                <div>使用 useRef 聚焦 & 使用 useId 連結 label 與 input : </div>
                <label htmlFor={inputId}>項目: </label>
                <input id={inputId} type="text" ref={inputRef} />
                <button onClick={() => inputRef.current?.focus()}>聚焦</button>
            </section>
            <section>
                {/* <input type="file" ref={uploadRef} style={{ display: "none" }} /> */}
                <input type="file" ref={uploadRef} />
                <button onClick={upload}>上傳</button>
            </section>
        </>
    )
}