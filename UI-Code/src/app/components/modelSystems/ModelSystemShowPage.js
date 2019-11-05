import React from 'react'
import { connect } from 'react-redux'
import { changeShowModelSystem } from "../../redux/fetch/get-modelsystem"
import ReagentDatasets from "../../components/datasets/ReagentDatasets"
let csl = { 'fontSize': '0.8em', 'fontWeight':'350', fontFamily:"Helvetica Neue"};
class ModelSystemShowPage extends React.Component {

  state = {
    notFound: false
  }

  componentDidMount() {
    if (!this.props.showModelSystem && this.state.notFound === false) {
        console.log(this.props.id);
      this.props.changeShowModelSystem(parseInt(this.props.id, 10))
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.showModelSystem && !prevProps.showModelSystem) {
      this.setState({notFound: true})
    }
  }

  componentWillUnmount() {
    let newTitle = document.querySelector('title')
    newTitle.innerHTML = "SignatureCommonsUI"
  }

  render() {
    if (this.props.showModelSystem) {
      // Change title of the page to model system name
      let title = document.querySelector('title')
      title.innerHTML = `${this.props.showModelSystem.name}`

      let sms = this.props.showModelSystem
      return (
        <div style={csl}>
          <div>
            <h3  className="text-center title-small"
              style = {{marginBottom: "40px",color: "#4CC189"}}>{sms.name}
            </h3>
            <hr style={{borderTop: "1px solid #4CC189"}} />
          </div>
          <div className="row">
            <div className="col-8">
              <h5 style={{color:"#4CC189"}}>Metadata</h5>

              <table className="table">
              <tbody>
                <tr style={{}}>
                  <th scope="row"  style={{width:"20%",padding:".25em"}}>LINCS ID :</th>
                  <td  style={{padding:".25em",align:"right"}}>{sms.lcl}</td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Name</th>
                  <td style={{padding:".25em"}}>{sms.name}</td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Alternative IDs</th>
                  <td style={{padding:".25em"}}></td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Category</th>
                  <td style={{padding:".25em"}}>{sms.category}</td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Disease</th>
                  <td style={{padding:".25em"}}>{sms.disease}</td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Tissue</th>
                  <td style={{padding:".25em"}}>{sms.tissue}</td>
                </tr>
                <tr>
                  <th scope="row" style={{width:"20%",padding:".25em"}}>Organ</th>
                  <td style={{padding:".25em"}}>{sms.organ}</td>
                </tr>
              </tbody>
             </table>
            </div>
              <div className="col-1">
              </div>
            <div className="col-lg-3 col-sm-12" style={{ border: "0.1px solid #bdc3c7"}}>
                <br/>
              <h5 className="text-center" style={{color:"#4CC189"}}>{sms.name} Signatures</h5>
              <table className="table-pert"  >
                <tbody>
               <tr  >
                  <th style={{width:"50%",padding:".25em",fontWeight:"200"}} >Gene Expression :</th>
                  <td className="pull-left" style={{padding:".25em"}}>
                   <a href={'/beta/signatures?signature=Gene Expressions&class=cell line&term='+sms.name}> <b>{sms.signatures["gene expression"] ? sms.signatures["gene expression"]: "-"}</b> </a>
                  </td>
                </tr>
               <tr  >
                  <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Epigenetic</th>
                  <td style={{padding:".25em"}}>
                    <a href={'/beta/signatures?signature=epigenetic&class=cell line&term='+sms.name}>  <b>  {sms.signatures["epigenetic"] ? sms.signatures["epigenetic"]: "-"}</b> </a>

                  </td>
                </tr>
               <tr  >
                  <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Protein Binding : </th>
                  <td style={{padding:".25em"}}>
                    <a href={'/beta/signatures?signature=binding&class=cell line&term='+sms.name}> <b>  {sms.signatures["binding"] ? sms.signatures["binding"]: "-"} </b> </a>

                  </td>
                </tr>
               <tr  >
                 <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Protein Expression:</th>
                 <td style={{padding:".25em"}}>
                   <a href={'/beta/signatures?signature=proteomics&class=cell line&term='+sms.name}>  <b>  {sms.signatures["proteomics"] ? sms.signatures["proteomics"]: "-"}</b> </a>
                 </td>
               </tr>
                <tr  >
                  <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Cell Phenotype :</th>
                  <td style={{padding:".25em"}}>
                    <a href={'/beta/signatures?signature=imaging&class=cell line&term='+sms.name}>  <b>   {sms.signatures["imaging"] ? sms.signatures["imaging"]: "-"} </b> </a>
                  </td>
                </tr>
             <tr  >
                  <th  scope="row" style={{width:"50%",padding:".25em",fontWeight:"200"}}>Cell Viability :</th>
                  <td style={{padding:".25em"}}>
                    <a href={'/beta/signatures?signature=cell viability&class=cell line&term='+sms.name}> <b>  {sms.signatures["cell viability"] ? sms.signatures["cell viability"]: "-"}</b> </a>
                  </td>
                </tr>
                </tbody>
              </table>
        </div>
            </div>
            <ReagentDatasets id={'cellline:"'+sms.name} />
          </div>
      )
    } else if (this.state.notFound) {
      return (
        <div className="text-center">
          <h3 className="text-center">
            Oops! This page doesn't exist!
          </h3>
          <Link to="/">Return Home</Link>
        </div>
      )
    } else {
      return (
        <div className="text-center" style={{padding: "40px"}}>
          <h3 className="text-center">
            Loading...
          </h3>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  showModelSystem: state.modelsystemsReducer.showModelSystem
})

const mapDispatchToProps = (dispatch) => {
    return {
        changeShowModelSystem: (id) => {
            dispatch(changeShowModelSystem(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelSystemShowPage)
