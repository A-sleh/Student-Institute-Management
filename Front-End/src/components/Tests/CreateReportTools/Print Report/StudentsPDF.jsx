/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import React, { Fragment, useRef, useState } from 'react'
import logo from '../../../../assets/logo.png'
import NOTOKUIFIregular from './Noto_Kufi_Arabic/Zain-Regular.ttf'
import NOTOKUIFIbold from './Noto_Kufi_Arabic/Zain-Bold.ttf'
import { Image, Text, View, Page, Document, StyleSheet,Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

export default function StudentsPDF({data}) {

    Font.register({
        family: "Zain",
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

        spaceBetween : {flex : 1,flexDirection: 'row' ,alignItems:'center',justifyContent:'space-between',color: "#3E3E3E"},

        titleContainer: {flexDirection: 'row',marginTop: 24 , alignSelf: 'center' , width: '100%' , alignItems: 'center'},
        
        logo: { width: 90 , alignSelf: 'center' },

        reportTitle: {  fontSize: 14,  textAlign: 'right' , padding: '3px', lineHeight: '1'},

        addressTitle : {fontSize: 11}, 
        
        invoice : {fontSize: 20},
        
        invoiceNumber : {fontSize: 11}, 
        
        address : {  fontSize: 10},
        
        theader : {marginTop: 5 ,textAlign: 'center',width: '25%',fontSize : 14,paddingTop: 15 ,paddingLeft: 7 ,flex:1,height:50,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { borderRightWidth:0, borderBottomWidth:1},

        tbody:{ fontSize : 12, textAlign: 'center',width: '25%',paddingTop: 15 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1,height:45},

        total:{ fontSize : 10, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{  borderRightWidth:1 },

        toalResult : {fontSize : 12, flex:1 ,width: '100%'},

        arabicText : { fontFamily: "Zain" }
    })

    const ReportTitle = ({student}) => {
        return <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={logo} />
                <View style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , alignItems: 'flex-end'}}>
                    <Text style={[styles.reportTitle,styles.arabicText,{fontSize: '20px',marginBottom: '5'}]}>معهد رويال</Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}>الطالب : {student.name} {student.lastName}</Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}> الاب :{student.fatherName}</Text>
                </View>
            </View>
        </View>
    };

    const ReportSubTitle = () => {
        return <View style={styles.titleContainer}>
                <View style={[styles.spaceBetween,{display: 'flex' ,  width: '100%' }]} >
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}>  الصف : {data.gender}</Text>
                    </View>
                    
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}>  الشعبه : {data.title}</Text>
                    </View>
                    
                    <View>
                        <Text style={[styles.invoiceNumber,styles.arabicText]}>تاريخ التقرير : {format( new Date(data.StartDate) , 'yyyy / MM / dd')}  </Text>
                    </View>

                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}>  تقرير : {data.ReportTitle}</Text>
                    </View>
                    
                </View>
            </View>
        
    };

    const TableHead = () => {
        return <View style={{ width:'100%', flexDirection :'row-reverse'}}>
            <View style={[styles.theader, styles.theader2]}>
                <Text style={styles.arabicText}>الماده</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>العلامه</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>المعدل الماده</Text>   
            </View>
        </View>
    };

    const TableBody = ({exams}) => {
        return exams.map((exam,index)=>{
                return <Fragment key={index}>
                    <View style={{ width:'100%', flexDirection :'row-reverse'}}>
                        <View style={[styles.tbody,{fontSize: 13,marginLeft: 2}]}>
                            <Text style={styles.arabicText}>{exam.subject} </Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{exam.mark} / {exam.maximumMark}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{((exam.mark / exam.maximumMark) * 100 ).toFixed(2)}%</Text>   
                        </View>
                    </View>
                </Fragment>
        })
    };

    const ToalResultFooter = ({student}) => {
        return <View style={{ width:'100%', flexDirection :'row-reverse',marginTop: 10 , marginBottom : 10 ,justifyContent: 'space-between',alignItems:'center'}}>
                <View style={styles.toalResult}>
                    <Text style={[styles.arabicText,{textAlign: 'right',fontSize: 12}]} >المعدل : {student.examAverage}</Text>
                </View>
                <View style={styles.toalResult}>
                    <Text style={[styles.arabicText,{textAlign: 'left' , fontSize: 12}]}>المجموع النهائي : {student.mark} / {student.totalMark} </Text>
                </View>
        </View>
    }

    const ToalResultHeader = ({student,order}) => {
        return <View style={{ width:'100%', flexDirection :'row-reverse',marginTop: 10 ,justifyContent: 'space-between',alignItems:'center'}}>
                <View style={[styles.arabicText,{textAlign: 'right'}]}>
                    <Text style={styles.arabicText}>معدل المذاكرات اليوميه : {student.quizAverage} </Text>
                </View>
                <View style={styles.toalResult}>
                    <Text style={styles.arabicText}>ترتيب الطالب : {order} </Text>
                </View >
            </View>
    }

    const NoteSection = ({title}) => {
        return <View style={{ width:'100%', flexDirection :'column',marginTop: 10 , marginBottom : 10 , textAlign: 'right'}}>
                <View style={{margin: '5px 0'}}>
                    <Text style={styles.arabicText}>: {title}</Text>
                </View>
                <view style={{display: 'flex' , flexDirection: 'column' , gap: 5}}>
                    <Text style={{width: '100%'}}>..............................................................................................................................................................................................</Text>
                    <Text style={{width: '100%'}}>..............................................................................................................................................................................................</Text>
                </view>
        </View>
    }


    return (
        <>
            <Document >
                {
                    data.students.map( (student ,index) => {
                        return <Page size="A4" style={styles.page}>
                                    <ReportTitle  student={student}/>
                                    <ReportSubTitle/>
                                    <ToalResultHeader student={student} order={`${index + 1} / ${data.students.length}`}/>
                                    <TableHead/>
                                    <TableBody exams={student.testMark}/>
                                    <Image src={logo}  style={{position: 'absolute' , left: '50%' , top: '50%' , transform: 'translate(-50%,-50%)' , opacity: '.3' , width: '300px'}}/>
                                    <ToalResultFooter student={student}/>
                                    <View style={{position: 'absolute' , bottom: 20 , right: 20 , left: 20}}>
                                        <NoteSection title={'السلوك وملاحظات الإداره والكادر التدريسي'}/>
                                        <NoteSection title={'ملاحظات ولي الأمر'}/>
                                    </View>
                                </Page>
                    })
                }
                
            </Document>
        </>
    )
}