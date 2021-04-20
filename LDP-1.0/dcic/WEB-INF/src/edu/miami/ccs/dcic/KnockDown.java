package edu.miami.ccs.dcic;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class KnockDown extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setContentType("application/json");
	
		Properties props = new Properties();
		
		InputStream is = null;
		try {
			is = getClass().getClassLoader().getResourceAsStream("db_config.properties");
		} catch (Exception e3) {
			e3.printStackTrace();
		}
    	try {
    		props.load(is);
		} catch (IOException e2) {
			e2.printStackTrace();
		}
    	
		String id = request.getParameter("id");
		System.out.println();
		DBConnection dbCon = new DBConnection(props.getProperty("JDBC_URL"), props.getProperty("USERNAME"),
				props.getProperty("PASSWORD"));
		Connection con = dbCon.getConnection();
		PreparedStatement stmt;
		String query = null;
		try {
	
		
		JSONArray jsArray = new JSONArray(); 
		if(id==null){
		query="select distinct perturbagen_class[1],nucleic_acid_reagent_type[1],nucleic_acid_reagent_subtype[1],nucleic_acid_reagent_target_locus[1],nucleic_acid_reagent_target_locus_species[1],nucleic_acid_reagent_entrez_gene_id[1],max(perturbagen_id[1]) as perturbagen_id"
	  				+ " from dm.lookup_signature_object_perturbation_nucleic_acid_reagent "
	  				+ " where nucleic_acid_reagent_type[1] = 'Coding'"
	  				+ " group by  perturbagen_class[1],nucleic_acid_reagent_type[1],nucleic_acid_reagent_subtype[1],nucleic_acid_reagent_target_locus[1],nucleic_acid_reagent_target_locus_species[1],nucleic_acid_reagent_entrez_gene_id[1]";
	  				}else{
		query = "select object_id,object_class,efo_term,efo_id,mesh_heading,mesh_id,max_phase_for_ind from dm.small_molecule_clinical_annotations  where object_id = ? ";	
		}
		stmt = con.prepareStatement(query);
		if(id!=null){
		stmt.setInt(1, Integer.parseInt(id));
		}
		try {
			System.out.println(query);
			ResultSet rs = stmt.executeQuery();
			int columns = rs.getMetaData().getColumnCount();
	        while (rs.next()) {
	            JSONObject obj = new JSONObject();
	            for (int i = 1; i <= columns; i++) {
	                Object tempObject=rs.getObject(i);
	                obj.put(rs.getMetaData().getColumnLabel(i), tempObject);
	            }
	            jsArray.add(obj);
	        }
			response.getWriter().print(jsArray);
			response.flushBuffer();
			con.close();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}