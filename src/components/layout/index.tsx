import { useState } from "react";
import Syntax from "../../pages/Syntax";
import Hook from "../../pages/Hook";
import Tailwind from "../../pages/Tailwind";
import TodoList from "../../pages/TodoList";
import reactLogo from "../../assets/react.svg";
import { ThemeToggle } from "../theme/ThemeToggle";

const router = [
    {
        name: "JSX",
        page: <Syntax />,
    },
    {
        name: "Hook",
        page: <Hook />,
    },
    {
        name: "Tailwind",
        page: <Tailwind />,
    },
    {
        name: "TodoList",
        page: <TodoList />,
    },
];


function App() {
    const [page, setPage] = useState(() => {
        let tab = localStorage.getItem("tab");
        if (!tab) {
            return router[0].name;
        }
        if (router.find((item) => item.name === tab)) {
            return tab;
        }
        return router[0].name;
    });

    function handleChangePage(page: string) {
        setPage(page);
        localStorage.setItem("tab", page);
    }

    return (
        <>
            <header>
                {<div className="header flex gap-2 mt-6 mb-4 justify-center items-center">
                    <img src={reactLogo} className="logo react" />
                    <ThemeToggle />
                </div>}
                <nav className="flex gap-2 my-4 justify-center items-center w-full">
                    {router.map((item) => (
                        <button
                            key={item.name}
                            type="button"
                            onClick={() => handleChangePage(item.name)}
                            className={`${item.name === page ? "btn-active nav-active" : "nav-inactive"}`}
                        // style={{ color: item.name === page ? 'blue' : 'black' }}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </header>
            <main className="card w-[600px]">
                {router.map(
                    (item) =>
                        item.name === page && <div key={item.name}>{item.page}</div>,
                )}
            </main>
        </>
    );
}

export default App;
