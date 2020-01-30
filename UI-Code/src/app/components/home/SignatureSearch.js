import React, { Component } from 'react';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table, Radio} from 'react-bootstrap';
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import SignaturesZScores from '../../components/signatures/SignaturesZScores';
import { log } from 'util';




class SignatureSearch extends Component {

    constructor( props ) {
        super( props );


        this.state = {
            selectedButton:'Signature',
            cids:[],
            mode: 'UpDn',
            // mode: 'geneList',
            query: '',
            up:[],
            dn:[],
            upString:'',
            dnString:'',
            geneString:'',
            geneList:[],
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
            disableSubmit: true,
            message: '',
            toResults: false
        };
        this.cancel = '';

        this.handleUpGenes = this.handleUpGenes.bind(this)
        this.handleDownGenes = this.handleDownGenes.bind(this)
        this.handleGeneList = this.handleGeneList.bind(this)
    }
    handleUpGenes = (event) =>  {

        this.setState({
            upString: event.target.value,
            emptyResults:false
        },this.handleDisable);

    }
    handleDownGenes = (event) => {

        this.setState({
            dnString: event.target.value,
            emptyResults:false
        },this.handleDisable);
    }
    
    handleGeneList = (event) => {
        
        this.setState({
            geneString: event.target.value,
            emptyResults:false
        },this.handleDisable);
    }

    handleDisable() {
        
        if (this.state.mode === 'geneList' && !this.state.geneString.length) {            
            this.setState({ disableSubmit: true})
        } else if(this.state.mode === 'UpDn' && (!this.state.upString.length&&!this.state.dnString.length)) {            
            this.setState({ disableSubmit: true})
        } else {
            this.setState({ disableSubmit: false})
        }
        
    }

