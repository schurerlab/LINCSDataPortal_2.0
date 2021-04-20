package edu.miami.ccs.dcic;

/**
 Copyright (c) 2011, The University of Miami
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * Neither the name of the University of Miami nor the
 names of its contributors may be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE UNIVERSITY OF MIAMI BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import edu.miami.ccs.dcic.AutosuggestTemp;
import edu.miami.ccs.dcic.HibernateUtil;
import edu.miami.ccs.dcic.CamelCase;

/**
 * @author akoleti - UM Center for Computational Science
 * 
 *         Servlet implementation to return the Participant details given the Id
 */
public class Suggest extends HttpServlet {

	private static final long serialVersionUID = -1769618792883731258L;
	Logger log = Logger.getLogger(this.getClass().getName());
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	Session session = sessionFactory.getCurrentSession();
	
	Transaction tx = session.beginTransaction();

	

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest
	 * , javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doGet(req, resp);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		 response.setContentType("application/json");
		PrintWriter out = response.getWriter();

		 String searchTerm = "%"+request.getParameter("term")+"%";
		
		 out.println("{");
         out.println("\"data\":");
         out.println("[");
		

		String QueryStr = "from AutosuggestTemp  where lower(suggest_term) like '"
				+ searchTerm.toLowerCase()
				+ "'";

		Query query = session.createQuery(QueryStr);

		List<AutosuggestTemp> suugestList = query.list();

	
		int i = 0;
		for(AutosuggestTemp sl : suugestList){

			out.println("{");
        	out.println("\"ID\":"+"\""+sl.getHitObjectId()+"\",");
            out.println("\"name\":"+"\""+sl.getSuggestTerm().replaceAll("'", "").replaceAll("\"", "").replaceAll("- ", "-")+"\",");
            if(sl.getHitObjectPreferredName() != null){
                out.println("\"preferredName\":"+"\""+sl.getHitObjectPreferredName().replaceAll("\"", "").replaceAll("'", "")+"\",");
            }
            out.println("\"queryClass\":"+"\""+sl.getSuggestObjectClass()+"\",");
            out.println("\"resultGroup\":"+"\""+sl.getSuggestObjectTable()+"\"");
      
            out.println("}");
            
           
            if(i++ == suugestList.size() - 1){
          
            }else{
             	 out.println(",");
            }

		}

		

	
		  out.println("]");
	        out.println("}");
	
	}

	/**
	 * Called by the init(...) method to generate hibernate Session object
	 * 
	 * @return Hibernate SessionFactory object
	 * 
	 */
	

}
