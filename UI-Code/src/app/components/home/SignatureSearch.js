import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios'
import SignaturesZScores from '../../components/signatures/SignaturesZScores';




class SignatureSearch extends Component {

    constructor( props ) {
        super( props );


        this.state = {
            selectedButton:'Signature',
            cids:[],
            // sigs:[],
            query: '',
            up:[],
            dn:[],
            upString:[],
            dnString:[],
            len:0,
            results:{},
            ge:{},
            pb:{},
            pe:{},
            ep:{},
            me:{},
            sh:{},
            sg:{},
            cells:{},
            loading: false,
            message: '',
        };
        this.cancel = '';

        this.handleUpGenes = this.handleUpGenes.bind(this)
        this.handleDownGenes = this.handleDownGenes.bind(this)
    }
    handleUpGenes = (event) =>  {
        console.log(this.state.upString);
        
        // let upGenes =[];
        // if(this.state.upString.includes("\n")){
        //      upGenes = this.state.upString.split("\n");
        // }else if(this.state.upString.includes(",")){
        //     upGenes = this.state.upString.split(",");
        // }
        // if(upGenes.length > 0) {
        //     this.setState({up: upGenes})
        // }
        this.setState({
            upString: event.target.value,
            emptyResults:false
        });
        console.log(this.state.upString);
    }
    handleDownGenes = (event) => {
        console.log(this.state.dnString);

        // let dnGenes =[];
        // if(this.state.dnString.includes("\n")){
        //     dnGenes = this.state.dnString.split("\n");
        // }else if(this.state.dnString.includes(",")){
        //     dnGenes = this.state.dnString.split(",");
        // }
        // if(dnGenes.length > 0){
        //     this.setState({dn:dnGenes})
        // }
        this.setState({
            dnString: event.target.value,
            emptyResults:false
        });
        console.log(this.state.dnString);
        
    }

    parseGenes = (callback) => {        
        console.log(this.state);

        let upGenes =[];
        console.log(this.state.upString);
        if(this.state.upString.includes("\n")){
             upGenes = this.state.upString.split("\n");
        } else if(this.state.upString.includes(",")){
            upGenes = this.state.upString.split(",");
        } else if(this.state.upString.length) {
            upGenes[0] = this.state.upString
        }
        console.log(upGenes.length);
        if(upGenes.length > 0) {
            this.setState({up: upGenes})
        }

        let dnGenes =[];
        if(this.state.dnString.includes("\n")){
            dnGenes = this.state.dnString.split("\n");
        }else if(this.state.dnString.includes(",")){
            dnGenes = this.state.dnString.split(",");
        } else if(this.state.dnString.length) {
            dnGenes[0] = this.state.dnString
        }
        // if(dnGenes.length > 0){
        //     this.setState({dn: dnGenes})
        // }

        this.setState({ up: upGenes,
                 dn: dnGenes}, () => {
            
            console.log("setState callback")
            console.log(this.state.up);
            console.log(this.state.dn);
            callback();
          });

        // this.setState({
        //     up: upGenes,
        //     dn: dnGenes
        //   });
        
   
          
    }

