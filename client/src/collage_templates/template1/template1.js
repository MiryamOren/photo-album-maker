import React, { useState, useEffect } from "react"
import DnDBox from '../../components/DnD_Box/DnDBox'
import './template1.css'
class Template1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="collage-template1">
        <style type="text/css" media="print">{"\
          @page {\ size: landscape;\ }\
        "}</style>
        <style type="text/css" media="print">{"\
          @page {\ size: 180mm 130mm;\ }\
        "}</style>
        <div className="collage-template1_grid">
          <div className="box1-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box1"/>
          </div>
          <div className="box2-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box2"/>
          </div>
          <div className="box3-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box3"/>
          </div>
          <div className="box4-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box4"/>
          </div>
          <div className="box5-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box5"/>
          </div>
          <div className="box6-warp">
            <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box box6"/>
          </div>
        </div>
        <div className="box-circ-warp">
          <DnDBox boxablesArr={null} targetKey="box" name="box" className="collage-template1_box-circ" imgStyle={{borderRadius: "50%"}}/>
        </div>
        
      </div> );
  }
}

export default Template1;