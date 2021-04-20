package edu.miami.ccs.dcic;

import java.io.IOException;
import java.io.PrintWriter;
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
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class DatasetSuggest extends HttpServlet {
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
		String facetLimit = "-1";
		QueryResponse queryResponse = null;
		int start = 0;
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String query = request.getParameter("searchTerm");
		String upquery = " OR "+query.toUpperCase();
		String loquery  = " OR "+query.toLowerCase();
		String ccquery = " OR "+query.substring(0, 1).toUpperCase() + query.substring(1).toLowerCase();
		// query = query.replaceAll(" ", "%20");
		// Gson gson = new Gson();
		String urlString = "";
		String rows = "10";
		
		String finalquery = query+upquery+loquery+ccquery; 
		System.out.println(finalquery);

		if (request.getParameter("limit") != null)
			rows = request.getParameter("limit");
		if (request.getParameter("skip") != null)
			start = Integer.parseInt(request.getParameter("skip"));
		if (request.getParameter("url") != null)
			urlString = request.getParameter("url");
		else {
			urlString = "http://localhost:8983/solr/datasets";
		}
		SolrQuery parameters = new SolrQuery();
solr = new HttpSolrClient(urlString);
		
		parameters.set("rows", rows);
		parameters.setStart(start);
		parameters.set("wt", "json");
		parameters.set("indent", "true");
		parameters.set("callback", "JSON_CALLBACK");
		if (request.getParameter("fields") != null) {
			String fl[] = request.getParameter("fields").split(",");
			parameters.set("fl", fl);
		}
		String facetFields[] = null;
		if (request.getParameter("facet") != null) {
			facetFields = request.getParameter("facet").split(",");
			parameters.set("facet", "true");
			parameters.set("facet.field", facetFields);
			parameters.set("facet.limit", rows);
			parameters.set("facet.mincount", "1");
			parameters.set("facet.limit", facetLimit);
			parameters.set("facet.sort", "count");
		}
		
		//String qParam = "icd9:"+query+"* OR " + "icd9desc:"+query+"* OR " + "cptcode:"+query+"*";
		String qParam = "";
		
		for(int i=0; i < facetFields.length; i++){
			qParam = qParam.concat(facetFields[i] +":" +finalquery + "*");
			
			if(i < facetFields.length-1){
				qParam = qParam.concat(" OR ");
			}
		}
		parameters.set("q", qParam);
		parameters.set("q.op", "AND");
		
		try {
			queryResponse = solr.query(parameters);
			out.print("{");
			out.print("\"suggestTerms\":[");
			if (request.getParameter("facet") != null) {
				getFacets(queryResponse, request.getParameter("facet"), out,query);
			}
			out.print("]}");
		} catch (SolrServerException e) {
			e.printStackTrace();
		}
	}

		

private static void getFacets(QueryResponse queryResponse, String facets, PrintWriter out,String query) {
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		List<FacetField> facetFields = queryResponse.getFacetFields();
		boolean contains = false;
		
		//loop through every facet field
		for (int i = 0; i < facetFields.size(); i++) {
			
			String facetFieldName = facetFields.get(i).getName();
			List<Count> facetFieldValues = facetFields.get(i).getValues();
			
			for (int j = 0; j < facetFieldValues.size(); j++) {
				
				String label = facetFieldValues.get(j).getName().toString();
				Object count = facetFieldValues.get(j).getCount();
				
				//check if user entered search term is present in facet value 
				if(label.toLowerCase().contains(query.toLowerCase())){
					
					//add "," only after first record
					if(contains){
						out.print(",");
					}
					out.print("{" + gson.toJson("type") + ":" + gson.toJson(facetFieldName) + "," 
							      + gson.toJson("label") + ":" + gson.toJson(label) + ","
							      + gson.toJson("count") + ":" + gson.toJson(" ("+ count.toString() + ")") + "}");
					
					contains = true;
					
				}
			}
		}
	}

}
