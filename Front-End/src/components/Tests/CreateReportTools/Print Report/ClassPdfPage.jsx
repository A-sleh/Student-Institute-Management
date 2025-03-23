
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import React, { Fragment } from 'react'
import logo from '../../../../assets/logo.png'
import NOTOKUIFIregular from './Noto_Kufi_Arabic/Zain-Regular.ttf'
import NOTOKUIFIbold from './Noto_Kufi_Arabic/Zain-Bold.ttf'
import { Image, Text, View, Page, Document, StyleSheet,Font } from '@react-pdf/renderer';
import { TextDirection } from '@react-pdf-viewer/core';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { ClassReportStructurTEXT } from '../../../../Data/static/test/CreateReportTools/PrintReportTEXT';
import { ARABIC } from '../../../../Redux/actions/type';

export default function ClassPdfPage({data,currentLange}) {

    const {gradeTEXT ,classTitleTEXT ,orderTEXT ,studentNameTEXT ,markTEXT ,markAvgTEXT ,
        instituteNameTEXT ,reportTitleTEXT ,reportDateTEXT} = ClassReportStructurTEXT[currentLange]

    Font.register({
        family: currentLange == ARABIC ? "Zain" : '',
        fonts : [{
            src: NOTOKUIFIregular,
          },
          {
            src: NOTOKUIFIbold,
            fontWeight: 'bold',
          }
        ],
        format: 'truetype',
    })

    const styles = StyleSheet.create({
        page: {fontSize: 11,paddingLeft: 20,paddingRight: 20,lineHeight: 1.5,flexDirection: 'column' },

        spaceBetween : {flex : 1,flexDirection:currentLange == ARABIC ? 'row' : 'row-reverse' ,alignItems:'center',justifyContent:'space-between',color: "#3E3E3E"},

        titleContainer: {flexDirection: 'row' ,marginTop: 14 , alignSelf: 'center' , width: '100%'},
        
        logo: { width: 90 , alignSelf: 'center' },

        reportTitle: {  fontSize: 12,  textAlign: 'right' , padding: '3px', lineHeight: '1'},

        addressTitle : {fontSize: 12}, 
        
        invoice : {fontSize: 20},
        
        invoiceNumber : {fontSize: 11}, 
        
        address : {  fontSize: 10},
        
        theader : {marginTop: 5 ,textAlign: 'center',width: '25%',fontSize : 11,paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:25,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { borderRightWidth:0, borderBottomWidth:1 ,width: '10%',flex: 0.5},

        tbody:{ fontSize : 9, textAlign: 'center',width: '25%',paddingTop: 5.5 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1,height:23},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{  borderRightWidth:1 , width: '10%' , flex: 0.5},

        arabicText : { fontFamily: "Zain" }
    })

    const ReportTitle = () => {
        return <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={logo} />
                <View style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , alignItems: currentLange == ARABIC ? 'flex-end' : 'flex-start'}}>
                    <Text style={[styles.reportTitle,styles.arabicText,{fontSize: '20px',marginBottom: '5'}]}>{instituteNameTEXT}</Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}>{reportTitleTEXT} : {data.ReportTitle}  </Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}>{reportDateTEXT} : {format( new Date( data.StartDate) , 'yyyy / MM / dd')}   </Text>
                </View>
            </View>
        </View>
    };

    const ReportSubTitle = () => {
        return <>
            <View style={styles.titleContainer}>
                <View style={[styles.spaceBetween,{display: 'flex' ,  width: '100%' }]} >
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}> {gradeTEXT} : {data.grade} </Text>
                    </View>
                    
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}> {classTitleTEXT} : {data.title}  </Text>
                    </View>
                </View>
            </View>
        </>
    };

    const TableHead = () => {
        return <View style={{ width:'100%', flexDirection :'row-reverse'}}>
            <View style={[styles.theader, styles.theader2]}>
                <Text style={styles.arabicText}>{orderTEXT}</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>{studentNameTEXT}</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>{markTEXT}</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>{markAvgTEXT}</Text>   
            </View>
        </View>
    };

    const TableBody = () => {
        return data.students.map((student,index)=>{
                return <Fragment key={index}>
                    <View style={{ width:'100%', flexDirection :'row-reverse'}}>
                        <View style={[styles.tbody, styles.tbody2]}>
                            <Text >{index + 1}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text style={styles.arabicText}>{student.name} {student.lastName}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{student.Mark} / {student.TotalMark}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{((student.Mark / student.TotalMark) * 100 ).toFixed(0)}</Text>   
                        </View>
                    </View>
                </Fragment>
        })
    };

    return (
        <Document>
            <Page size="A4" style={styles.page} theme={{direction: currentLange == ARABIC? TextDirection.RightToLeft : TextDirection.LeftToRight }}>
                <ReportTitle  />
                <ReportSubTitle/>
                <TableHead/>
                <TableBody/>
            </Page>
        </Document>
    ) 


}