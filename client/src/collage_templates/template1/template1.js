import React, { useState, useEffect } from "react"
import DnDBox from '../../components/DnD_Box/DnDBox'
import ReactToPrint from "react-to-print";
import axios from 'axios'
import './template1.css'

class Template1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {render: false}
    this.reference = React.createRef();
    this.positionsNum = 7;
  }
  componentDidMount(){
    console.log('in template1, componentDidMount. props are:')
    console.log(this.props)
    if (!this.props.imagesPositions) {
      this.createNewCollageObj()
    } else { 
      this.positionsArray = this.props.imagesPositions;
      this.collageId = this.props.collageId;
      this.setState({render : true});
    }
  }
  async createNewCollageObj(){
    console.log('in createNewCollageObj')
    this.positionsArray = new Array(this.positionsNum).fill(null)
    this.setState({render : true});
    console.log('creating new collage obj')
    try {
      const token = await localStorage.getItem("token");
      console.log(this.props.APIpath + '/collages/add-new-collage')
      const res = await axios.post( this.props.APIpath + '/collages/add-new-collage', 
        {albumName : this.props.albumName, template: 0, imagesPositions: this.positionsArray},
        {headers: { 'Authorization': `Bearer ${token}` }});
      console.log(res.data)
      this.collageId = res.data;
    } catch(err) {
      console.log(err)
    }
  }
  async updatePositions(position, image){
    console.log('---- in updatePositions -----')
    console.log(position)
    this.positionsArray[position] = image ? image.imageID : null;
    console.log(this.positionsArray)
    //-----------------------------------
    const token = await localStorage.getItem("token");
      console.log(this.props.APIpath + '/collages/update-collage')
      const res = await axios.patch( this.props.APIpath + '/collages/update-collage', 
        {collageId : this.collageId, imagesPositions: this.positionsArray },
        {headers: { 'Authorization': `Bearer ${token}` }});
  }

  renderTemplate() {
    console.log(this.positionsArray)
    const circImage = this.props.imagesArr ?
      this.props.imagesArr.find(img => img.imageID === this.positionsArray[this.positionsNum - 1]) :
      null;
    return (
      <div className="collage-template1" ref={el => (this.reference.current = el)}>
        <style type="text/css" media="print">{"\
            @page {\ size: landscape;\ }\
          "}</style>
          <style type="text/css" media="print">{"\
            @page {\ size: 180mm 130mm;\ }\
          "}
        </style>

        <div className="collage-template1_grid">
          {this.positionsArray.map((pos, indx) => {
            if (indx === this.positionsNum - 1) { return null}
            const image = this.props.imagesArr ? this.props.imagesArr.find(img => img.imageID === pos) : null;
            console.log(this.props.imagesArr)
            console.log(image)
            return (
              <div className={`box${indx + 1}-warp`}>
                <DnDBox 
                  boxablesArr={null} 
                  targetKey="box" 
                  name="box" 
                  className={`collage-template1_box box${indx + 1}`}
                  indx={indx} 
                  boxItemData={image ? image : null}
                  updatePositions={this.updatePositions.bind(this)}/>
              </div>
            )
          })}
        </div>
        <div className="box-circ-warp">
          <DnDBox 
            boxablesArr={null} 
            targetKey="box" 
            name="box" 
            className="collage-template1_box-circ" 
            imgStyle={{borderRadius: "50%"}} 
            indx={this.positionsNum - 1} 
            boxItemData={circImage ? circImage : null}
            updatePositions={this.updatePositions.bind(this)}/>
        </div>

      </div>)
    
  }
  render() {
    return (
      <div className="collage-template1_container">
      {this.state.render && this.renderTemplate()}
      <ReactToPrint
        trigger={() => <button><i className="fas fa-file-pdf"></i></button>}
        content={() => this.reference.current}
      />
      </div>
      
      );
  }
}

export default Template1;