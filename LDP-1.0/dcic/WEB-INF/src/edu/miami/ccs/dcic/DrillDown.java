package edu.miami.ccs.dcic;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;
import java.net.URLEncoder;

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
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.noggit.JSONUtil;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class DrillDown extends HttpServlet {
	/**
	 * Constant serialized ID used for compatibility.
	 */
	private static final long serialVersionUID = 1289131677014606851L;
	Logger log = Logger.getLogger(this.getClass().getName());
	private SolrClient solr;

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.
	 * HttpServletRequest , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String query = request.getParameter("searchTerm");
		
	
//		query = query.replaceAll(" ", "%20");
		// Gson gson = new Gson();
		String urlString = "";
		String rows = "10";
		int start = 0;
		String type ="";
		String fields ="";

		if (request.getParameter("limit") != null)
			rows = request.getParameter("limit");
		if (request.getParameter("skip") != null)
			start = Integer.parseInt(request.getParameter("skip"));
		if (request.getParameter("url") != null)
			urlString = request.getParameter("url");
		else {
			urlString = "http://localhost:8983/solr/entities";
		}
		if(request.getParameter("constituentType").equalsIgnoreCase("kinaseProtein"))
		{
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
		query += " category:(\"Protein\" || \"Kinases\" )";
		fields = "entityName";

		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("Antibody")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Antibody\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("SmallMolecule")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Small Molecule\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("primarycell")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Primary Cell\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("cellLine")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Cell Line\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("IPSC")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"iPSC\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("differentiatedcell")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Differentiated iPSC\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("gene")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"Transcribed Gene\")";
		}
		else if(request.getParameter("constituentType").equalsIgnoreCase("RNAi")){
			type=request.getParameter("constituentType")+"s";
			System.out.println(type);
			query += " category:(\"RNAi\" || \"cDNA\" || \"shRNA\")";
		}
		SolrQuery parameters = new SolrQuery();
		parameters.set("q", query);
		parameters.set("rows", rows);	
		parameters.set("fl", fields);
		
		parameters.setStart(start);
		parameters.set("wt", "json");
		parameters.set("indent", "true");
		if (request.getParameter("group") != null) {
			parameters.set("group", "true");
			String groupFields[] = request.getParameter("group").split(",");
			parameters.set("group.field", groupFields);
		
		}
		parameters.set("q.op", "AND");
		QueryResponse response1 = null;
		
		solr = new HttpSolrClient(urlString);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			response1 = solr.query(parameters);
			
			out.print("{ \""+type+"\":");
			
			getDocuments(response1, request.getParameter("group"), out, gson);
			out.print("}");

		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private static void getDocuments(QueryResponse response1, String group, PrintWriter out, Gson gson) {
		if (group != null) {
			String json = "";
			List<GroupCommand> counts = response1.getGroupResponse().getValues();
			for (int k = 0; k < counts.size(); k++) {
				List<Group> gps = counts.get(k).getValues();
				for (int l = 0; l < gps.size(); l++) {
					out.print("\"documents\":" + gson.toJson(gps.get(l).getResult()));

				}
			}
		} else {
			String json = gson.toJson(response1.getResults());				
		    out.print(json);


		}

	}

}
