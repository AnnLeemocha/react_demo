import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'

function Syntax() {
  const luckNum = 6;
  const heading = <h1>Hello, World!</h1>;
  const renderEl = (name: string) => {
    return <h3>{`My name is ${name}.`}</h3>
  }

  return (
    // 只能傳回一個根元
    <>
      <section>
        {/* 使用變數與方法 */}
        <h3>使用變數:</h3>
        {heading}
        {renderEl("Ann")}
        {luckNum}
      </section>

      <section className='flex flex-col gap-2 items-center justify-center'>
        <div>
          <h3>標籤必須閉合 & SVG 圖檔使用:</h3>
        </div>
        {/* 標籤必須閉合 (<img />) */}
        <img src="/vite.svg" />
        {/* <img src="../assets/react.svg" /> */}
        <img src={reactLogo} />
      </section>

      <section>
        {/* 使用駝峰式命名法為"大部分"屬性命名 */}
        <h3>"大部分"屬性改用駝峰式命名法:</h3>
        <div className="container flex gap-1 items-center" style={{ backgroundColor: '#9d9d9d', padding: '10px' }}>
          <label htmlFor="name">姓名：</label>
          <input id="name" type="text" maxLength={10} />
          <button className='ms-1' onClick={() => alert('Clicked!')}>點我</button>
        </div>
      </section>
    </>
  )
}

export default Syntax
