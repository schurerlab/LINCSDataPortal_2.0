import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';
import axios from 'axios'
import SignaturesZScores from '../../components/signatures/SignaturesZScores';




class SignatureSearch extends Component {

    constructor( props ) {
        super( props );


        this.state = {
            selectedButton:'Signature',
            cids:[],
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

        this.setState({
            upString: event.target.value,
            emptyResults:false
        });

    }
    handleDownGenes = (event) => {

        this.setState({
            dnString: event.target.value,
            emptyResults:false
        });

        
    }

    parseGenes = (callback) => {        

        let upGenes =[];

        if(this.state.upString.includes("\n")){
             upGenes = this.state.upString.split("\n");
        } else if(this.state.upString.includes(",")){
            upGenes = this.state.upString.split(",");
        } else if(this.state.upString.length) {
            upGenes[0] = this.state.upString
        }

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

        this.setState({ up: upGenes,
                 dn: dnGenes}, () => {
            callback();
          });
          
    }

    sendToiLlincs = () => {

        this.setState({loading:true});
        axios.post('http://dev.ilincs.org/api/ilincsR/findConcordancesSC',
        {
            "mode" : "geneList",
            "signatureProfile" : {
                "genesUp" : this.state.up, 
                "genesDown" : this.state.dn
            }
        },
        {
            headers: {
                'Accept' : 'application/json'
            }
        }
    ).then((response) => {
            this.setState({loading:false});

            if (!response.data.sigScores.length) {
                console.log("empty results");
                this.setState({emptyResults:true});
            }

            this.setState({cids:response.data.sigScores});

        }).catch((error) => {
            console.log("error from iLINCS"); 
            this.setState({emptyResults:true});
            this.setState({loading:false});
        })

    }


    getData = () => {

        this.parseGenes(this.sendToiLlincs);

    }

    setExampleGenes(){
        
        let upGenes,dnGenes;
        upGenes = "ESR1,GREB1,LRRC6,GPR143,CCDC170,SCUBE2,ABAT,ST6GALNAC2,CACNA2D2,RHOH,TFF3,IQSEC1,CLSTN2,REPS2,CACNA1H,MRFAP1L1,ATP7B,CA5B,ARMT1,PRLR,CACNG4,XBP1,CRYL1,SLC9A2,ANXA9,ZMAT4,KIAA1324,KIAA1467,SULT2B1,BCAS1,MED13L,SEPT8,ADD1,ZFYVE21,BCAS3,CYFIP2,CHRD,COX6C,TOB1,MREG,SIAH2,GHR,GATA3,KDM2A,COLQ,HTT,SCGN,CA12,KIF16B,PVALB,SOX2,SIRT4,CBFA2T3,BEX4,GPD1L,SPDEF,TGFB3,KIAA0513,ASTN2,RAB5B,SHROOM2,SUOX,CYP46A1,CLU,EFHD1,ASAH1,SIDT1,SLC22A5,ALDH3B2,RHOB,KDM5B,MAGED2,SLC7A8,GADD45G,NCAM2,ETNK2,PTGER3,MCCC2,SUPT4H1,CTPS2,GRIK4,SLC1A2,TCTN1,CERS4,TTC39A,ELOVL2,IGSF3,C11orf80,SLC35E3,ALDH6A1,ADIRF,CPT1A,KIAA0100,ARSD,UNC13B,LCMT1,SNF8,HOXC4,IGFBP2,ZNF652";
        dnGenes = "SLC35G2,THEMIS2,MED17,CDKL1,CCDC88A,STAC,IFI16,MICAL2,GSTP1,SNRNP40,GNAI1,HOXA7,PRKCDBP,BATF3,ETV4,YEATS2,SNAI2,RASAL2,USB1,ISG15,GART,AKR1C1,BIRC3,SKI,CSRP2,TGFBI,TRIP10,PTX3,FST,MMP14,COLGALT1,HPSE,C1R,FXYD5,MICALL1,PSAT1,CERK,GLIPR1,CAPN2,SPTBN1,GPX1,NASP,PRSS12,SPRY2,EPHA2,DSE,TOMM22,MIEF1,PTK7,BCL11A,IGFBP7,MAP1B,COL4A1,FOSL1,TAP2,CSNK1E,SPCS3,POLR2F,JOSD1,BTG3,MEIS2,PHC2,CAV1,NRP2,MAP7D1,SERPINB7,LUZP1,MDFIC,TINAGL1,ADAM19,EGFR,CXCL3,HDAC9,CAV2,ADCY7,SERPINB8,SLC7A1,GPR3,STX11,SRSF4,CASP4,PLAUR,NABP1,ACSL5,BIN1,FSCN1,MSN,TNFAIP3,PIK3CD,YBX1,ETS1,AGPAT4,PDGFC,CXCL8,CXCL2,COL4A2,HRH1,GADD45A,SDHAF3,CTSC";
        
        this.setState({
            upString: upGenes,
            dnString: dnGenes,
            up: upGenes.split(","),
            dn: dnGenes.split(","),
            emptyResults:false
          });
    }

    render() {
        return <div>
            {this.state.loading == false && this.state.cids.length == 0 ?  <form>
                <div className="form-row">
                    <div className="col">
                        <textarea name="styled-textarea" id="styled" type="text" value={this.state.upString} onChange={this.handleUpGenes} placeholder="Enter UP Genes either seperated by coma or new line "/>
                    </div>
                    <div className="col text-center " style={{marginTop:"20em"}}>
                    <a style={{color: "#212529"}} href="#" onClick={() => {this.setExampleGenes()} }>
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

            {this.state.loading &&
            <div>
                <div className="row justify-content-md-center">
                    <div className="col-offset-5">
                        <div className="row text-center lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-offset-4">
                        <p>This analysis might take several minutes!</p>
                    </div>
                </div>
            </div>
            }
            {this.state.cids.length > 0   ?  <SignaturesZScores data={this.state.cids}/> : ''}

        </div>;
    }

}

export default SignatureSearch;

