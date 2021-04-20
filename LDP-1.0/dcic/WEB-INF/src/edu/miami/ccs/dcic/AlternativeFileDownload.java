package edu.miami.ccs.dcic;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;
import java.net.SocketException;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;

public class AlternativeFileDownload extends HttpServlet {
	
	protected void doHead(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException
			{
			doGet(req, resp);
			} 

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = null;
		String file = null;
		String lastModified = null;
		String query;
		if(request.getParameter("path").toString().contains("Protocols") ||request.getParameter("path").toString().contains("LINCS_Data") || request.getParameter("path").toString().contains("External_Data") || request.getParameter("path").toString().contains("Bulk_Download") ){
			path = request.getParameter("path");
			if (!request.getParameter("file").toString().contains("..")){
				query =request.getParameter("file");	
			}else{
				query = "NotFound";
			}
		}else{
			query = "NotFound";
		}
		Properties props=new Properties();
		InputStream is = null;
		try {
			is = getClass().getClassLoader().getResourceAsStream("db_config.properties");
		} catch (Exception e3) {
			e3.printStackTrace();
		}		
		response.setContentType("application/x-gzip");
		response.setHeader("Content-disposition","attachment; filename="+query);
		BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
		
		String SFTPHOST = props.getProperty("host");
		int SFTPPORT = 22;
		String SFTPUSER = props.getProperty("user");
		String SFTPPASS = props.getProperty("password");
		String SFTPWORKINGDIR = "";
		if(!path.contains("..")){
			 SFTPWORKINGDIR = "/projects/ccs/bd2klincs/"+path;
		}
		

		Session session = null;
		Channel channel = null;
		ChannelSftp channelSftp = null;
	
		
		try {
			
		
			JSch jsch = new JSch();
			session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
			session.setPassword(SFTPPASS);
			java.util.Properties config = new java.util.Properties();
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);
			session.connect();
			channel = session.openChannel("sftp");
		
			channel.connect();
			channelSftp = (ChannelSftp) channel;
			SftpATTRS attrs = channelSftp.lstat(SFTPWORKINGDIR+"/"+query);
			response.addHeader("Last-Modified", attrs.getMtimeString());
			channelSftp.get(SFTPWORKINGDIR+"/"+query,out);
			session.disconnect();	
		} catch (Exception ex) {
			ex.printStackTrace();
		}


		
	
	}
	

}
