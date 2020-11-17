import React, { Component } from 'react';
import axios from 'axios';
import {Grid, Row, Col, Accordion, Panel, ListGroup, ListGroupItem, Button,Table} from 'react-bootstrap';

export const Help = (props) => {
    return (


        <div className="container-fluid main-container">
            <div className="row">
                <div className="col-3 col-xs-12  col-sm-4 col-md-3">
                    <div id="TOC" >
                        <ul id="tocify-header1" className="tocify-header list-group">
                            <li
                                className="tocify-item list-group-item active"
                                data-unique="a)_about"
                            >
                                A) About
                            </li>
                        </ul>
                        <ul id="tocify-header2" className="tocify-header list-group">
                            <li
                                className="tocify-item list-group-item"
                                data-unique="b)_current_limitations__upcoming_features"
                            >
                                B) Current Limitations / Upcoming Features
                            </li>
                        </ul>
                        <ul id="tocify-header3" className="tocify-header list-group">
                            <li
                                className="tocify-item list-group-item"
                                data-unique="c)_tutorials"
                            >
                                C) Tutorials
                            </li>
                            <ul className="tocify-subheader list-group" data-tag={2}>
                                <li
                                    className="tocify-item list-group-item"
                                    data-unique="data_access_via_gcp"
                                >
                                    Data Access via GCP
                                </li>
                                <li
                                    className="tocify-item list-group-item"
                                    data-unique="data_access_via_r"
                                >
                                    Data Access via R
                                </li>
                                <li className="tocify-item list-group-item" data-unique />
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className="toc-content col-xs-12 col-9 col-sm-8 col-md-9">
                    <div className="fluid-row" id="header">
                        <h1 className="title toc-ignore">LDP 2.0 - Help</h1>
                    </div>
                    <p>
                        <br />
                    </p>
                    <div id="a-about" className="section level1">
                        <div name="a)_about" data-unique="a)_about" />
                        <h1>A) About</h1>
                        <p>
                            <strong>The LINCS Program</strong> <br /> The Library of Integrated
                            Network-Based Cellular Signatures (LINCS) is an NIH Common Fund
                            program with the goal of generating a large-scale and comprehensive
                            catalogue of perturbation-response signatures by utilizing a diverse
                            collection of perturbations across many model systems and assay types.{" "}
                            <br />
                        </p>
                        <p>
                            <strong>The LINCS Data Portal (LDP)</strong> <br /> The LINCS Data
                            Portal (LDP) has been the primary access point for the compendium of
                            LINCS data and has been widely utilized. Here we report the first
                            major update of LDP (
                            <a href="http://lincsportal.ccs.miami.edu/signatures/" className="uri">
                                http://lincsportal.ccs.miami.edu/signatures/
                            </a>
                            ) with substantial changes in the data architecture and APIs, a
                            completely redesigned user interface, and enhanced curated metadata
                            annotations to support more advanced, intuitive and deeper querying,
                            exploration and analysis capabilities. The cornerstone of this update
                            has been the decision to reprocess all high-level LINCS datasets and
                            make them accessible at the data point level enabling users to
                            directly access and download any subset of signatures across the
                            entire library independent from the originating source, project or
                            assay. Access to the individual signatures also enables the newly
                            implemented signature search functionality, which utilizes the iLINCS
                            platform to identify conditions that mimic or reverse gene set
                            queries. A newly designed query interface enables global metadata
                            search with autosuggest across all annotations associated with
                            perturbations, model systems, and signatures. <br />
                        </p>
                        <p>
                            <strong>How to Cite</strong> <br />
                            Coming soon
                        </p>
                        <p>
                            <br />
                        </p>
                        <hr />
                    </div>
                    <div
                        id="b-current-limitations-upcoming-features"
                        className="section level1"
                    >
                        <div
                            name="b)_current_limitations__upcoming_features"
                            data-unique="b)_current_limitations__upcoming_features"
                        />
                        <h1>B) Current Limitations / Upcoming Features</h1>
                        <p>
                            <strong>Upcoming Features</strong>
                        </p>
                        <p>
                            The following features are in testing phase and will be implemented in
                            the coming months
                        </p>
                        <ul>
                            <li>
                                <p>
                                    <u>Multiple filters functionality:</u> Filter signatures based on
                                    multiple AND / OR terms
                                </p>
                            </li>
                            <li>
                                <p>
                                    <u>Remove signature download limit:</u> Users will be able to
                                    download more than 100 signatures at a time
                                </p>
                            </li>
                            <li>
                                <p>
                                    <u>Fully functional tables:</u> All the tables (Perturbation,
                                    Model System and Signature) will be fully searchable
                                </p>
                            </li>
                            <li>
                                <p>
                                    <u>Expanded use cases:</u> The help will be expanded with more
                                    tutorials based on user feedback
                                </p>
                            </li>
                        </ul>
                        <p>
                            For more issues / functionality requests please use our github
                            repository:{" "}
                            <a
                                href="https://github.com/schurerlab/LINCSDataPortal_2.0"
                                className="uri"
                            >
                                https://github.com/schurerlab/LINCSDataPortal_2.0
                            </a>
                        </p>
                        <p>
                            <br /> <strong>Current Limitations</strong>
                        </p>
                        <p>
                            <br />
                        </p>
                        <hr />
                    </div>
                    <div id="c-tutorials" className="section level1">
                        <div name="c)_tutorials" data-unique="c)_tutorials" />
                        <h1>C) Tutorials</h1>
                        <div id="data-access-via-gcp" className="section level2">
                            <div name="data_access_via_gcp" data-unique="data_access_via_gcp" />
                            <h2>Data Access via GCP</h2>
                            <p>
                                LDP 2.0 can be accessed through the Google Cloud Platform. <br />
                            </p>
                            <p>
                                <strong>Step1 :</strong> Visit{" "}
                                <a
                                    href="https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=umiami_lincs"
                                    className="uri"
                                >
                                    https://console.cloud.google.com/bigquery?p=bigquery-public-data&amp;d=umiami_lincs
                                </a>
                            </p>
                            <p>
                                <strong>Step2 :</strong> Paste the SQL query that was downloaded
                                from LDP 2.0
                            </p>
                            <p>
                                <strong>Step3 :</strong> Press run and retrieve signatures
                            </p>
                            <p>
                                <br />
                            </p>
                        </div>
                        <div id="data-access-via-r" className="section level2 tabset">
                            <div name="data_access_via_r" data-unique="data_access_via_r" />
                            <h2>Data Access via R</h2>
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active">
                                    <a
                                        role="tab"
                                        data-toggle="tab"
                                        href="#signatures-by-perturbation"
                                        aria-controls="signatures-by-perturbation"
                                    >
                                        Signatures by perturbation
                                    </a>
                                </li>
                                <li role="presentation">
                                    <a
                                        role="tab"
                                        data-toggle="tab"
                                        href="#signatures-by-model-system"
                                        aria-controls="signatures-by-model-system"
                                    >
                                        Signatures by model system
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div
                                    id="signatures-by-perturbation"
                                    className="section level3 tab-pane tabbed-pane active"
                                    role="tabpanel"
                                >
                                    <p>
                                        <br /> <strong>Step 1</strong>: Identify perturbagens that match
                                        with the keyword: <strong>sorafenib</strong>
                                    </p>
              <pre className="r">
                <code className="hljs">
                  <span className="hljs-keyword">library</span>(httr){"\n"}
                    <span className="hljs-keyword">library</span>(jsonlite){"\n"}
                    <span className="hljs-keyword">library</span>(data.table)
                    {"\n"}url{"  "}&lt;-{" "}
                  <span className="hljs-string">
                    "http://lincsportal.ccs.miami.edu/"
                  </span>
                    {"\n"}
                    {"\n"}
                  <span className="hljs-comment">
                    # sotrafenib is our keyword that we want to match against
                    the perturbation name
                  </span>
                    {"\n"}perturbation_name &lt;-{" "}
                    <span className="hljs-string">"sorafenib"</span>
                    {"\n"}path_name &lt;- paste(
                  <span className="hljs-string">
                    "sigc-api/search/suggest?term="
                  </span>
                  ,perturbation_name,sep=<span className="hljs-string">""</span>
                  ){"\n"}raw_name &lt;-{"  "}GET(url = url, path = path_name)
                    {"\n"}raw_name_content &lt;- rawToChar(raw_name$content){"\n"}
                    name_content &lt;- fromJSON(raw_name_content){"\n"}
                    {"\n"}
                  <span className="hljs-comment">
                    # these are all the perturbagens that matched our keyword
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    # hit_object_id is the unique identifier of each
                    perturbagen. In this example we can see that our keyword
                    matched only one perturbagen
                  </span>
                    {"\n"}data.table(name_content[[
                  <span className="hljs-string">"data"</span>]][[
                  <span className="hljs-string">"name"</span>]])
                </code>
              </pre>
                                    <div
                                        data-pagedtable="true"
                                        pagedtable-page={0}
                                        className="pagedtable-wrapper"
                                    >
                                        <div
                                            className="pagedtable pagedtable-not-empty"
                                            style={{ opacity: 1 }}
                                        >
                                            <table
                                                style={{
                      visibility: "hidden",
                      position: "absolute",
                      whiteSpace: "nowrap",
                      height: "auto",
                      width: "auto"
                    }}
                                            >
                                                <tbody>
                                                <tr>
                                                    <td>ABCDEFGHIJ0123456789</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <table cellSpacing={0} className="table table-condensed">
                                                <thead>
                                                <tr>
                                                    <th
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 126,
                            minWidth: 126
                          }}
                                                    >
                                                        <div className="pagedtable-header-name">
                                                            preferred_term
                                                        </div>
                                                        <div className="pagedtable-header-type">
                                                            &lt;chr&gt;
                                                        </div>
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 144,
                            minWidth: 144
                          }}
                                                    >
                                                        <div className="pagedtable-header-name">
                                                            hit_object_class
                                                        </div>
                                                        <div className="pagedtable-header-type">
                                                            &lt;chr&gt;
                                                        </div>
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 162,
                            minWidth: 162
                          }}
                                                    >
                                                        <div className="pagedtable-header-name">
                                                            suggest_term
                                                        </div>
                                                        <div className="pagedtable-header-type">
                                                            &lt;chr&gt;
                                                        </div>
                                                    </th>
                                                    <th
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 72,
                            minWidth: 72
                          }}
                                                    >
                                                        <div className="pagedtable-header-name">hit_type</div>
                                                        <div className="pagedtable-header-type">
                                                            &lt;chr&gt;
                                                        </div>
                                                    </th>
                                                    <th
                                                        align="right"
                                                        style={{
                            textAlign: "right",
                            maxWidth: 117,
                            minWidth: 117
                          }}
                                                    >
                                                        <div className="pagedtable-header-name">
                                                            hit_object_id
                                                        </div>
                                                        <div className="pagedtable-header-type">
                                                            &lt;int&gt;
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="odd">
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 126,
                            minWidth: 126
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 144,
                            minWidth: 144
                          }}
                                                    >
                                                        small molecule
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 162,
                            minWidth: 162
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 72,
                            minWidth: 72
                          }}
                                                    >
                                                        name
                                                    </td>
                                                    <td
                                                        align="right"
                                                        style={{
                            textAlign: "right",
                            maxWidth: 117,
                            minWidth: 117
                          }}
                                                    >
                                                        16626
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 126,
                            minWidth: 126
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 144,
                            minWidth: 144
                          }}
                                                    >
                                                        small molecule
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 162,
                            minWidth: 162
                          }}
                                                    >
                                                        Sorafenib tosylate
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 72,
                            minWidth: 72
                          }}
                                                    >
                                                        name
                                                    </td>
                                                    <td
                                                        align="right"
                                                        style={{
                            textAlign: "right",
                            maxWidth: 117,
                            minWidth: 117
                          }}
                                                    >
                                                        16626
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 126,
                            minWidth: 126
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 144,
                            minWidth: 144
                          }}
                                                    >
                                                        small molecule
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 162,
                            minWidth: 162
                          }}
                                                    >
                                                        Sorafenib Tosylate
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 72,
                            minWidth: 72
                          }}
                                                    >
                                                        name
                                                    </td>
                                                    <td
                                                        align="right"
                                                        style={{
                            textAlign: "right",
                            maxWidth: 117,
                            minWidth: 117
                          }}
                                                    >
                                                        16626
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 126,
                            minWidth: 126
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 144,
                            minWidth: 144
                          }}
                                                    >
                                                        small molecule
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 162,
                            minWidth: 162
                          }}
                                                    >
                                                        Sorafenib
                                                    </td>
                                                    <td
                                                        align="left"
                                                        style={{
                            textAlign: "left",
                            maxWidth: 72,
                            minWidth: 72
                          }}
                                                    >
                                                        name
                                                    </td>
                                                    <td
                                                        align="right"
                                                        style={{
                            textAlign: "right",
                            maxWidth: 117,
                            minWidth: 117
                          }}
                                                    >
                                                        16626
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <div className="pagedtable-footer">
                                                <div className="pagedtable-info" title="4 rows">
                                                    4 rows
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>
                                        <br /> <strong>Step 2</strong>: Obtain all the signature ids for
                                        the above perturbagens
                                    </p>
              <pre className="r">
                <code className="hljs">
                  <span className="hljs-comment">
                    #get all the perturbagen IDs that matched our keyword from
                    step 1
                  </span>
                    {"\n"}small_molecule_id &lt;- unique(name_content[[
                  <span className="hljs-string">"data"</span>]][[
                  <span className="hljs-string">"name"</span>]]$hit_object_id)
                    {"\n"}
                    {"\n"}path_name &lt;- paste(
                  <span className="hljs-string">
                    "sigc-api/small-molecule/fetch-by-id?id="
                  </span>
                  ,small_molecule_id,
                  <span className="hljs-string">
                    "&amp;returnSignatureIDs=true"
                  </span>
                  ,sep=<span className="hljs-string">""</span>){"\n"}raw_name
                    &lt;-{"  "}GET(url = url, path = path_name){"\n"}
                    raw_name_content &lt;- rawToChar(raw_name$content){"\n"}
                    name_content2 &lt;- fromJSON(raw_name_content){"\n"}
                    {"\n"}
                  <span className="hljs-comment">
                    #Signature IDs of sorafenib, annotated by assay type
                  </span>
                    {"\n"}sig &lt;- as.data.frame(name_content2[[
                  <span className="hljs-string">"data"</span>]][[
                  <span className="hljs-string">"signature"</span>]]){"\n"}
                    {"\n"}
                  <span className="hljs-comment">
                    #Here we can see that we have 2 "Binding Assay" signatures
                    and 284 "Gene Expression" signatures
                  </span>
                    {"\n"}table(sig$assay_category)
                </code>
              </pre>
              <pre>
                <code className="hljs">
                  ## {"\n"}##{"         "}binding gene expression {"\n"}##
                    {"               "}2{"             "}284
                </code>
              </pre>
                                    <p>
                                        <br />
                                    </p>
                                    <p>
                                        <strong>Step 3:</strong> Obtain the signature Data
                                    </p>
              <pre className="r">
                <code className="hljs">
                  <span className="hljs-comment">
                    #Filter for "gene expression" Signature IDs
                  </span>
                    {"\n"}gene_expr_ids &lt;- sig[which(sig$assay_category==
                  <span className="hljs-string">"gene expression"</span>),
                  <span className="hljs-string">"signature_id"</span>]{"\n"}
                    gene_expr_ids2 &lt;- paste(
                  <span className="hljs-string">"id="</span>,gene_expr_ids,sep=
                  <span className="hljs-string">""</span>){"\n"}gene_expr_ids3
                    &lt;- paste(gene_expr_ids2,collapse=
                  <span className="hljs-string">"&amp;"</span>){"\n"}
                    {"\n"}path_name &lt;- paste(
                  <span className="hljs-string">
                    "sigc-api/signature/fetch-by-id?"
                  </span>
                  ,gene_expr_ids3,
                  <span className="hljs-string">
                    "&amp;onlyLandmarkGenes=true"
                  </span>
                  ,sep=<span className="hljs-string">""</span>){"\n"}raw_name
                    &lt;-{"  "}GET(url = url, path = path_name){"\n"}
                    raw_name_content &lt;- rawToChar(raw_name$content){"\n"}
                    name_content3 &lt;- fromJSON(raw_name_content){"\n"}
                  <span className="hljs-comment">
                    #toJSON(name_content3, pretty=TRUE)
                  </span>
                    {"\n"}
                    {"\n"}
                  <span className="hljs-comment">
                    #rows are the individual signatures and the columsn of the
                    dataframe are the entrez IDs
                  </span>
                    {"\n"}Gene_Expression_Data_Matrix &lt;- name_content3[[
                  <span className="hljs-string">"data"</span>]][[
                  <span className="hljs-string">"data"</span>]]
                </code>
              </pre>
                                    <p>
                                        <br />
                                    </p>
                                    <p>
                                        <strong>Step 4:</strong> Obtain the signature Metadata
                                    </p>
              <pre className="r">
                <code className="hljs">
                  <span className="hljs-comment">
                    #name_content3[["data"]][["perturbagenClass"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["perturbagenID"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["modelSystem"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["componentObjectClass"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["signatureID"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["concentration"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["concentrationUnits"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["timepoint"]]
                  </span>
                    {"\n"}
                  <span className="hljs-comment">
                    #name_content3[["data"]][["timepointUnits"]]
                  </span>
                </code>
              </pre>
                                </div>
                                <div
                                    id="signatures-by-model-system"
                                    className="section level3 tab-pane tabbed-pane"
                                    role="tabpanel"
                                ></div>
                            </div>
                        </div>
                        <div id="section" className="section level2">
                            <div name data-unique />
                            <h2 />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
