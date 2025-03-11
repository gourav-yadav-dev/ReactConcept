import { useReducer } from "react"

const initialState = {
    viewers: 0
}
function reducre(state, action) {
    switch (action.type) {
        case 'live':
            return { viewers: state.viewers + 1 }
        case 'exit':
            return { viewers: state.viewers - 1 }
    }
}

export function LikeYoutube() {
    const [state, dispatch] = useReducer(reducre, initialState);
    function GoLive() {
        dispatch({ type: 'live' })
    }
    function ExitLive() {
        dispatch({ type: 'exit' })
    }
    return (
        <div>
            <div className="card w-25">
                <div className="card-header">
                    <span>Live Video</span>
                </div>
                <div className="card-body">
                    <iframe src="https://www.youtube.com/embed/DfrgPWzbXlg" height="200%"></iframe>
                    <div>
                        Views :[{state.viewers}]
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-warning" onClick={GoLive}>Live</button>
                    <button className="btn btn-danger mx-3" onClick={ExitLive} >Exit</button>
                </div>


            </div>
        </div>
    )
}