    sendToiLlincs = () => {
        console.log("sending data to iLINCS")
        this.setState({loading:true});
        axios.post('http://dev.ilincs.org/api/ilincsR/findConcordancesSC',
        {
            "mode"
        :
            "geneList", "signatureProfile"
        :
            {
                "genesUp"
            :
                this.state.up, "genesDown"
            :
                 this.state.dn
            }
        }
    ,
        {
            headers: {
                'Accept'
            :
                'application/json'
            }
        }
    ).then((response) => {
            this.setState({loading:false});
            console.log("back from iLINCS");
            console.log(response.data.sigScores);
            if (!response.data.sigScores.length) {
                console.log("empty results");
                this.setState({emptyResults:true});
            }
            // var newArray = response.data.sigScores.map(el =>{
            //     return el.lincsSigID
            // });
            // console.log(newArray);
            // debugger;
            // this.setState({cids:newArray});

            this.setState({cids:response.data.sigScores});
            // this.props.withRouter
            // this.props.history.push('/signatures/similarity-search');

        }).catch((error) => {
            console.log("error from iLINCS"); 
            // console.log(error.status)
            this.setState({emptyResults:true});
            this.setState({loading:false});
        })

        // //fake data
        // let data = [
        //     {
        //       "lincsSigID": "CPC013_MCF7_6H:BRD-K85266146-001-01-3:10",
        //       "signatureID": "LINCSCP_32385",
        //       "zScores": 5.8983
        //     },
        //     {
        //       "lincsSigID": "LJP008_PC3_24H:D18",
        //       "signatureID": "LINCSCP_151892",
        //       "zScores": 5.6712
        //     },
        //     {
        //       "lincsSigID": "REP.A010_HT29_24H:O17",
        //       "signatureID": "LINCSCP_121485",
        //       "zScores": 5.3838
        //     },
        //     {
        //       "lincsSigID": "CPC006_MCF7_24H:BRD-K64634304-001-01-5:40",
        //       "signatureID": "LINCSCP_30598",
        //       "zScores": 5.3234
        //     },
        //     {
        //       "lincsSigID": "CPC019_PC3_24H:BRD-K88008216-001-01-1:10",
        //       "signatureID": "LINCSCP_47162",
        //       "zScores": 5.1273
        //     },
        //     {
        //       "lincsSigID": "REP.A017_MCF7_24H:I03",
        //       "signatureID": "LINCSCP_140431",
        //       "zScores": 5.0539
        //     },
        //     {
        //       "lincsSigID": "CPC006_CORL23_6H:BRD-K43620258-001-01-6:80",
        //       "signatureID": "LINCSCP_12633",
        //       "zScores": 4.8997
        //     },
        //     {
        //         "lincsSigID": "REP.A024_MCF7_24H:L16",
        //         "signatureID": "LINCSCP_143030",
        //         "zScores": 4.8346
        //       },
        //       {
        //         "lincsSigID": "REP.A024_MCF7_24H:C01",
        //         "signatureID": "LINCSCP_142811",
        //         "zScores": 4.8285
        //       },
        //       {
        //         "lincsSigID": "REP.A004_MCF7_24H:L10",
        //         "signatureID": "LINCSCP_135827",
        //         "zScores": 4.8097
        //       },
        //       {
        //         "lincsSigID": "CPC019_VCAP_24H:BRD-K82092559-001-01-6:10",
        //         "signatureID": "LINCSCP_59271",
        //         "zScores": 4.7704
        //       },
        //       {
        //         "lincsSigID": "CPC018_PHH_24H:BRD-K37846922-001-04-5:10",
        //         "signatureID": "LINCSCP_50210",
        //         "zScores": 4.7434
        //       },
        //       {
        //         "lincsSigID": "DOS043_HT29_24H:BRD-K08663380-001-01-0:5.3",
        //         "signatureID": "LINCSCP_27646",
        //         "zScores": 4.7406
        //       },
        //       {
        //         "lincsSigID": "CPC019_HCC515_6H:BRD-K86899078-001-01-2:10",
        //         "signatureID": "LINCSCP_20674",
        //         "zScores": 4.7321
        //       },
        //       {
        //         "lincsSigID": "LJP006_SKBR3_24H:M18",
        //         "signatureID": "LINCSCP_163760",
        //         "zScores": 4.6878
        //       },
        //       {
        //         "lincsSigID": "LJP009_HUVEC_24H:B24",
        //         "signatureID": "LINCSCP_129059",
        //         "zScores": 4.6668
        //       },
        //       {
        //         "lincsSigID": "MUC.CP004_MCF7_6H:BRD-A19037878-001-03-1:0.3704",
        //         "signatureID": "LINCSCP_37746",
        //         "zScores": 4.6577
        //       },
        //       {
        //         "lincsSigID": "DOS033_A375_24H:BRD-K21389281-001-01-5:4.83",
        //         "signatureID": "LINCSCP_3137",
        //         "zScores": 4.5734
        //       },
        //       {
        //         "lincsSigID": "LJP002_MCF7_6H:BRD-K42728290-001-02-6:0.08",
        //         "signatureID": "LINCSCP_36913",
        //         "zScores": 4.5706
        //       },
        //       {
        //         "lincsSigID": "LJP001_SKBR3_24H:BRD-K19540840-001-04-5:2",
        //         "signatureID": "LINCSCP_51329",
        //         "zScores": 4.5132
        //       },
        //       {
        //         "lincsSigID": "CPC006_MCF7_24H:BRD-K67844266-001-01-3:11.1",
        //         "signatureID": "LINCSCP_30606",
        //         "zScores": 4.5096
        //       },
        //       {
        //         "lincsSigID": "REP.A017_YAPC_24H:D16",
        //         "signatureID": "LINCSCP_172130",
        //         "zScores": 4.5085
        //       },
        //       {
        //         "lincsSigID": "REP.A004_MCF7_24H:L09",
        //         "signatureID": "LINCSCP_135826",
        //         "zScores": 4.4672
        //       },
        //       {
        //         "lincsSigID": "REP.A027_MCF7_24H:D22",
        //         "signatureID": "LINCSCP_143936",
        //         "zScores": 4.4622
        //       },
        //       {
        //         "lincsSigID": "LJP007_SKL_24H:P19",
        //         "signatureID": "LINCSCP_165596",
        //         "zScores": 4.4541
        //       },
        //       {
        //         "lincsSigID": "REP.A024_MCF7_24H:L18",
        //         "signatureID": "LINCSCP_143032",
        //         "zScores": 4.4535
        //       },
        //       {
        //         "lincsSigID": "PCLB001_MCF7_6H:BRD-A19037878-001-02-3:3.33",
        //         "signatureID": "LINCSCP_67655",
        //         "zScores": 4.434
        //       },
        //       {
        //         "lincsSigID": "MUC.CP001_MCF7_6H:BRD-A19037878-001-03-1:1.1111",
        //         "signatureID": "LINCSCP_37059",
        //         "zScores": 4.4316
        //       },
        //       {
        //         "lincsSigID": "MUC.CP004_MCF7_6H:BRD-A19037878-001-03-1:1.1111",
        //         "signatureID": "LINCSCP_37748",
        //         "zScores": 4.428
        //       },
        //       {
        //         "lincsSigID": "CPC013_MCF7_6H:BRD-A32161980-001-01-1:10",
        //         "signatureID": "LINCSCP_32281",
        //         "zScores": 4.4126
        //       },
        //       {
        //         "lincsSigID": "CPC014_MCF7_6H:BRD-K89085489-001-10-9:10",
        //         "signatureID": "LINCSCP_240510",
        //         "zScores": 4.4053
        //       },
        //       {
        //         "lincsSigID": "CPC009_MCF7_6H:BRD-A11087911-001-05-8:10",
        //         "signatureID": "LINCSCP_31434",
        //         "zScores": 4.4001
        //       },
        //       {
        //         "lincsSigID": "REP.A017_MCF7_24H:I10",
        //         "signatureID": "LINCSCP_140438",
        //         "zScores": 4.3957
        //       },
        //       {
        //         "lincsSigID": "REP.A025_MCF7_24H:I02",
        //         "signatureID": "LINCSCP_143310",
        //         "zScores": 4.3874
        //       },
        //       {
        //         "lincsSigID": "LJP001_SKBR3_24H:BRD-K76908866-001-03-5:0.4",
        //         "signatureID": "LINCSCP_51456",
        //         "zScores": 4.3204
        //       },
        //       {
        //         "lincsSigID": "REP.A005_MCF7_24H:A22",
        //         "signatureID": "LINCSCP_135953",
        //         "zScores": 4.3164
        //       },
        //       {
        //         "lincsSigID": "CPC019_MCF7_6H:BRD-K50204028-001-01-8:10",
        //         "signatureID": "LINCSCP_34034",
        //         "zScores": 4.3151
        //       },
        //       {
        //         "lincsSigID": "REP.A023_MCF7_24H:F01",
        //         "signatureID": "LINCSCP_142523",
        //         "zScores": 4.3031
        //       },
        //       {
        //         "lincsSigID": "CPC012_MCF7_6H:BRD-A41250203-001-01-2:10",
        //         "signatureID": "LINCSCP_32010",
        //         "zScores": 4.2974
        //       },
        //       {
        //         "lincsSigID": "NMH001_FIBRNPC_24H:BRD-K27237442-001-01-6:10",
        //         "signatureID": "LINCSCP_206994",
        //         "zScores": 4.2799
        //       },
        //       {
        //         "lincsSigID": "CPC020_PC3_24H:BRD-K32582686-001-01-3:10",
        //         "signatureID": "LINCSCP_272025",
        //         "zScores": 4.2775
        //       },
        //       {
        //         "lincsSigID": "DOS018_VCAP_6H:BRD-K44755254-001-01-3:5",
        //         "signatureID": "LINCSCP_62731",
        //         "zScores": 4.2755
        //       },
        //       {
        //         "lincsSigID": "LJP008_PC3_24H:O22",
        //         "signatureID": "LINCSCP_152142",
        //         "zScores": 4.2616
        //       },
        //       {
        //         "lincsSigID": "CPC016_MCF7_6H:BRD-K79353516-001-03-5:10",
        //         "signatureID": "LINCSCP_33243",
        //         "zScores": 4.2586
        //       },
        //       {
        //         "lincsSigID": "DOS040_HT29_24H:BRD-K91924645-001-01-5:5",
        //         "signatureID": "LINCSCP_27622",
        //         "zScores": 4.2576
        //       },
        //       {
        //         "lincsSigID": "ERG010_VCAP_6H:BRD-K67236726-001-01-6:9.784",
        //         "signatureID": "LINCSCP_64793",
        //         "zScores": 4.2549
        //       },
        //       {
        //         "lincsSigID": "REP.A028_YAPC_24H:D13",
        //         "signatureID": "LINCSCP_176077",
        //         "zScores": 4.2335
        //       },
        //       {
        //         "lincsSigID": "LJP007_SKL_24H:G09",
        //         "signatureID": "LINCSCP_165384",
        //         "zScores": 4.2292
        //       },
        //       {
        //         "lincsSigID": "DOS033_MCF7_24H:BRD-K81418486:10",
        //         "signatureID": "LINCSCP_67440",
        //         "zScores": 4.2273
        //       },
        //       {
        //         "lincsSigID": "LJP006_SKBR3_3H:P05",
        //         "signatureID": "LINCSCP_164166",
        //         "zScores": 4.22
        //       },
        //       {
        //         "lincsSigID": "MUC.CP004_MCF7_6H:BRD-K81418486-001-13-7:3.3333",
        //         "signatureID": "LINCSCP_37835",
        //         "zScores": 4.2037
        //       },
        //       {
        //         "lincsSigID": "LJP001_SKBR3_24H:BRD-K19540840-001-04-5:10",
        //         "signatureID": "LINCSCP_51328",
        //         "zScores": 4.2037
        //       },
        //       {
        //         "lincsSigID": "CPD002_PC3_6H:BRD-K04196797-001-17-8:10",
        //         "signatureID": "LINCSCP_47700",
        //         "zScores": 4.1972
        //       },
        //       {
        //         "lincsSigID": "MUC.CP006_MCF7_6H:BRD-A19037878-001-03-1:10",
        //         "signatureID": "LINCSCP_38265",
        //         "zScores": 4.186
        //       },
        //       {
        //         "lincsSigID": "CPC011_HT29_6H:BRD-K47278471-003-21-4:10",
        //         "signatureID": "LINCSCP_225720",
        //         "zScores": 4.1851
        //       },
        //       {
        //         "lincsSigID": "MUC.CP004_MCF7_6H:BRD-K81418486-001-13-7:10",
        //         "signatureID": "LINCSCP_37833",
        //         "zScores": 4.1811
        //       },
        //       {
        //         "lincsSigID": "NMH001_FIBRNPC_24H:BRD-K83836748-001-01-7:10",
        //         "signatureID": "LINCSCP_13046",
        //         "zScores": 4.1806
        //       },
        //       {
        //         "lincsSigID": "CPC012_PHH_24H:BRD-K88964386-001-01-9:10",
        //         "signatureID": "LINCSCP_281323",
        //         "zScores": 4.1708
        //       },
        //       {
        //         "lincsSigID": "DOS046_MCF7_24H:BRD-K51358551-001-01-6:5",
        //         "signatureID": "LINCSCP_34872",
        //         "zScores": 4.1648
        //       },
        //       {
        //         "lincsSigID": "CPC016_MCF7_24H:BRD-K54330070-001-07-1:10",
        //         "signatureID": "LINCSCP_33098",
        //         "zScores": 4.1595
        //       },
        //       {
        //         "lincsSigID": "MUC.CP006_MCF7_24H:BRD-K51290057-001-01-0:3.3333",
        //         "signatureID": "LINCSCP_38197",
        //         "zScores": 4.1525
        //       },
        //       {
        //         "lincsSigID": "CPC005_MCF7_6H:BRD-K18518344-001-03-5:10",
        //         "signatureID": "LINCSCP_30363",
        //         "zScores": 4.1443
        //       },
        //       {
        //         "lincsSigID": "REP.A023_MCF7_24H:H07",
        //         "signatureID": "LINCSCP_142571",
        //         "zScores": 4.1427
        //       },
        //       {
        //         "lincsSigID": "REP.A003_MCF7_24H:P17",
        //         "signatureID": "LINCSCP_135570",
        //         "zScores": 4.1422
        //       },
        //       {
        //         "lincsSigID": "LJP006_HT29_24H:K01",
        //         "signatureID": "LINCSCP_116715",
        //         "zScores": 4.13
        //       },
        //       {
        //         "lincsSigID": "MUC.CP004_MCF7_6H:BRD-A19037878-001-03-1:10",
        //         "signatureID": "LINCSCP_37747",
        //         "zScores": 4.1174
        //       },
        //       {
        //         "lincsSigID": "MUC.CP002_MCF7_6H:BRD-K67844266-001-01-3:3.7",
        //         "signatureID": "LINCSCP_37367",
        //         "zScores": 4.1125
        //       },
        //       {
        //         "lincsSigID": "REP.A024_MCF7_24H:P23",
        //         "signatureID": "LINCSCP_143133",
        //         "zScores": 4.0993
        //       },
        //       {
        //         "lincsSigID": "REP.A009_MCF7_24H:G23",
        //         "signatureID": "LINCSCP_137524",
        //         "zScores": 4.0967
        //       },
        //       {
        //         "lincsSigID": "REP.A028_YAPC_24H:P10",
        //         "signatureID": "LINCSCP_176350",
        //         "zScores": 4.0801
        //       },
        //       {
        //         "lincsSigID": "REP.A016_PC3_24H:E16",
        //         "signatureID": "LINCSCP_158196",
        //         "zScores": 4.0755
        //       },
        //       {
        //         "lincsSigID": "CPC005_MCF7_6H:BRD-A19037878:10",
        //         "signatureID": "LINCSCP_67249",
        //         "zScores": 4.0479
        //       },
        //       {
        //         "lincsSigID": "LJP008_MCF7_24H:G03",
        //         "signatureID": "LINCSCP_133741",
        //         "zScores": 4.0458
        //       },
        //       {
        //         "lincsSigID": "DOSBIO001_MCF7_24H:BRD-A19037878:3.33333",
        //         "signatureID": "LINCSCP_67493",
        //         "zScores": 4.0342
        //       },
        //       {
        //         "lincsSigID": "HOG002_MCF7_6H:BRD-A68009927-003-02-9:10",
        //         "signatureID": "LINCSCP_36058",
        //         "zScores": 4.0213
        //       },
        //       {
        //         "lincsSigID": "CPC013_PC3_24H:BRD-K64785675-001-01-6:10",
        //         "signatureID": "LINCSCP_270801",
        //         "zScores": 4.0201
        //       },
        //       {
        //         "lincsSigID": "CPC018_MCF7_24H:BRD-K97399794-001-10-4:10",
        //         "signatureID": "LINCSCP_242163",
        //         "zScores": 4.0157
        //       },
        //       {
        //         "lincsSigID": "CVD001_HEPG2_24H:BRD-A44244100-001-01-6:10",
        //         "signatureID": "LINCSCP_23316",
        //         "zScores": 4.0129
        //       },
        //       {
        //         "lincsSigID": "MUC.CP006_MCF7_6H:BRD-K17743125-001-01-9:0.3704",
        //         "signatureID": "LINCSCP_38289",
        //         "zScores": 4.0095
        //       },
        //       {
        //         "lincsSigID": "PCLB002_HEPG2_24H:BRD-K98645985:0.04",
        //         "signatureID": "LINCSCP_23936",
        //         "zScores": 4.0069
        //       },
        //       {
        //         "lincsSigID": "REP.A021_MCF7_24H:I08",
        //         "signatureID": "LINCSCP_141876",
        //         "zScores": 4.0012
        //       },
        //       {
        //         "lincsSigID": "CPC014_MCF7_24H:BRD-K62012036-001-06-0:10",
        //         "signatureID": "LINCSCP_32516",
        //         "zScores": 3.9973
        //       },
        //       {
        //         "lincsSigID": "LJP006_MCF7_3H:A15",
        //         "signatureID": "LINCSCP_132907",
        //         "zScores": 3.9951
        //       },
        //       {
        //         "lincsSigID": "NMH001_FIBRNPC_24H:BRD-K58442346-001-01-1:10",
        //         "signatureID": "LINCSCP_13038",
        //         "zScores": 3.9909
        //       },
        //       {
        //         "lincsSigID": "LJP006_SKBR3_24H:P10",
        //         "signatureID": "LINCSCP_163818",
        //         "zScores": 3.9752
        //       },
        //       {
        //         "lincsSigID": "CPC020_MCF7_24H:BRD-K76723084-001-18-2:10",
        //         "signatureID": "LINCSCP_34148",
        //         "zScores": 3.9725
        //       },
        //       {
        //         "lincsSigID": "CRCGN001_HA1E_6H:BRD-K53397409-001-07-3:20.8",
        //         "signatureID": "LINCSCP_212389",
        //         "zScores": 3.971
        //       },
        //       {
        //         "lincsSigID": "LJP006_SKBR3_24H:D07",
        //         "signatureID": "LINCSCP_163546",
        //         "zScores": 3.9636
        //       },
        //       {
        //         "lincsSigID": "REP.A015_YAPC_24H:F22",
        //         "signatureID": "LINCSCP_171461",
        //         "zScores": 3.9545
        //       },
        //       {
        //         "lincsSigID": "HDAC002_MCF7_6H:BRD-K02130563-001-05-6:0.078125",
        //         "signatureID": "LINCSCP_35557",
        //         "zScores": 3.9533
        //       },
        //       {
        //         "lincsSigID": "DOS018_VCAP_24H:BRD-K19876534-001-01-0:5.04",
        //         "signatureID": "LINCSCP_62630",
        //         "zScores": 3.9485
        //       },
        //       {
        //         "lincsSigID": "LJP002_MCF7_6H:BRD-K08799216-001-01-2:2",
        //         "signatureID": "LINCSCP_36883",
        //         "zScores": 3.9427
        //       },
        //       {
        //         "lincsSigID": "LJP006_MCF7_3H:D02",
        //         "signatureID": "LINCSCP_132960",
        //         "zScores": 3.9404
        //       },
        //       {
        //         "lincsSigID": "KMS002_NOMO1_6H:BRD-K03073752-001-02-5:0.12",
        //         "signatureID": "LINCSCP_42008",
        //         "zScores": 3.94
        //       },
        //       {
        //         "lincsSigID": "REP.A024_MCF7_24H:L14",
        //         "signatureID": "LINCSCP_143028",
        //         "zScores": 3.9385
        //       },
        //       {
        //         "lincsSigID": "REP.A022_MCF7_24H:K24",
        //         "signatureID": "LINCSCP_142294",
        //         "zScores": 3.9312
        //       },
        //       {
        //         "lincsSigID": "CPC014_MCF7_24H:BRD-K77008974-001-01-6:10",
        //         "signatureID": "LINCSCP_32539",
        //         "zScores": 3.9276
        //       },
        //       {
        //         "lincsSigID": "REP.A021_HA1E_24H:N16",
        //         "signatureID": "LINCSCP_96783",
        //         "zScores": 3.927
        //       },
        //       {
        //         "lincsSigID": "CPC020_VCAP_6H:BRD-K22031190-001-16-0:10",
        //         "signatureID": "LINCSCP_296258",
        //         "zScores": 3.9244
        //       },
        //       {
        //         "lincsSigID": "CPC005_MCF7_6H:BRD-K21680192-300-06-0:10",
        //         "signatureID": "LINCSCP_30365",
        //         "zScores": 3.9241
        //       },
        //       {
        //         "lincsSigID": "MUC.CP005_MCF7_6H:BRD-K81418486-001-22-8:10",
        //         "signatureID": "LINCSCP_67624",
        //         "zScores": 3.9177
        //       },
        //       {
        //         "lincsSigID": "REP.A020_MCF7_24H:F02",
        //         "signatureID": "LINCSCP_141444",
        //         "zScores": 3.9165
        //       },
        //       {
        //         "lincsSigID": "MUC.CP006_MCF7_6H:BRD-K81418486-001-22-8:10",
        //         "signatureID": "LINCSCP_67645",
        //         "zScores": 3.9155
        //       },
        //       {
        //         "lincsSigID": "CPC006_A549_6H:BRD-K19922318-001-01-4:10",
        //         "signatureID": "LINCSCP_4729",
        //         "zScores": 3.9093
        //       },
        //       {
        //         "lincsSigID": "LJP001_MCF7_6H:BRD-K92571446-001-01-4:2",
        //         "signatureID": "LINCSCP_36731",
        //         "zScores": 3.9086
        //       },
        //       {
        //         "lincsSigID": "HDAC002_MCF7_6H:BRD-K02130563-001-05-6:0.15625",
        //         "signatureID": "LINCSCP_35558",
        //         "zScores": 3.9002
        //       },
        //       {
        //         "lincsSigID": "CPC014_MCF7_24H:BRD-K35483542-001-04-9:10",
        //         "signatureID": "LINCSCP_240295",
        //         "zScores": 3.8975
        //       },
        //       {
        //         "lincsSigID": "DOS001_VCAP_6H:BRD-K17169073-001-01-9:5.02",
        //         "signatureID": "LINCSCP_59738",
        //         "zScores": 3.8921
        //       },
        //       {
        //         "lincsSigID": "LJP008_MCF7_24H:E14",
        //         "signatureID": "LINCSCP_133710",
        //         "zScores": 3.8884
        //       },
        //       {
        //         "lincsSigID": "MUC.CP006_MCF7_6H:BRD-A19037878-001-02-3:10",
        //         "signatureID": "LINCSCP_67636",
        //         "zScores": 3.8767
        //       }
        // ];
        // this.setState({loading:false});
        // this.setState({cids:data});
    }


