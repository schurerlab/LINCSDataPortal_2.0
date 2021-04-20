package edu.miami.ccs.dcic;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest.METHOD;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.QueryResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


public class FetchCells extends HttpServlet {
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

		if (request.getParameter("limit") != null)
			rows = request.getParameter("limit");
		if (request.getParameter("skip") != null)
			start = Integer.parseInt(request.getParameter("skip"));
		if (request.getParameter("url") != null)
			urlString = request.getParameter("url");
		else {
			urlString = "http://localhost:8983/solr/cells";
		}
		SolrQuery parameters = new SolrQuery();
		parameters.set("q", query);
		parameters.set("rows", rows);
		if (request.getParameter("fields") != null) {
			String fl[] = request.getParameter("fields").split(",");
			parameters.set("fl", fl);
		}
		
		parameters.setStart(start);
		parameters.set("wt", "json");
		parameters.set("indent", "true");
//		parameters.set("sort", "datereleased desc");
		
		if (request.getParameter("facet") != null) {
			parameters.set("facet", "true");
			String facetFields[] = request.getParameter("facet").split(",");
			parameters.set("facet.field", facetFields);
		}
		if (request.getParameter("group") != null) {
			parameters.set("group", "true");
			String groupFields[] = request.getParameter("group").split(",");
			parameters.set("group.field", groupFields);
		}
		if (request.getParameter("sort") != null) {
			parameters.set("sort", request.getParameter("sort"));
		}
		parameters.set("q.op", "AND");
		QueryResponse response1 = null;
		
		solr = new HttpSolrClient(urlString);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			response1 = solr.query(parameters, METHOD.POST);
			
			out.print("{\"results\":{ ");
			numOfResults(response1, request.getParameter("group"), out);
			if (request.getParameter("facet") != null) {
			getFacets(response1, request.getParameter("facet"), out);
			}
			getDocuments(response1, request.getParameter("group"), out, gson);
			out.print("}}");

		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private static void numOfResults(QueryResponse response1, String group, PrintWriter out) {
		if (group != null) {
			out.print("\"totalDocuments\":"
					+ ((QueryResponse) response1).getGroupResponse().getValues().get(0).getMatches() );
		} else {
			out.print("\"totalDocuments\":" + ((QueryResponse) response1).getResults().getNumFound());
		}

	}

	private static void getFacets(QueryResponse response1, String facets, PrintWriter out) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		List<FacetField> ffList = response1.getFacetFields();
		out.print( ","+"\"facets\":[{");
		for (int i = 0; i < ffList.size(); i++) {
			String ffname = ffList.get(i).getName();
			out.print(gson.toJson(ffname) + ":{");
			List<Count> counts = ffList.get(i).getValues();
			for (int j = 0; j < counts.size(); j++) {
				Object obj = counts.get(j).getName();
				Object facetCount = counts.get(j).getCount();
				out.print(gson.toJson(obj.toString()) + ":");
				out.print(gson.toJson(facetCount.toString()));
				if (j < counts.size() - 1) {
					out.print(",");
				} else {
					out.print("}");
				}
			}
			if (i < ffList.size() - 1) {
				out.print(",");
			} else {
				out.print("}]");
			}
		}
	}

	private static void getDocuments(QueryResponse response1, String group, PrintWriter out, Gson gson) {
		if (group != null) {
			String json = "";
			out.print(",\"documents\":" );
			List<GroupCommand> counts = response1.getGroupResponse().getValues();
			for (int k = 0; k < counts.size(); k++) {
				List<Group> gps = counts.get(k).getValues();
				for (int l = 0; l < gps.size(); l++) {
					json += gson.toJson(gps.get(l).getResult());
				}
			}
			out.println(json.replace("][", ""));
		} else {
			String json = gson.toJson(response1.getResults());
			out.print(",\"documents\":" + json);

		}

	}

}

