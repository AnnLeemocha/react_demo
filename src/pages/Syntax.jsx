export default function Syntax() {
    return (
        <div className="container" style={{ backgroundColor: 'lightblue', padding: '10px' }}>
            <h1>Hello JSX</h1>
            <label htmlFor="name">姓名：</label>
            <input id="name" type="text" maxLength={10} />
            <button onClick={() => alert('Clicked!')}>點我</button>
        </div>
    )
}