    getData = () => {


        console.log("before parsing");
        this.parseGenes(this.sendToiLlincs);
        // console.log("after parsing");        
        // console.log(this.state.up);
        // console.log(this.state.dn);

    }

    setExampleGenes(){
        // console.log(e);
        
        // e.preventDefault();
        console.log("setExampleGenes function")
        // this.handleUpGenes("1,2,3");
        // this.handleDownGenes("a,b,c");
        let upGenes,dnGenes;
        upGenes = "ESR1,GREB1,LRRC6,GPR143,CCDC170,SCUBE2,ABAT,ST6GALNAC2,CACNA2D2,RHOH,TFF3,IQSEC1,CLSTN2,REPS2,CACNA1H,MRFAP1L1,ATP7B,CA5B,ARMT1,PRLR,CACNG4,XBP1,CRYL1,SLC9A2,ANXA9,ZMAT4,KIAA1324,KIAA1467,SULT2B1,BCAS1,MED13L,SEPT8,ADD1,ZFYVE21,BCAS3,CYFIP2,CHRD,COX6C,TOB1,MREG,SIAH2,GHR,GATA3,KDM2A,COLQ,HTT,SCGN,CA12,KIF16B,PVALB,SOX2,SIRT4,CBFA2T3,BEX4,GPD1L,SPDEF,TGFB3,KIAA0513,ASTN2,RAB5B,SHROOM2,SUOX,CYP46A1,CLU,EFHD1,ASAH1,SIDT1,SLC22A5,ALDH3B2,RHOB,KDM5B,MAGED2,SLC7A8,GADD45G,NCAM2,ETNK2,PTGER3,MCCC2,SUPT4H1,CTPS2,GRIK4,SLC1A2,TCTN1,CERS4,TTC39A,ELOVL2,IGSF3,C11orf80,SLC35E3,ALDH6A1,ADIRF,CPT1A,KIAA0100,ARSD,UNC13B,LCMT1,SNF8,HOXC4,IGFBP2,ZNF652";
        dnGenes = "SLC35G2,THEMIS2,MED17,CDKL1,CCDC88A,STAC,IFI16,MICAL2,GSTP1,SNRNP40,GNAI1,HOXA7,PRKCDBP,BATF3,ETV4,YEATS2,SNAI2,RASAL2,USB1,ISG15,GART,AKR1C1,BIRC3,SKI,CSRP2,TGFBI,TRIP10,PTX3,FST,MMP14,COLGALT1,HPSE,C1R,FXYD5,MICALL1,PSAT1,CERK,GLIPR1,CAPN2,SPTBN1,GPX1,NASP,PRSS12,SPRY2,EPHA2,DSE,TOMM22,MIEF1,PTK7,BCL11A,IGFBP7,MAP1B,COL4A1,FOSL1,TAP2,CSNK1E,SPCS3,POLR2F,JOSD1,BTG3,MEIS2,PHC2,CAV1,NRP2,MAP7D1,SERPINB7,LUZP1,MDFIC,TINAGL1,ADAM19,EGFR,CXCL3,HDAC9,CAV2,ADCY7,SERPINB8,SLC7A1,GPR3,STX11,SRSF4,CASP4,PLAUR,NABP1,ACSL5,BIN1,FSCN1,MSN,TNFAIP3,PIK3CD,YBX1,ETS1,AGPAT4,PDGFC,CXCL8,CXCL2,COL4A2,HRH1,GADD45A,SDHAF3,CTSC";
        // console.log(this.state);
        
        this.setState({
            upString: upGenes,
            dnString: dnGenes,
            up: upGenes.split(","),
            dn: dnGenes.split(","),
            emptyResults:false
          });
        
        //   console.log(this.state.upString);
        //   console.log(this.state.dnString);
          
        // this.handleUpGenes();
        // this.handleDownGenes();
    }

