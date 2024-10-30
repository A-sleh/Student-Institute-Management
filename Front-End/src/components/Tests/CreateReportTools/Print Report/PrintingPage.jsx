
import React, { Fragment } from 'react'
import logo from '../../../../assets/logo.png'
import NOTOKUIFIregular from './Noto_Kufi_Arabic/Zain-Regular.ttf'
import NOTOKUIFIbold from './Noto_Kufi_Arabic/Zain-Bold.ttf'
import { Image, Text, View, Page, Document, StyleSheet,Font } from '@react-pdf/renderer';
import { TextDirection } from '@react-pdf-viewer/core';

export default function PrintingPage({data}) {

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

        titleContainer: {flexDirection: 'row',marginTop: 14 , alignSelf: 'center' , width: '100%'},
        
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
                <View style={{display: 'flex' , flexDirection: 'column' , justifyContent: 'center' , alignItems: 'flex-end'}}>
                    <Text style={[styles.reportTitle,styles.arabicText,{fontSize: '20px',marginBottom: '5'}]}>معهد رويال</Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}>تقرير : {"الشهر الاول"}</Text>
                    <Text style={[styles.reportTitle,styles.arabicText]}>تاريخ التقرير : {"اب"}  </Text>
                    
                </View>
            </View>
        </View>
    };

    const ReportSubTitle = () => {
        return <>
            <View style={styles.titleContainer}>
                <View style={[styles.spaceBetween,{display: 'flex' ,  width: '100%' }]} >
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}>  رتبه : التاسع</Text>
                    </View>
                    
                    <View>
                        <Text style={[styles.addressTitle,styles.arabicText]}>  شعبه : المميزون</Text>
                    </View>
                </View>
            </View>
        </>
    };

    const TableHead = () => {
        return <View style={{ width:'100%', flexDirection :'row-reverse'}}>
            <View style={[styles.theader, styles.theader2]}>
                <Text style={styles.arabicText}>الترتيب</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>اسم الطالب</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>المجموع</Text>   
            </View>
            <View style={styles.theader}>
                <Text style={styles.arabicText}>المعدل النهائي</Text>   
            </View>
        </View>
    };

    const TableBody = () => {
        return data.data.map((info,index)=>{
                return <Fragment key={index}>
                    <View style={{ width:'100%', flexDirection :'row-reverse'}}>
                        <View style={[styles.tbody, styles.tbody2]}>
                            <Text >{index + 1}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{info.name} </Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{info.mark} / {info.totalMark}</Text>   
                        </View>
                        <View style={styles.tbody}>
                            <Text>{((info.mark / info.totalMark) * 100 ).toFixed(0)}</Text>   
                        </View>
                    </View>
                </Fragment>
        })
    };

    return (
        <Document>
            <Page size="A4" style={styles.page} theme={{direction: TextDirection.RightToLeft}}>
                <ReportTitle  />
                <ReportSubTitle/>
                <TableHead/>
                <TableBody/>
            </Page>
        </Document>
    ) 


}