package edu.miami.ccs.dcic;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.QueryResponse;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.LineIterator;
import org.apache.commons.io.filefilter.SuffixFileFilter;


public class DownloadData extends HttpServlet {

		 private static final long serialVersionUID = 1L;
		 
		 public DownloadData() {
		  super();
		 }
		 
		 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			  long currentDateTime = System.currentTimeMillis();
//			  Date currentDate = new Date(currentDateTime);
		  response.setContentType("text/csv");
		  response.setHeader("Content-disposition","attachment; filename="+request.getParameter("category").replaceAll(" ", "_")+"_"+currentDateTime+".csv");
		  PrintWriter out = response.getWriter();
		  String query = request.getParameter("searchTerm");
		  String category = request.getParameter("category");
		  String fl ="";
		  String cat ="";
		  query = query.replaceAll(" ", "%20");
		  System.out.println(category);
		  if(category.equals("Small Molecule")){
			  cat="Small Molecule";
			 fl = "entityName,SM_LINCS_ID,SM_Alternative_Name,SM_PubChem_CID,SM_Center_Compound_ID,SM_SMILES_Parent,SM_SMILES_Batch,SM_InChi_Parent,SM_Center_Sample_ID";  
		  }else if (category.equals("cellline")){
			  cat="Cell Line";
			 fl="entityName,CL_LINCS_ID,CL_Alternate_Name,CL_Provider_Name,CL_Provider_Catalog_ID,CL_Organ,CL_Organism,CL_Disease,CL_Disease_Detail"; 
		  }else if (category.equals("IPSCs")){
			  cat="iPSC";
			 fl="entityName,IP_LINCS_ID,IP_Center_Name,IP_Reprogramming_Method,IP_Passage_Last_Karyotyping"; 
		  }else if (category.equals("Differentiated Cells")){
			  cat="Differentiated iPSC";
					 fl="entityName,DC_LINCS_ID"; 
		  }
		  else if (category.equals("Primary Cells")){
			  cat="Primary Cell";
				 fl="entityName,PC_LINCS_ID,PC_Provider_Name,PC_Donor_Ethnicity,PC_Donor_Age,PC_Provider_Catalog_ID"; 
		  }
		  else if (category.equals("cDNAs")){
			  cat="cDNA";
				 fl="entityName,CDNA_Source"; 
		  }
		  else if (category.equals("shRNAs")){
			  cat="shRNA";
				 fl="entityName,SHRNA_SourceID,SHRNA_Seed7MerSeq,SHRNA_Seed6MerSeq,SHRNA_TargetSequence"; 
		  }
		  else if (category.equals("Genes")){
			  cat="Transcribed Gene";
				 fl="entityName,GENE_Symbol,GENE_Synonyms,GENE_Organism,GENE_EntresID,GENE_Description"; 
		  }
		  else if (category.equals("Phosphoproteins")){
			  cat="Peptide Probe";
				 fl="entityName,PP_Gene_Symbol,PP_ProbeId,PP_Gene_ID,PP_UniProt_ID,PP_Base_Peptide,PP_Phosphosite,PP_ClusterCode,PP_Modified_Peptide_Code,PP_Cluster"; 
		  }
		  else if (category.equals("Protein")){
			  cat="Protein";
				 fl="entityName,PR_Gene_Symbol,PR_Alternate_Name,PR_UniProt_ID,PR_UniProt_ID,PR_Kinasegroup,PR_Kinasefamily,PR_Gatekeeper,PR_Hinge_i1,PR_Hinge_i3,PR_Gene_ID,PR_Kinasedomain"; 
		  }
		  else if (category.equals("Other")){
			  cat="Other Reagents";
				 fl="entityName,lincsidentifier"; 

		  }
		  cat= cat.replaceAll(" ", "%20");
		  try
		    {
		      // create a url object
		      URL url = new URL("http://localhost:8983/solr/entities/select?q="+query+"%20category:"+"\""+cat+"\""+"&q.op=AND&wt=csv&csv.separator=,&rows=100000&fl="+fl);
		 System.out.println(url);
		      // create a urlconnection object
		      URLConnection urlConnection = url.openConnection();
		 
		      // wrap the urlconnection in a bufferedreader
		      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
		 
		      String line;
		 
		      if(category.equals("Small Molecule")){
		    	  while ((line = bufferedReader.readLine()) != null)
			      {
			    	  out.println(line.replaceAll("entityName", "SM_Name"));
			      }  
		      }else if (category.equals("cellline")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "CL_Name"));
		    	  }
		      	}
		      else if (category.equals("Protein")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "PP_Name"));
		    	  }
		      	}
		      else if (category.equals("Phosphoproteins")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "PP_Name"));
		    	  }
		      	}
		      else if (category.equals("Genes")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "Gene_Name"));
		    	  }
		      	}
		      else if (category.equals("Primary Cells")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "PC_Name"));
		    	  }
		      	}
		      else if (category.equals("IPSCs")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "IP_Name"));
		    	  }
		      	}
		      else if (category.equals("Other")){
		    	  while ((line = bufferedReader.readLine()) != null)
		    	  {
		    		  out.println(line.replaceAll("entityName", "OR_Name"));
		    	  }  
		      }
		      bufferedReader.close();
		    }
		    catch(Exception e)
		    {
		      e.printStackTrace();
		    }
		
		 }
		 
		 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		  doGet(request, response);
		 }
	}