    render() {
        return <div>
            {this.state.loading == false && this.state.cids.length == 0 ?  <form>
                <div className="form-row">
                    <div className="col">
                        <textarea name="styled-textarea" id="styled" type="text" value={this.state.upString} onChange={this.handleUpGenes} placeholder="Enter UP Genes either seperated by coma or new line "/>
                    </div>
                    <div className="col text-center " style={{marginTop:"20em"}}>
                    <a href="#" onClick={() => {this.setExampleGenes()} }>
                        Example
                    </a>
                    <br />
                    <Button className="btn btn-primary  mb-2" disabled={this.state.dnString.length==0 && this.state.upString.length==0}  onClick={() => {this.getData()} }>
                        Submit
                    </Button>
                    {this.state.emptyResults && <p>There are no similar genes for a given set of genes!</p>}
                        </div>
                    <div className="col">
                        <textarea name="styled-textarea" id="styled" type="text" value={this.state.dnString} onChange={this.handleDownGenes}  placeholder="Enter Down Genes either seperated by coma or new line "/>
                    </div>
                </div>
            </form> : "" }

            <div className="row">
                <div className="col-offset-5">
                 {this.state.loading == true ?   <div className="row text-center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> : "" }
                </div>
            </div>
            {this.state.cids.length > 0   ?  <SignaturesZScores data={this.state.cids}/> : ''}

        </div>;
    }

}

export default SignatureSearch;

