package edu.miami.ccs.dcic;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.Writer;
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

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
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


public class FileDownload extends HttpServlet {

		 private static final long serialVersionUID = 1L;
		 
		 public FileDownload() {
		  super();
		 }
		 
		 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			  long currentDateTime = System.currentTimeMillis();
		  String query = request.getParameter("searchTerm");
		  String file = request.getParameter("file");
		  String type = request.getParameter("type");
		  
		  response.setHeader("Content-disposition","attachment; filename="+file+'.'+type);
		
	
	      
//		  BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
		  
//		  FileOutputStream fos = new FileOutputStream("uploadedFile.txt");
		  PrintWriter _FileWriter = new PrintWriter(new FileOutputStream(file+'.'+type,true)); 
		  _FileWriter.println(query); 
		  _FileWriter.close(); 
		 
		 }
		 
		 protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		  doGet(request, response);
		 }
	}

