package edu.miami.ccs.dcic;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


public class DatasetValidation extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
//		this.doGet(req, resp);
		resp.setContentType("text/html");
		PrintWriter out = resp.getWriter();
		out.println("{");
		try{

			JsonParser parser = new JsonParser();
			JsonElement investigator = null, center=null, associatedReagentMetadataCategories = null,authorAffiliation = null,assay =null,areaOfStudy = null,datasetTitle = null,datasetReleaseDate = null;
			
			JsonElement jsonTree = parser.parse(req.getReader());
			if(jsonTree.isJsonObject()){
				JsonObject jsonObject = jsonTree.getAsJsonObject();
				
				System.out.println(jsonObject);
				JsonElement metadata = jsonObject.get("Dataset Metadata Entity");
				
			
				if(metadata.isJsonObject()){
					JsonObject datasetMetadata = metadata.getAsJsonObject();
					 investigator = datasetMetadata.get("principleInvestigator").getAsJsonObject().get("@value");
					 center = datasetMetadata.get("centerName").getAsJsonObject().get("@value");
					 associatedReagentMetadataCategories = datasetMetadata.get("associatedReagentMetadataCategories").getAsJsonArray().get(0).getAsJsonObject().get("@value");
					 authorAffiliation = datasetMetadata.get("datasetAuthorAffiliation").getAsJsonObject().get("@value");
					 assay = datasetMetadata.get("assayName").getAsJsonArray().get(0).getAsJsonObject().get("@value");
					 areaOfStudy = datasetMetadata.get("areaOfStudy").getAsJsonArray().get(0).getAsJsonObject().get("@value");
					 datasetTitle = datasetMetadata.get("datasetTitle").getAsJsonObject().get("@value");
					 datasetReleaseDate = datasetMetadata.get("datasetReleaseDate").getAsJsonObject().get("@value");
				}
				
			}		
			if(investigator.isJsonNull() || center.isJsonNull()  || associatedReagentMetadataCategories.isJsonNull() || authorAffiliation.isJsonNull()  || assay.isJsonNull()  || areaOfStudy.isJsonNull()  || datasetTitle.isJsonNull()  || datasetReleaseDate.isJsonNull() ){

				  out.println("\"validates\":"+"false,");
				  out.print("\"errors\":[");
				  List<String> list = new ArrayList<String>();
				 
				  if(center.isJsonNull() ){
					  list.add("\"Center is empty\"");
				  }
				  if(investigator.isJsonNull() ){
					  list.add("\"Principle Investigator is empty\"");
				  }
				  if(authorAffiliation.isJsonNull() ){
					  list.add("\"Author Affiliation is empty\""); 
				  }
				  if(assay.isJsonNull() ){
					  list.add("\"Assay Name  is empty\"");
				  }
				  if(areaOfStudy.isJsonNull() ){
					  list.add("\"Area Of Study  is empty\"");
				  }
				  if(datasetTitle.isJsonNull() ){
					  list.add("\"Dataset Title  is empty\"");
				  }
				  if(datasetReleaseDate.isJsonNull() ){
					  list.add("\"Release Date  is empty\"");
				  } 
				  if(associatedReagentMetadataCategories.isJsonNull() ){
					  list.add("\"MetadataCategories  is empty\"");
				  } 
				  for(int i=0;i<list.size();i++){
					  out.print(list.get(i));
					  if(i<list.size()-1){
						  out.print(",");
					  }else{
						  out.println("],");  
					  }
				  }
				  out.println("\"warnings\":"+"[\"\"]");
			}
			if(!investigator.isJsonNull() && !center.isJsonNull() && !associatedReagentMetadataCategories.isJsonNull()  && !authorAffiliation.isJsonNull()  && !assay.isJsonNull()  && !areaOfStudy.isJsonNull()  && !datasetTitle.isJsonNull()  && !datasetReleaseDate.isJsonNull() ){
				
				  List<String> list = new ArrayList<String>();
				 if( list.isEmpty()){
					 out.println("\"validates\":"+"true,");
					  out.println("\"errors\":"+"[\"\"],");
					  out.println("\"warnings\":"+"[\"\"]");
				 }else{
					 out.println("\"validates\":"+"false,");
					 out.print("\"errors\":[");
					 for(int i=0;i<list.size();i++){
						  out.print(list.get(i));
						  if(i<list.size()-1){
							  out.print(",");
						  }else{
							  out.println("],");  
						  }
					  }
					  out.println("\"warnings\":"+"[\"\"]");
				 }
			
			}
			}catch(JsonSyntaxException jse){
				  out.println("\"validates\":"+"false,");
				  out.println("\"errors\":"+"[\"invalid json\"],");
				  out.println("\"warnings\":"+"[\"\"]");
			}
			
			   
			
			
			out.println("}");
	
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String query = request.getParameter("validate");
		query = query.replace("Dataset Metadata Entity", "datasetMetadataEntity");
		out.println("{");
		try{
		JsonParser parser = new JsonParser();	
		
		JsonElement investigator = null,center=null,associatedReagentMetadataCategories = null,authorAffiliation = null,assay =null,areaOfStudy = null,datasetTitle = null,datasetReleaseDate = null;
		JsonElement jsonTree = parser.parse(query);
	
		if(jsonTree.isJsonObject()){
			JsonObject jsonObject = jsonTree.getAsJsonObject();
			JsonElement metadata = jsonObject.get("datasetMetadataEntity");
			if(metadata.isJsonObject()){
				JsonObject datasetMetadata = metadata.getAsJsonObject();
				 investigator = datasetMetadata.get("principleInvestigator").getAsJsonObject().get("@value");
				 center = datasetMetadata.get("centerName").getAsJsonObject().get("@value");
				 associatedReagentMetadataCategories = datasetMetadata.get("associatedReagentMetadataCategories").getAsJsonArray().get(0).getAsJsonObject().get("@value");
				 authorAffiliation = datasetMetadata.get("datasetAuthorAffiliation").getAsJsonObject().get("@value");
				 assay = datasetMetadata.get("assayName").getAsJsonArray().get(0).getAsJsonObject().get("@value");
				 areaOfStudy = datasetMetadata.get("areaOfStudy").getAsJsonArray().get(0).getAsJsonObject().get("@value");
				 datasetTitle = datasetMetadata.get("datasetTitle").getAsJsonObject().get("@value");
				 datasetReleaseDate = datasetMetadata.get("datasetReleaseDate").getAsJsonObject().get("@value");
			}
			
		}		
		if(investigator.isJsonNull() || center.isJsonNull() || associatedReagentMetadataCategories.isJsonNull()  || authorAffiliation.isJsonNull()  || assay.isJsonNull()  || areaOfStudy.isJsonNull()  || datasetTitle.isJsonNull()  || datasetReleaseDate.isJsonNull() ){

			  out.println("\"validates\":"+"false,");
			  out.print("\"errors\":[");
			  List<String> list = new ArrayList<String>();
			  
			  if(center.isJsonNull() ){
				  list.add("\"Center is empty\"");
			  }
			  if(investigator.isJsonNull() ){
				  list.add("\"Principle Investigator is empty\"");
			  }
			  if(authorAffiliation.isJsonNull() ){
				  list.add("\"Author Affiliation is empty\""); 
			  }
			  if(assay.isJsonNull() ){
				  list.add("\"Assay Name  is empty\"");
			  }
			  if(areaOfStudy.isJsonNull() ){
				  list.add("\"Area Of Study  is empty\"");
			  }
			  if(datasetTitle.isJsonNull() ){
				  list.add("\"Dataset Title  is empty\"");
			  }
			  if(datasetReleaseDate.isJsonNull() ){
				  list.add("\"Release Date  is empty\"");
			  } 
			  if(associatedReagentMetadataCategories.isJsonNull() ){
				  list.add("\"Metadata Categories  is empty\"");
			  } 
			  for(int i=0;i<list.size();i++){
				  out.print(list.get(i));
				  if(i<list.size()-1){
					  out.print(",");
				  }else{
					  out.println("],");  
				  }
			  }
			  out.println("\"warnings\":"+"[\"\"]");
		}
		if(!investigator.isJsonNull() && !center.isJsonNull()  && !associatedReagentMetadataCategories.isJsonNull()  && !authorAffiliation.isJsonNull()  && !assay.isJsonNull()  && !areaOfStudy.isJsonNull()  && !datasetTitle.isJsonNull()  && !datasetReleaseDate.isJsonNull() ){
		
			  List<String> list = new ArrayList<String>();
			 if( list.isEmpty()){
				 out.println("\"validates\":"+"true,");
				  out.println("\"errors\":"+"[\"\"],");
				  out.println("\"warnings\":"+"[\"\"]");
			 }else{
				 out.println("\"validates\":"+"false,");
				 out.print("\"errors\":[");
				 for(int i=0;i<list.size();i++){
					  out.print(list.get(i));
					  if(i<list.size()-1){
						  out.print(",");
					  }else{
						  out.println("],");  
					  }
				  }
				  out.println("\"warnings\":"+"[\"\"]");
			 }
		
		}
		}catch(JsonSyntaxException jse){
			  out.println("\"validates\":"+"false,");
			  out.println("\"errors\":"+"[\"invalid json\"],");
			  out.println("\"warnings\":"+"[\"\"]");
		}
		
		   
		
		
		out.println("}");
		
		
	
	
		
	}

}
