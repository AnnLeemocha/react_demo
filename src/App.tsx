import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Syntax from './pages/Syntax'
import Hook from './pages/Hook'
import './App.css'
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

const pages = [
  {
    name: "JSX",
    page: <Syntax />
  },
  {
    name: "Hook",
    page: <Hook />
  }
]

function App() {
  const [page, setPage] = useState(() => {
    let tab = localStorage.getItem("tab");
    if (!tab) {
      return pages[0].name
    }
    if (pages.find((item) => item.name === tab)) {
      return tab
    }
    return pages[0].name
  });

  function handleChangePage(page: string) {
    setPage(page);
    localStorage.setItem("tab", page);
  }

  return (
    <ThemeProvider>
      <header>
        <div className='header'>
          <img src={reactLogo} className='logo react' />
          <ThemeToggle />
        </div>
        <nav>
          {pages.map(item => (
            <button
              key={item.name}
              type='button'
              onClick={() => handleChangePage(item.name)}
              className={item.name === page ? 'nav-active' : 'nav-inactive'}
              // style={{ color: item.name === page ? 'blue' : 'black' }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </header>
      <main className='card'>
        {pages.map(item => (
          item.name === page &&
          (
            <div
              key={item.name}
            >
              {item.page}
            </div>)
        )
        )}
      </main>
    </ThemeProvider>
  )
}

export default App
