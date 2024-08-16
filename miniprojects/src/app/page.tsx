import { useRef } from "react";
import { useAppDispatch } from "./list-redux/store/store";

export default function App() {
    const name = useRef<string>("");
    const dispatch = useAppDispatch();

    return (
        <div>
            <form className="border rounder-md p-2 shadow-md m-2">
                <label htmlFor="">Person name:</label>
                <input className="border rounded-md p-2 mx-2" onChange={e => name.current=e.target.value} />
                <button className="bg-violet-500 text-white rounded-md px-4 py-2 cursor-pointer 
                hover:bg-violet-600 active:bg-violet-700">
                    Add
                </button>
            </form>
        </div>
    );
}