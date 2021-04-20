package edu.miami.ccs.dcic;

import java.sql.DriverManager;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



public class FetchCounts extends HttpServlet {
	
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
		
		 response.setContentType("text/html");
	      PrintWriter out = response.getWriter();
	      String terms [] = null;
	      String types [] = null;
	      String operator = "or";
	      String allTerms []={"sm_alternative_names","mechanism_of_action","target_name","cell_line_name","organ","disease","tissue","primary_cell_name","nar_name","nar_target_locus","assay_category"};
	      String smTerms []={"sm_alternative_names","mechanism_of_action","target_name"};
	      String clTerms [] ={"cell_line_name","organ","disease","tissue","primary_cell_name"};
	      String sgTerms [] ={"nar_name","nar_target_locus"};
	      String shTerms [] ={"nar_name","nar_target_locus"};
	      String term = request.getParameter("term");
	      String type = request.getParameter("resultGroup");
	      
	     
	      if(request.getParameter("term")!= null){
	    	  terms  = request.getParameter("term").toLowerCase().split(",");
	      }
	      if(request.getParameter("resultGroup")!= null){
	    	  types  = request.getParameter("resultGroup").replaceAll("cells", "clTerms").replaceAll("shRNA", "shTerms").replaceAll("sgRNA", "sgTerms").replaceAll("proteinTarget", "target_name").replaceAll("nucleicAcidReagent", "nar_target_locus").replaceAll("smallMolecule", "sm_alternative_names").replaceAll("mechanismOfAction", "mechanism_of_action").replaceAll("cellLine", "cell_line_name").replaceAll("organ", "organ").replaceAll("diseases", "disease").replaceAll("tissue", "tissue").split(",");
	      }
		
