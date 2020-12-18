import { useStateMachine } from 'little-state-machine'
import React from 'react'
import updateAction from './updateAction'

function Submit(props) {
    const {state} = useStateMachine(updateAction);

    return (
        <div>
            Tạo bài viết thành công!<br />
            {JSON.stringify(state)}
            {console.log(state)}
            {/* {state} */}
        </div>
    )
}

export default Submit