    parseUpDnGenes = (callback) => {        

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

    parseGeneList = (callback) => {        

        const genes = this.parseGenes(this.state.geneString);
        // if(genes.length > 0) {
        //     this.setState({geneList: genes})
        // }

        this.setState({ geneList: genes}, () => {
            callback();
          });
          
    }

    parseGenes = (geneString) => {
        let genes =[];

        // console.log(geneString);
        
        // console.log("check enters",geneString.includes("\n"));
        // console.log(geneString.split("\n"));
        // console.log(geneString.split(/,;\s\n\t/));
        // console.log(geneString.replace(/\s/g, ''));
        
        

        // geneString = geneString.replace(/\s/g, '');
        // return geneString.split(/,| \n\t/) 
        // genes = geneString.split(/,;\s\n\t/);
        // genes = geneString.split(",");

        if(geneString.includes("\n")){
            genes = geneString.split("\n");
        } else if(geneString.includes(",")){
            genes = geneString.split(",");
        } else if(geneString.length) {
            genes[0] = this.state.upString
        }

        // console.log(genes);        
        return genes 
    }

    sendToiLlincs = () => {
        this.setState({loading:true});
        let postBody;
        if (this.state.mode == "UpDn") {
            // postBody = {             
            //     mode : this.state.mode,
            //     upGene : this.state.upString,
            //     downGene : this.state.dnString                
            // }
            // postBody = 'mode=UpDn&upGene=ZNF740%2CPFKP%2CRPL12%2CABAT%2CEIF4A3%2CMAP3K2%2CRPS6KA1%2CBRAF%2CPLEC%2CFASN%2CDPF2&downGene=EGFR%2CABI1%2CSMARCC1%2CMAP3K7%2COCIAD1%2CCHAMP1%2CMAPK8%2CRBM15%2CYWHAZ%2CPIK3CA%2CSTAT6%2CBRCA1%2CCDKN1A'
            postBody = 'mode='+this.state.mode+'&upGene='+this.state.upString+'&downGene='+this.state.dnString
            // postBody = 'mode='+this.state.mode+'&upGene='+this.state.up+'&downGene='+this.state.dn
        } else {
            // postBody = {             
            //     "mode" : this.state.mode,
            //     "upGene" : this.state.geneString
            //     // "genesDown" : this.state.dn                
            // }
            postBody = 'mode='+this.state.mode+'&upGene='+this.state.geneString
            // postBody = 'mode='+this.state.mode+'&upGene='+this.state.up
        }
        // console.log(postBody)
        axios.post('http://dev3.ccs.miami.edu:8080/sigc-api-test/frontend/concordance',
        // axios.post('http://dev3.ccs.miami.edu:8080/sigc-api/frontend/concordance',

        // {
        //     // "mode" : "geneList",
        //     // "mode" : "UpDn",
        //     "mode" : this.state.mode,
        //     "signatureProfile" : {
        //         "genesUp" : this.state.up, 
        //         "genesDown" : this.state.dn
        //     }
        // },
        postBody,
        {
            withCredentials: true,
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }
    ).then((response) => {
            console.log(response);
            
            this.setState({loading:false});
            // if (!response.data.data.length) {
            //     console.log("empty results");
            //     this.setState({emptyResults:true});
            // } else {
                this.setState({cids:response.data.data},() => this.props.history.push({
                    pathname: '/signatures/signature-search-results',
                    state: { mode: this.state.mode//,
                                // sessionId: response.data.sessionID,
                                // sigCount: response.data.count,
                                // data: this.state.cids
                            }
                }));
            // }         

        }).catch((error) => {
            console.log("error from iLINCS"); 
            this.setState({emptyResults:true});
            this.setState({loading:false});
        })

    }


    getData = () => {

        if (this.state.mode === "UpDn" ) {
            this.parseUpDnGenes(this.sendToiLlincs);
        } else {
            this.parseGeneList(this.sendToiLlincs);
        }
        

    }

    setExampleGenes(){
                
        const genes = "ESR1,GREB1,LRRC6,GPR143,CCDC170,SCUBE2,ABAT,ST6GALNAC2,CACNA2D2,RHOH,TFF3,IQSEC1,CLSTN2,REPS2,CACNA1H,MRFAP1L1,ATP7B,CA5B,ARMT1,PRLR,CACNG4,XBP1,CRYL1,SLC9A2,ANXA9,ZMAT4,KIAA1324,KIAA1467,SULT2B1,BCAS1,MED13L,SEPT8,ADD1,ZFYVE21,BCAS3,CYFIP2,CHRD,COX6C,TOB1,MREG,SIAH2,GHR,GATA3,KDM2A,COLQ,HTT,SCGN,CA12,KIF16B,PVALB,SOX2,SIRT4,CBFA2T3,BEX4,GPD1L,SPDEF,TGFB3,KIAA0513,ASTN2,RAB5B,SHROOM2,SUOX,CYP46A1,CLU,EFHD1,ASAH1,SIDT1,SLC22A5,ALDH3B2,RHOB,KDM5B,MAGED2,SLC7A8,GADD45G,NCAM2,ETNK2,PTGER3,MCCC2,SUPT4H1,CTPS2,GRIK4,SLC1A2,TCTN1,CERS4,TTC39A,ELOVL2,IGSF3,C11orf80,SLC35E3,ALDH6A1,ADIRF,CPT1A,KIAA0100,ARSD,UNC13B,LCMT1,SNF8,HOXC4,IGFBP2,ZNF652";        
    
        this.setState({
            geneString: genes,            
            geneList: genes.split(","), 
            emptyResults:false
          },this.handleDisable);
    }

    setExampleUpDn(){
        
        let upGenes,dnGenes;
        upGenes = "ESR1,GREB1,LRRC6,GPR143,CCDC170,SCUBE2,ABAT,ST6GALNAC2,CACNA2D2,RHOH,TFF3,IQSEC1,CLSTN2,REPS2,CACNA1H,MRFAP1L1,ATP7B,CA5B,ARMT1,PRLR,CACNG4,XBP1,CRYL1,SLC9A2,ANXA9,ZMAT4,KIAA1324,KIAA1467,SULT2B1,BCAS1,MED13L,SEPT8,ADD1,ZFYVE21,BCAS3,CYFIP2,CHRD,COX6C,TOB1,MREG,SIAH2,GHR,GATA3,KDM2A,COLQ,HTT,SCGN,CA12,KIF16B,PVALB,SOX2,SIRT4,CBFA2T3,BEX4,GPD1L,SPDEF,TGFB3,KIAA0513,ASTN2,RAB5B,SHROOM2,SUOX,CYP46A1,CLU,EFHD1,ASAH1,SIDT1,SLC22A5,ALDH3B2,RHOB,KDM5B,MAGED2,SLC7A8,GADD45G,NCAM2,ETNK2,PTGER3,MCCC2,SUPT4H1,CTPS2,GRIK4,SLC1A2,TCTN1,CERS4,TTC39A,ELOVL2,IGSF3,C11orf80,SLC35E3,ALDH6A1,ADIRF,CPT1A,KIAA0100,ARSD,UNC13B,LCMT1,SNF8,HOXC4,IGFBP2,ZNF652";
        // upGenes = "ZNF740,PFKP,RPL12,ABAT,EIF4A3,MAP3K2,RPS6KA1,BRAF,PLEC,FASN,DPF2";
        dnGenes = "SLC35G2,THEMIS2,MED17,CDKL1,CCDC88A,STAC,IFI16,MICAL2,GSTP1,SNRNP40,GNAI1,HOXA7,PRKCDBP,BATF3,ETV4,YEATS2,SNAI2,RASAL2,USB1,ISG15,GART,AKR1C1,BIRC3,SKI,CSRP2,TGFBI,TRIP10,PTX3,FST,MMP14,COLGALT1,HPSE,C1R,FXYD5,MICALL1,PSAT1,CERK,GLIPR1,CAPN2,SPTBN1,GPX1,NASP,PRSS12,SPRY2,EPHA2,DSE,TOMM22,MIEF1,PTK7,BCL11A,IGFBP7,MAP1B,COL4A1,FOSL1,TAP2,CSNK1E,SPCS3,POLR2F,JOSD1,BTG3,MEIS2,PHC2,CAV1,NRP2,MAP7D1,SERPINB7,LUZP1,MDFIC,TINAGL1,ADAM19,EGFR,CXCL3,HDAC9,CAV2,ADCY7,SERPINB8,SLC7A1,GPR3,STX11,SRSF4,CASP4,PLAUR,NABP1,ACSL5,BIN1,FSCN1,MSN,TNFAIP3,PIK3CD,YBX1,ETS1,AGPAT4,PDGFC,CXCL8,CXCL2,COL4A2,HRH1,GADD45A,SDHAF3,CTSC";
        // dnGenes = "EGFR,ABI1,SMARCC1,MAP3K7,OCIAD1,CHAMP1,MAPK8,RBM15,YWHAZ,PIK3CA,STAT6,BRCA1,CDKN1A"
        
        this.setState({
            upString: upGenes,
            dnString: dnGenes,
            up: upGenes.split(","),
            dn: dnGenes.split(","),
            emptyResults:false
          },this.handleDisable);
    }

    handleChange(event){
        this.setState({mode: event.target.name},this.handleDisable)
      }

    render() {
        // // if (this.state.cids.length > 0) {
        // console.log("turesults",this.state.toResults)
        // if (this.state.toResults === true) {
        //     // toResults
        //     // <Redirect to="/signatures/signature-search-results" mode={this.state.mode} data={this.state.cids} /> 
        //     <Redirect to='/signatures/signatures' /> 
        // }   

        return <div>

        {this.state.loading == false && <form>
                <div className="form-row" style={{margin:"12px"}}>
                <div className="col-12 col-sm-12 col-md-4 box">     
                    <div className="card" style={{padding:"20px 20px 0px 20px", minHeight:"177px"}}>
                        {/* <Radio name="signatureOptions" name="sigProfile" value={this.state.mode}
                            checked={this.state.mode === 'sigProfile'}
                            onChange={this.handleChange.bind(this)}> Signature Profile</Radio> */}
                        <Radio name="signatureOptions" name="UpDn" value={this.state.mode} 
                            checked={this.state.mode === 'UpDn'}
                            onChange={this.handleChange.bind(this)}> Up and Down Genes <a className="text-right" style={{color: "#212529", fontSize:'8px'}} href="#" onClick={() => {this.setExampleUpDn()} }>
                            Example
                        </a></Radio>
                        <Radio name="signatureOptions" name="geneList" value={this.state.mode}
                            checked={this.state.mode === 'geneList'}
                            onChange={this.handleChange.bind(this)}> Gene List <a className="text-right" style={{color: "#212529", fontSize:'8px'}} href="#" onClick={() => {this.setExampleGenes()} }>
                            Example
                        </a></Radio>
                        <br />
                        <Button className="btn btn-primary" disabled={this.state.disableSubmit}  onClick={() => {this.getData()} }>
                            Submit Signature
                        </Button>
                        <p className="text-right small">Connectivity analysis powered by <a href="http://ilincs.org" target="_blank">ilincs.org</a></p>
                        {this.state.emptyResults && <p>There are no similar genes for a given set of genes!</p>} 
                    </div>                                   
                </div>
                {this.state.mode === 'UpDn' && <div className="col-12 col-sm-12 col-md-8 box">
                    <div className="card" style={{padding:"10px 10px 16px 10px"}}>
                        <div className="row" style={{padding:"10px"}}>
                            <div className="col col-md-6">
                                <textarea name="styled-textarea" className="textarea-styled" type="text" value={this.state.upString} onChange={this.handleUpGenes} placeholder="Enter UP Genes either seperated by coma or new line "/>
                            </div>
                            <div className="col col-md-6">
                                <textarea name="styled-textarea" className="textarea-styled" type="text" value={this.state.dnString} onChange={this.handleDownGenes}  placeholder="Enter Down Genes either seperated by coma or new line "/>
                            </div>
                        </div>
                    </div>
                </div>}
                {this.state.mode === 'geneList' && <div className="col-12 col-sm-12 col-md-8 box">
                    <div className="card" style={{padding:"10px"}}>
                        <div className="row" style={{padding:"10px"}}>
                            <div className="col col-md-12">
                                <textarea name="styled-textarea" style={{padding:"10px", width: '100%', minHeight: "8em"}} type="text" value={this.state.geneString} onChange={this.handleGeneList} placeholder="Enter Genes either seperated by coma or new line "/>
                            </div>                           
                        </div>
                    </div>
                </div>}
                    
                </div>
            </form> }
            {/* {this.state.loading == false && this.state.cids.length == 0 ?  <form>
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
            </form> : "" } */}

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
            {/* {this.state.cids.length > 0   ?  <SignaturesZScores mode={this.state.mode} data={this.state.cids}/> : ''} */}             
        </div>;
    }

}

export default withRouter(SignatureSearch);

