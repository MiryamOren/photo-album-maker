// edit photo book
import React, { useState, useEffect } from "react"
import { useLocation, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import DnDBox from '../../components/DnD_Box/DnDBox'
import Template0Page0 from '../../photo_book_templates/template1/page0/page0.template0'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
function EditPhotoBook({user, APIpath}) {
  const templates = {
    template0: [<Template0Page0/>, <Template0Page0/>]
  }
  const {userName, albumName, template } = useParams();
  const [currentPage, setCurrentPage] = useState(0)
  console.log(currentPage);
  
  const imagesArr = user.images
    .filter(image => image.albumsNames.includes(albumName))
    .map( image => `data: image/jpeg;base64,${Buffer.from(image.content.data).toString('base64')}`);
  let pdf = new jsPDF();
  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    if (!input) {return}
    html2canvas(input)
      .then((canvas) => {
        // input.appendChild(canvas);
        // if (!pdf) {pdf = new jsPDF()}
        const imgData = canvas.toDataURL('image/png');
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.output('dataurlnewwindow');
        // async () => await pdf.save(`${albumName}.pdf`
      })
    ;
  }

  const backAndForth = (backOrForth) => {
    printDocument();
    backOrForth > 0 ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  return(
    <div>
      <DnDBox 
        boxablesArr={imagesArr} targetKey="box" name="box"
      />

      { currentPage > 0 && <button onClick={() => backAndForth(0)}>back</button>}
  <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
            
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
  </Document>
      {templates[template][currentPage]}
      {templates[template].length - 1 > currentPage && <button onClick={() => backAndForth(1)}>next</button>}
      {templates[template].length - 1 === currentPage && <button onClick={ReactPDF.renderToStream(<Document />)}>save</button>}
    </div>
  )
}
export default EditPhotoBook;