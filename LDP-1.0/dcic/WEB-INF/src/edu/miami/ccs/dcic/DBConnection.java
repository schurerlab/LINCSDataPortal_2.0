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
package edu.miami.ccs.dcic;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Helper class needed to create direct database JDBC connection. Instantiate
 * using constructor with arguments and call getConnection() method
 * 
 * @author Sreeharsha Venkatapuram, UM Center for Computational Science
 * @version 2.0
 * @since 4th April 2016
 */
public class DBConnection {

	private static final String POSTGRES_JDBC_DRIVER = "org.postgresql.Driver";
	private String jdbcUri = null;
	private String dbPword = null;
	private String dbUname = null;

	public DBConnection() {

	}

	/**
	 * Constructor to instantiate the DBConnection class with all arguments
	 * needed to open a connection
	 * 
	 * @param jdbcUri
	 *            - JDBC URI to connect to
	 * @param dbUname
	 *            - Database username
	 * @param dbPword
	 *            - Database password
	 */
	public DBConnection(String jdbcUri, String dbUname, String dbPword) {
		super();
		this.jdbcUri = jdbcUri;
		this.dbPword = dbPword;
		this.dbUname = dbUname;
	}

	/**
	 * 
	 * @return Connection object which can be used to connect to database
	 *         instantiated on DBConnection object
	 */
	public Connection getConnection() {
		String jdbcDriver = System.getProperty(POSTGRES_JDBC_DRIVER);
		Connection con = null;
		Connection con1 = null;
		try {
			DriverManager.registerDriver(new org.postgresql.Driver());
		} catch (SQLException e1) {
			e1.printStackTrace();
		}

		try {
			con = DriverManager.getConnection(jdbcUri, dbUname, dbPword);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return con;

	}
}