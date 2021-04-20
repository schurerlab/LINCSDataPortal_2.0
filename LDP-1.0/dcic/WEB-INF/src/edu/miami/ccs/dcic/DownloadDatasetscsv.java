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


public class DownloadDatasetscsv extends HttpServlet {

		 private static final long serialVersionUID = 1L;
		 
		 public DownloadDatasetscsv() {
		  super();
		 }
		 
		 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			  long currentDateTime = System.currentTimeMillis();
//			  Date currentDate = new Date(currentDateTime);
		  response.setContentType("text/csv");
		  response.setHeader("Content-disposition","attachment; filename="+request.getParameter("filename").replaceAll(" ", "_")+".csv");
		  PrintWriter out = response.getWriter();
		  String query = request.getParameter("searchTerm").replaceAll(",", " || ");
		  String category = request.getParameter("filename");
		  String fl ="";
		  String cat ="";
		  query = query.replaceAll(" ", "%20");
		  System.out.println(category);

			 fl = "datasetid,assayname,centername,screeninglabinvestigator,principalinvestigator,statsfields";  
		  cat= cat.replaceAll(" ", "%20");
		  try
		    {
		      // create a url object
		      URL url = new URL("http://localhost:8983/solr/datasets/select?q=datasetid:("+query+")&wt=csv&csv.separator=%09&rows=100000&fl="+fl+"&sort=assayname%20asc");
		 System.out.println(url);
		      // create a urlconnection object
		      URLConnection urlConnection = url.openConnection();
		 
		      // wrap the urlconnection in a bufferedreader
		      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
		 
		      String line;
		 
		      // read from the urlconnection via the bufferedreader
		      while ((line = bufferedReader.readLine()) != null)
		      {
		    	  if(line.contains("statsfields")){
		    		  out.println(line.replaceAll("statsfields", "metadata_contents"));  
		    	  }
		    	  if(line.contains("primarycell") && line.contains("smallmolecule")  && line.contains("protein") ){
			    	  out.print(line.replaceAll("primarycell", "Primary_Cell_Metadata.txt").replaceAll("protein", "Protein_Metadata.txt").replaceAll("smallmolecule", "Small_Molecule_Metadata.txt"));
			    	  out.println();
			      }
		    	  else if(line.contains("primarycell") && line.contains("protein") ){
			    	  out.print(line.replaceAll("primarycell", "Primary_Cell_Metadata.txt").replaceAll("protein", "Protein_Metadata.txt"));
			    	  out.println();
			      }else if(line.contains("smallmolecule") && line.contains("protein") ){
			    	  out.print(line.replaceAll("smallmolecule", "Small_Molecule_Metadata.txt").replaceAll("protein", "Protein_Metadata.txt"));
			    	  out.println();
			    	  }
			      else if(line.contains("smallmolecule") && line.contains("cellline") ){
			    	  out.print(line.replaceAll("smallmolecule", "Small_Molecule_Metadata.txt").replaceAll("cellline", "Cell_Line_Metadata.txt"));
			    	  out.println();
			     }else if(line.contains("smallmolecule") && line.contains("cellline") ){
			    	  out.print(line.replaceAll("smallmolecule", "Small_Molecule_Metadata.txt").replaceAll("cellline", "Cell_Line_Metadata.txt"));
			    	  out.println();
			     }else if(line.contains("protein") && line.contains("cellline") ){
			    	  out.print(line.replaceAll("protein", "Protein_Metadata.txt").replaceAll("cellline", "Cell_Line_Metadata.txt"));
			    	  out.println();
			     }else if(line.contains("phosphoprotein") && line.contains("cellline") && line.contains("smallmolecule") ){
			    	  out.print(line.replaceAll("phosphoprotein", "Protein_Metadata.txt").replaceAll("cellline", "Cell_Line_Metadata.txt").replaceAll("smallmolecule", "Small_Molecule_Metadata.txt"));
			    	  out.println();
			     }else if(line.contains("phosphoprotein") && line.contains("smallmolecule") ){
			    	  out.print(line.replaceAll("phosphoprotein", "Protein_Metadata.txt").replaceAll("smallmolecule", "Small_Molecule_Metadata.txt"));
			    	  out.println();
			     }else if( line.contains("cellline") ){
			    	  out.print(line.replaceAll("cellline", "Cell_Line_Metadata.txt"));
			    	  out.println();
			     }else if( line.contains("iPSC") ){
			    	  out.print(line.replaceAll("iPSC", "iPSC_Metadata.txt"));
			    	  out.println();
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

