package edu.miami.ccs.dcic;

import java.sql.DriverManager;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;



public class SuggestJDBC extends HttpServlet {
	
	public String CamelCase(String str) {
		String delimiter;
		if (str.contains("_")) {
			delimiter = "_";
		} else {
			delimiter = " ";
		}
		String CamelCase = "";
		String parts[] = str.split(delimiter);
		for (int i=0;i<parts.length;i++){
			String as = parts[i].toLowerCase();
			int a = as.length();
			if(i==0){
				CamelCase = CamelCase+parts[i].toLowerCase();
			}else{
				CamelCase = CamelCase + as.substring(0, 1).toUpperCase() + as.substring(1, a);
	
			}

			
		}
		return CamelCase;
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	
		ResultSet rsObj = null;
		Connection connObj = null;
		PreparedStatement pstmtObj = null;
//		ConnectionPool jdbcObj = new ConnectionPool();
		
		 response.setContentType("application/json");
	      PrintWriter out = response.getWriter();
	      String searchTerm = request.getParameter("term");

	      out.println("{");
	         out.println("\"data\":");
//	         out.println("[");
	      	JsonArray jsonArr = new JsonArray();
	    
	  	 try{ 
//	  		DataSource dataSource = jdbcObj.setUpPool();
	  		connObj = ConnectionManager.getConnection();
//	  		connObj = dataSource.getConnection();
	  	
	  		String sql = "";

	  		sql+="select distinct suggest_term as name,hit_object_class as class,hit_type as group  from autosuggest where "
	  				+ "lower(suggest_term) like  ? " +" and hit_object_lookup_table is not null "
	  				+" or lower(suggest_term) like ? "+" and hit_object_lookup_table is not null  order by hit_type";
	 
	  		
	  		pstmtObj = connObj.prepareStatement(sql);
	 		pstmtObj.setString(1,"% "+searchTerm.toLowerCase()+"%");
	  		pstmtObj.setString(2,""+searchTerm.toLowerCase()+"%");
	  		try{
	  			System.out.println(pstmtObj);
	  		ResultSet rs = pstmtObj.executeQuery();
	        while(rs.next()){
	          JsonObject jsonObj = new JsonObject();
//	        	jsonObj.addProperty("ID", rs.getString("id"));
	        	jsonObj.addProperty("name", rs.getString("name").replaceAll("'", "").replaceAll("\"", "").replaceAll("- ", "-"));
//	        	if(rs.getString("preferred_name") != null){
//	        		jsonObj.addProperty("preferredName",rs.getString("preferred_name").replaceAll("\"", "").replaceAll("'", ""));
//	            }
	        	jsonObj.addProperty("queryClass",rs.getString("class"));
	        	if(rs.getString("group").contains("name") && rs.getString("class").contains("small molecule") ){
	        		jsonObj.addProperty("resultGroup","smallMoleculeName");
	            }else if(rs.getString("group").contains("name") && rs.getString("class").contains("cell line") ){
	            	jsonObj.addProperty("resultGroup","cellLineName");
	            }
	            else if(rs.getString("group").contains("gene target") && rs.getString("class").contains("shRNA") ){
	            	jsonObj.addProperty("resultGroup","shrnageneTarget");
	            }
	            else if(rs.getString("group").contains("gene target") && rs.getString("class").contains("sgRNA") ){
	            	jsonObj.addProperty("resultGroup","sgrnageneTarget");
	            }else {
	            	jsonObj.addProperty("resultGroup",CamelCase(rs.getString("group")));
	            }
	        	jsonArr.add(jsonObj);
        }
	  		}catch (SQLException se) {
	  			JsonObject jsonObj = new JsonObject();
	  			jsonObj.addProperty("error","Possibly a communications link failure, check database connectivity");
	  			jsonArr.add(jsonObj);
			}
	  		
//	        connObj.close();
	  	 }catch(Exception ex) {
	         System.out.println(ex);
	     }
	        out.print(jsonArr);
	        out.println("}");
	   
	}
}
