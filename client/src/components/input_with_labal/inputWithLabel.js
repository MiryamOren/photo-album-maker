import React, { useState, useEffect } from "react"
function InputWithLabale({ label, inputType, callback}) {
  return(
    <React.Fragment>
      <label>{label}</label>
      <input type={inputType} onChange={callback}/>
    </React.Fragment>
  )
}

export default InputWithLabale;