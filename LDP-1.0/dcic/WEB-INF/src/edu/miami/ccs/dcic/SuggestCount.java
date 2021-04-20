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



public class SuggestCount extends HttpServlet {
	
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
		
		Connection conn = null;
		 response.setContentType("application/json");
	      PrintWriter out = response.getWriter();
	      String searchTerm = request.getParameter("term");
			
			String group = request.getParameter("resultGroup");
			if(group !=null){
				group=	group.replaceAll("smallMoleculeTarget", "protein").replaceAll("shrnageneTarget", "nucleic_acid_reagent").replaceAll("sgrnageneTarget", "nucleic_acid_reagent").replaceAll("smallMoleculeName", "small_molecule").replaceAll("mechanismOfAction", "mechanism_of_action").replaceAll("cellLineName", "cell_line").replaceAll("organ", "organ").replaceAll("disease", "disease_associations").replaceAll("tissue", "tissue");	
			}
//			System.out.println(group);
//	      String perturbagenClass = request.getParameter("perturbagen_class").toString();
//	      out.println(perturbagenClass);
	      out.println("{");
	         out.println("\"data\":");
	         out.println("{");
	  	 try{ 
	  		 conn = ConnectionManager.getConnection();
	  	 Statement stmt = conn.createStatement();
	  	 Statement stmt2 = conn.createStatement();
	  	if(request.getParameter("resultGroup")== null){
	  	 String sql2 = "select count(distinct hit_object_id ) as count,hit_object_class as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null   or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null  group by hit_object_class";
	  	ResultSet rs2 = stmt2.executeQuery(sql2);
	  	 while(rs2.next()){
	  		String sql = "";
            out.println( "\""+CamelCase(rs2.getString("group"))+"\": {"   );
	  		out.println("\"totalCount\":"+"\""+rs2.getString("count")+"\",");
	  		if(rs2.getString("group").equalsIgnoreCase("sgRNA") || rs2.getString("group").equalsIgnoreCase("shRNA")  ){
 	    		sql+="select count(distinct hit_object_id ) as counts,suggest_term as suggest_object_preferred_name,suggest_object_table as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null and hit_object_class ='"+rs2.getString("group")+"'  or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null   and hit_object_class ='"+rs2.getString("group")+"' and hit_object_lookup_table is not null  group by suggest_term,suggest_object_table order by count(distinct hit_object_id ) desc";

 	  		}else{
 	    		sql+="select count(distinct hit_object_id ) as counts,suggest_object_preferred_name,suggest_object_table as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null and hit_object_class ='"+rs2.getString("group")+"' or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null  and hit_object_class ='"+rs2.getString("group")+"' and hit_object_lookup_table is not null   group by suggest_object_preferred_name,suggest_object_table order by count(distinct hit_object_id ) desc";
 	  		}
	  	 	System.out.println("**suggest SQl*"+sql);
//    		sql+="select count(distinct hit_object_id ) as counts,suggest_object_preferred_name,suggest_object_table as group  from autosuggest where lower(suggest_term) like ' "+searchTerm.toLowerCase()+"%'  or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%'  and hit_object_class ='"+rs2.getString("group")+"'  group by suggest_object_preferred_name,suggest_object_table order by count(distinct hit_object_id ) desc";
    		ResultSet rs = stmt.executeQuery(sql);
    	
	        while(rs.next()){

            out.println("\""+CamelCase(rs.getString("group"))+";"+rs.getString("suggest_object_preferred_name").replaceAll("\"", "") +"\"" +":" + "\""+rs.getString("counts")+"\"" );

            if(!rs.isLast()){
           	 out.println(",");
           }
	  	 }
	        out.println( "}"   );
	        if(!rs2.isLast()){
	           	 out.println(",");
	           }
	  	 }
	  	
	  	}else{
	  		 String sql2 = "select count(distinct hit_object_id ) as count,hit_object_class as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null  and suggest_object_table ='"+group+"' or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null and suggest_object_table ='"+group+"' group by hit_object_class";
	 	  	ResultSet rs2 = stmt2.executeQuery(sql2);
	 	  	System.out.println(sql2);
	 	  	 while(rs2.next()){
	 	  		String sql = "";
	             out.println( "\""+rs2.getString("group")+"\": {"   );
	 	  		out.println("\"totalCount\":"+"\""+rs2.getString("count")+"\",");
	 	  		if(rs2.getString("group").equalsIgnoreCase("sgRNA") || rs2.getString("group").equalsIgnoreCase("shRNA")  ){
		     		sql+="select count(distinct hit_object_id ) as counts,suggest_term as suggest_object_preferred_name,suggest_object_table as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null and hit_object_class ='"+rs2.getString("group")+"' or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null "
		     				+ " and hit_object_class ='"+rs2.getString("group")+"' and hit_object_lookup_table is not null and suggest_object_table ='"+group+"'  group by suggest_term,suggest_object_table order by count(distinct hit_object_id ) desc";	

	 	  		}else{
		     		sql+="select count(distinct hit_object_id ) as counts,suggest_object_preferred_name,suggest_object_table as group  from autosuggest where lower(suggest_term) like '% "+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null and hit_object_class ='"+rs2.getString("group")+"' or  lower(suggest_term) like '"+searchTerm.toLowerCase()+"%' and hit_object_lookup_table is not null  and hit_object_class ='"+rs2.getString("group")+"'  and suggest_object_table ='"+group+"'  group by suggest_object_preferred_name,suggest_object_table order by count(distinct hit_object_id ) desc";	
	 	  		}
	     		ResultSet rs = stmt.executeQuery(sql);
	     	System.out.println("*******"+sql);
	 	        while(rs.next()){

	             out.println("\""+CamelCase(rs.getString("group"))+";"+rs.getString("suggest_object_preferred_name").replaceAll("\"", "") +"\"" +":" + "\""+rs.getString("counts")+"\"" );

	             if(!rs.isLast()){
	            	 out.println(",");
	            }
	 	  	 }
	 	        out.println( "}"   );
	 	        if(!rs2.isLast()){
	 	           	 out.println(",");
	 	           }
	 	  	 }
	  	}


//		 conn.close();
	  	 }catch(Exception ex) {
	         ex.printStackTrace();
	     }
	        out.println("}");
	        out.println("}");
	}
}
