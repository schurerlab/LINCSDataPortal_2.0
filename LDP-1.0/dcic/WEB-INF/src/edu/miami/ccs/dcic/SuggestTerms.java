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

public class SuggestTerms extends HttpServlet {
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

		// query = query.replaceAll(" ", "%20");
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
			urlString = "http://localhost:8983/solr/entities";
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
		if (request.getParameter("facet") != null) {
			parameters.set("facet", "true");
			String facetFields[] = request.getParameter("facet").split(",");
			parameters.set("facet.field", facetFields);
			parameters.set("facet.limit", rows);
			parameters.set("facet.mincount", "1");
		}

		parameters.set("q.op", "AND");
		QueryResponse response1 = null;

		solr = new HttpSolrClient(urlString);
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			response1 = solr.query(parameters);

			out.print("{ ");
			if (request.getParameter("facet") != null) {
				getFacets(response1, request.getParameter("facet"), out);
			}
			out.print("]}");

		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private static void getFacets(QueryResponse response1, String facets, PrintWriter out) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		List<FacetField> ffList = response1.getFacetFields();
		out.print("\"suggestTerms\":[");
		for (int i = 0; i < ffList.size(); i++) {
			String ffname = ffList.get(i).getName();
			List<Count> counts = ffList.get(i).getValues();
			if (counts.size() > 0) {
				for (int j = 0; j < counts.size(); j++) {
					Object obj = counts.get(j).getName();
					Object facetCount = counts.get(j).getCount();
					out.print("{" + gson.toJson("type") + ":" + gson.toJson(ffname) + "," + gson.toJson("label") + ":"
							+ gson.toJson(obj.toString()));
					// out.print(gson.toJson(facetCount.toString()));
					if (j < counts.size() - 1) {
						out.print("},");
					} else {
						out.print("}");
					}
				}
			}

			if (ffList.get(i).getValues().size() > 0 && i<ffList.size()-1) {
				out.print(",");
			}

		}
	}

}