		  String tempStr = "";	    	
	    	  if(types == null && terms != null ){
	    		
	    		  tempStr+=" where ";
	    		  for(int i=0;i<terms.length;i++){
	    			  for(int j=0;j<allTerms.length;j++){
	    				  tempStr+= " lower("+allTerms[j]+") like '%"+terms[i]+"%' ";  
	    				  if(  j<allTerms.length-1 || i<terms.length-1 ){
	    					  if(request.getParameter("operator")!=null){
	    						  tempStr+= request.getParameter("operator");
	    				      }else{
	    				    	  tempStr+= operator ; 
	    				      }
	    					
	    				  }
	    			 } 
		      }    
	      }
	    	  String temp[] =null;
	    	  if(types != null && terms != null ){

	    		  if(types.length == 1 && terms.length == 1){
	    		
	    			  if (types[0].equals("clTerms")){
	    				  temp = Arrays.copyOf(clTerms,clTerms.length);
	    			  }
	    			  else if(types[0].equals("shTerms")){
	    				  temp = Arrays.copyOf(shTerms,shTerms.length);
	    			  }
	    			  else if(types[0].equals("sgTerms")){
	    				  temp = Arrays.copyOf(sgTerms,sgTerms.length);
	    			  }
	    			  else if(types[0].equals("smTerms")){
	    				  temp = Arrays.copyOf(smTerms,smTerms.length);
	    			  }
	    			  else{
	    				  temp = Arrays.copyOf(types,types.length);
	    			  }
	    			  
	    			  tempStr+=" where ";

	    			  for(int j=0;j<temp.length;j++){
	    				  tempStr+= " lower("+temp[j]+") like '%"+request.getParameter("term")+"%' ";  
	    				  if(  j<temp.length-1 ){
	    					  if(request.getParameter("operator")!=null){
	    						  tempStr+= request.getParameter("operator");
	    				      }else{
	    				    	  tempStr+= operator ; 
	    				      }
	    				  }
	    			 }
	    		  }else if(types.length == terms.length ){
	    		
	    			  tempStr+=" where ";
	    			  for(int j=0;j<terms.length;j++){
	    				  tempStr+= " lower("+types[j]+") like '%"+terms[j]+"%' ";  
	    				  if(  j<types.length-1 ){
	    					  if(request.getParameter("operator")!=null){
	    						  tempStr+= request.getParameter("operator");
	    				      }else{
	    				    	  tempStr+= operator ; 
	    				      }
	    				  }
	    			 }
	    			  
	    		  }
	    		   
	      }
	      out.println("{");
	         out.println("\"data\":");
	         out.println("{");
	  	 try{ 
	  	 Class.forName("org.postgresql.Driver");
	  	 Connection conn = DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
	  	 Connection conn2 = DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
	  	 Statement stmt = conn.createStatement();
	  	 Statement stmt2 = conn2.createStatement();
	  	
	  	 String sql= "select count(distinct concat( perturbagen_id,perturbagen_class)) as perturbations,count(distinct model_system_id) as model_systems,count(distinct signature_id) as signatures from public.signature_meatadata_temp " + tempStr.toLowerCase() ;
	  	System.out.println(sql);
	  	 ResultSet rs = stmt.executeQuery(sql);
	  	 while(rs.next()){
	  		 if(!rs.getString("perturbations").contentEquals("0")){
	  			out.println( "\""+"perturbations"+"\": {"   );
	  	  		out.println("\"totalCount\":"+"\""+rs.getString("perturbations")+"\",");
	  			 String sql2 ="select count(distinct perturbagen_id) as perturbagen_count,perturbagen_class  from public.signature_meatadata_temp " + tempStr.toLowerCase() +" group by perturbagen_class ";
	  			ResultSet rs2 = stmt2.executeQuery(sql2);
	  			 while(rs2.next()){
	  				out.println("\""+CamelCase(rs2.getString("perturbagen_class"))+"\":\""+rs2.getString("perturbagen_count")+"\"");
	  				if(!rs2.isLast()){
	  		           	 out.println(",");
	  		           }
	  			 }
	  			if(rs.isLast()){
 		           	 out.println("}");
 		           }
	  		 }
	  		 if(!rs.getString("model_systems").contentEquals("0")){
	  			 if(!rs.getString("perturbations").contentEquals("0")){
	  				out.println( ","   ); 
	  			 }
		  			out.println( "\""+"modelSystems"+"\": {"   );
		  	  		out.println("\"totalCount\":"+"\""+rs.getString("model_systems")+"\",");
		  			 String sql2 ="select count(distinct disease) as disease_count,count(distinct tissue) as tissue_count,count(distinct model_system_class) as cl_types  from public.signature_meatadata_temp " + tempStr.toLowerCase() +" group by model_system_class ";
		  			ResultSet rs2 = stmt2.executeQuery(sql2);
		  			 while(rs2.next()){
		  				 if(!rs2.getString("cl_types").contentEquals("0")){
		  					out.println("\""+"cellTypes"+"\":\""+rs2.getString("cl_types")+"\",");
			  				out.println("\""+"disease"+"\":\""+rs2.getString("disease_count")+"\",");
			  				out.println("\""+"tissues"+"\":\""+rs2.getString("tissue_count")+"\"");
		  				 }
		  				
		  			 }
		  			if(rs.isLast()){
	 		           	 out.println("}");
	 		           }
		  		 }
	  		if(!rs.getString("signatures").contentEquals("0")){
	  			 if(!rs.getString("model_systems").contentEquals("0")){
	  				out.println( "," ); 
	  			 }
		  			out.println( "\""+"signatures"+"\": {"   );
		  	  		out.println("\"totalCount\":"+"\""+rs.getString("signatures")+"\",");
		  			 String sql2 ="select count(distinct signature_id) as sub_signatures,assay_category  from public.signature_meatadata_temp " + tempStr.toLowerCase() +" group by assay_category ";
		  			ResultSet rs2 = stmt2.executeQuery(sql2);
		  			 while(rs2.next()){
			  				out.println("\""+CamelCase(rs2.getString("assay_category"))+"\":\""+rs2.getString("sub_signatures")+"\"");
			  				if(!rs2.isLast()){
			  		           	 out.println(",");
			  		           }
			  			 }
			  			if(rs.isLast()){
		 		           	 out.println("}");
		 		           }
		  		 }
        }
	  	
	  	
        

	  	conn.close();
	  	 }catch(Exception ex) {
	         ex.printStackTrace();
	     }
	  	 out.println("}");
	  	out.println("}");
	}
}
