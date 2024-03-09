import { forwardRef, useState, useRef, useImperativeHandle } from 'react'

const Parent = () => {
    // Set up our reference
    const boxRef = useRef(null)

    const Child = forwardRef((props, ref) => {
        const [ color, setColor ] = useState('bg-blue-300')
        useImperativeHandle(ref, () => ({
          changeColor: color => {
              setColor(color)
          }
        }))
        return <div className={`w-40 h-40 transition-colors duration-900 ease-in-out rounded-2xl ${color}`}></div>
    })

    return (
        <div className="flex flex-col gap-4 min-h-screen bg-gray-200 justify-center items-center">
            <h2 className="text-gray-500 text-2xl font-bold text-30">What color should the box be?</h2>
            <div className="flex justify-between w-80">
                <button onClick={() => boxRef.current.changeColor('bg-blue-300')} className="bg-blue-400 py-2 px-4 focus:outline-none rounded-xl text-white font-bold">Blue</button>
                <button onClick={() => boxRef.current.changeColor('bg-green-300')} className="bg-green-400 py-2 px-4 focus:outline-none rounded-xl text-white font-bold">Green</button>
                <button onClick={() => boxRef.current.changeColor('bg-red-300')} className="bg-red-400 py-2 px-4 focus:outline-none rounded-xl text-white font-bold">Red</button>
                <button onClick={() => boxRef.current.changeColor('bg-yellow-300')} className="bg-yellow-400 py-2 px-4 focus:outline-none rounded-xl text-white font-bold">Yellow</button>
            </div>
            {/* Apply the reference to our component */}
            <Child ref={boxRef}/>
        </div>
    )
}