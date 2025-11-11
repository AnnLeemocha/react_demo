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
        setData("資料 1 獲取中...");
        isStop.current = true;
        setTimeout(() => {
            isStop.current = false;
            setData("資料 1 已取得");
        }, 3000)
    }
    function loading2() {
        if (isStop.current) {
            return
        }
        setData("資料 2 獲取中...");
        isStop.current = true;
        setTimeout(() => {
            isStop.current = false;
            setData("資料 2 已取得");
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
                <h3>不用 useState 顯示 A: </h3>
                <div><strong>{a}</strong></div>
                <button onClick={addA}>點我</button>
            </section>
            <section>
                <h3>使用 useState 顯示 B : </h3>
                <div><strong>{b}</strong></div>
                <button onClick={addB}>點我</button>
            </section>
            <section>
                <h3>使用 useEffect : 監測 B</h3>
                <div className="my-1" style={{ height: "1.5rem" }}><strong>{bMsg}</strong></div>
                <h3>使用 useEffect 初始化 C : </h3>
                <div><strong>{c}</strong></div>
            </section>
            <section>
                <h3>使用 useRef 阻止重複點擊 : </h3>
                <div style={{ height: "1.5rem" }}><strong>{data}</strong></div>
                <button onClick={loading}>資料獲取1</button>
                <button onClick={loading2}>資料獲取2</button>
            </section>
            <section>
                <h3>使用 useRef 聚焦 & 使用 useId 連結 label 與 input : </h3>
                <div className="flex items-center justify-center gap-2">
                <label htmlFor={inputId}>項目: </label>
                <input id={inputId} type="text" ref={inputRef} />
                <button onClick={() => inputRef.current?.focus()} className="ms-1">聚焦</button>
                </div>
            </section>
            <section>
                {/* <input type="file" ref={uploadRef} style={{ display: "none" }} /> */}
                <input type="file" ref={uploadRef} />
                <button onClick={upload} className="ms-4">上傳</button>
            </section>
        </>
    )
}