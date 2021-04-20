package edu.miami.ccs.dcic;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Reader;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import com.mongodb.selector.ServerAddressSelector;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.Block;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.ServerAddress;
import com.mongodb.MongoCredential;

public class CSVFileParser extends HttpServlet {

//	ServerAddress serverAddress = new ServerAddress("localhost", 27017);
//	// final MongoCredential creds =
//	// MongoCredential.createCredential("SigC","SignatureData","SigC".toCharArray());
//	MongoClient mongoClient = new MongoClient(serverAddress);
//	DB db = mongoClient.getDB("dss");
//	DBCollection coll = db.getCollection("rss");

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	
		String user = request.getParameter("user");
		String SAMPLE_CSV_FILE_PATH = "/tmp/" + request.getParameter("file");
		String pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		Iterable<CSVRecord> records;
		
		Reader in = new FileReader(SAMPLE_CSV_FILE_PATH);
		records = CSVFormat.DEFAULT.withHeader().withSkipHeaderRecord(false).parse(in);
	
		System.out.println("**************"+records);
		Set<String> headers = records.iterator().next().toMap().keySet();
	
		if (headers.contains("Name") || headers.contains("Title")) {
			try (Reader reader = Files.newBufferedReader(Paths.get(SAMPLE_CSV_FILE_PATH));

					Reader csvrecords = Files.newBufferedReader(Paths.get(SAMPLE_CSV_FILE_PATH));
					Reader reader3 = Files.newBufferedReader(Paths.get(SAMPLE_CSV_FILE_PATH));

					CSVParser totalRecords = new CSVParser(csvrecords,
							CSVFormat.DEFAULT.withHeader().withIgnoreHeaderCase().withSkipHeaderRecord());
				

			) {
				int totalC = totalRecords.getRecords().size();
				

				for (CSVRecord csvRecord : CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader3)) {
					BasicDBObject doc = new BasicDBObject();
					BasicDBObject documentBuilderDetail = new BasicDBObject();
					if (headers.contains("logP/hydrophobicity") || headers.contains("Water_solubility")
							|| headers.contains("Molecular_weight") || headers.contains("ZINC_ID")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Small Molecules");

					} else if (headers.contains("Construct details") || headers.contains("MMRRC ID")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Mouse Model");
					} else if (headers.contains("Disease_ID") || headers.contains("CLO_ID")
							|| headers.contains("Cellosaurus_ID") || headers.contains("Disease_name")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Cells");
					} else if (headers.contains("Ga_chimeric") || headers.contains("Chimeric_Uni")
							|| headers.contains("oGPCR") || headers.contains("oGPCR_Uni")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Genetic Constructs");
					} else if (headers.contains("Peptide_sequence") || headers.contains("PRM type")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Peptide");
					} else if (headers.contains("Ptm_target") || headers.contains("Target_species")
							|| headers.contains("Target_domain")) {
						doc.append("name", csvRecord.get("Name"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "IDG Antibodies");
						// sql+="'"+csvRecord.get("Name")+"',"+"'IDG
						// Antibodies','"+user+"','"+date+"'"+",'"+date+"','"+user+"','"+date+"')";
					} else if (headers.contains("Expression data")) {
						doc.append("name", csvRecord.get("Title"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "GPCR mouse imaging data");
						// sql+="'"+csvRecord.get("Title")+"',"+"'GPCR mouse
						// imaging
						// data','"+user+"','"+date+"'"+",'"+date+"','"+user+"','"+date+"')";
					} else if (headers.contains("Ligand type") || headers.contains("Negative control")) {
						doc.append("name", csvRecord.get("Title"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "Probe data");
						// sql+="'"+csvRecord.get("Title")+"',"+"'Probe
						// data','"+user+"','"+date+"'"+",'"+date+"','"+user+"','"+date+"')";
					} else if (headers.contains("Dataset ID")) {
						doc.append("name", csvRecord.get("Title"));
						doc.append("target", csvRecord.get("Gene"));
						doc.append("user", user);
						doc.append("resourceType", "Dataset");
						// sql+="'"+csvRecord.get("Title")+"',"+"'Dataset','"+user+"','"+date+"'"+",'"+date+"','"+user+"','"+date+"')";
					}
					try {
						System.out.println(doc);
//						coll.insert(doc);
					} catch (Exception e) {
						e.printStackTrace();
					}


				}

			}

		}
	}

}
