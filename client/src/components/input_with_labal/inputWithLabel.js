import React, { useState, useEffect } from "react"
function InputWithLabale({ label, inputType, callback}) {
  return(
    <React.Fragment>
      <label>{label}</label>
      <input type={inputType} onChange={(e) => callback(e.target.value)}/>
    </React.Fragment>
  )
}

export default InputWithLabale;