import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { ThemeToggle } from "../components/theme/ThemeToggle";

function Tailwind() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <section>
        <h3>切換亮暗模式</h3>
        {/* 切換亮暗模式 */}
        <ThemeToggle />
      </section>

      <section>
        <h3>顏色、字體、間距:</h3>
        <div className="text-purple-500 bg-sky-200">顏色</div>
        <div className="">字體</div>
        <div className="mt-4 pb-4 px-2 border rounded">間距+邊框</div>
      </section>

      <section>
        <h3>狀態樣式</h3>
        <div className="flex gap-4">
          <div className="h-20 w-20 content-center bg-amber-200 hover:bg-emerald-400 dark:bg-amber-900 dark:hover:bg-emerald-900">
            Hover
          </div>
          <div className="h-20 w-20 content-center active:scale-95 bg-sky-200 dark:bg-sky-800">
            Active (Click)
          </div>
        </div>
      </section>

      <section>
        <h3>響應式設計、版面配置 (sm, md, lg)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {["卡片 1", "卡片 2", "卡片 3"].map((title, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl
                transition-shadow duration-300 flex flex-col space-y-2"
            >
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                這是一段示範文字，用來展示卡片內容。
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>過渡</h3>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => setVisible((prev) => !prev)}
            className="mb-4 px-4 py-2"
          >
            {visible ? "淡出元素" : "淡入元素"}
          </button>

          <div
            className={`w-64 h-16 bg-green-500 dark:bg-green-600 rounded-md
              transition-opacity duration-500 ease-in-out
              ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <p className="text-white text-center p-5">這是可淡入／淡出的區塊</p>
          </div>
        </div>
      </section>

      <section>
        <h3>動畫</h3>
        <div className="mt-10 flex justify-center gap-4">
          <div className="size-12 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></div>
          <div className="size-12 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></div>
          <div className="size-12 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></div>
        </div>
        <span className="relative inline-flex my-4">
          <button type="button">Transactions</button>
          <span className="relative flex size-3 -mt-1 -ml-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
          </span>
        </span>
        <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 dark:border-blue-600 p-4">
          <div className="flex animate-pulse space-x-4">
            <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-500"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 rounded bg-gray-200 dark:bg-gray-500"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-gray-500"></div>
                  <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-500"></div>
                </div>
                <div className="h-2 rounded bg-gray-200 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tailwind;
