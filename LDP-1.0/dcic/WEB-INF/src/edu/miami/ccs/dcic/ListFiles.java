package edu.miami.ccs.dcic;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
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
import java.util.Vector;
import java.util.logging.Logger;
import java.net.SocketException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

public class ListFiles extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String path = null;
		String query;
		if(request.getParameter("path").toString().contains("LINCS_Data") || request.getParameter("path").toString().contains("External_Data") || request.getParameter("path").toString().contains("Bulk_Download") ){
			path = request.getParameter("path");
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

		PrintWriter out = response.getWriter();
		String SFTPHOST = props.getProperty("host");
		int SFTPPORT = 22;
		String SFTPUSER = props.getProperty("user");
		String SFTPPASS = props.getProperty("password");
		String SFTPWORKINGDIR = "/projects/ccs/bd2klincs/"+path;

		Session session = null;
		Channel channel = null;
		ChannelSftp channelSftp = null;
		
		out.println("{ \"documents\":[");
		

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
			channelSftp.cd(SFTPWORKINGDIR);
			Vector filelist = channelSftp.ls("*");
			for(int i=0; i<filelist.size();i++){
				LsEntry entry = (LsEntry) filelist.get(i);

				out.print("{"+"\"fileName\":\"" +entry.getFilename()+"\",");
				out.print("\"folder\":\""+entry.getAttrs().isDir()+"\",");
				out.print("\"date\":\""+entry.getAttrs().getMtimeString()+"\",");
				out.print("\"size\":\""+entry.getAttrs().getSize()+" \"");
				out.print("}");
				if(i<filelist.size()-1){
					out.println(",");	
				}
			}
			out.println("]}");
			channel.disconnect();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		

	}

}
