package edu.miami.ccs.dcic;
// default package
// Generated Aug 17, 2018 5:01:20 PM by Hibernate Tools 4.3.1.Final


//default package
//Generated Aug 17, 2018 5:01:20 PM by Hibernate Tools 4.3.1.Final

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
* Autosuggest generated by hbm2java
*/
@Entity
@Table(name = "autosuggest", schema = "public")
public class Autosuggest implements java.io.Serializable {

	

	public Autosuggest() {
	}

	@Id
	@Column(name = "hit_object_id",nullable = false)
	private String hitObjectId;
	
	@Column(name = "suggest_term")
	private String suggestTerm;
	
	@Column(name = "hit_object_class")
	private String hitObjectClass;
	

	@Column(name = "suggest_object_table")
	private String suggestObjectTable;


	@Column(name = "hit_type")
	private String hitType;
	
	@Column(name = "hit_object_preferred_name")
	private String hitObjectPreferredName;
	
	@Column(name = "hit_object_lookup_table")
	private String hitObjectLookupTable;
	
	@Column(name = "hit_object_lookup_table_id_field")
	private String hitObjectLookupTableIdField;
	
	@Column(name = "hit_object_lookup_table_class_field")
	private String hitObjectLookupTableClassField;

	public String getHitObjectId() {
		return hitObjectId;
	}

	public void setHitObjectId(String hitObjectId) {
		this.hitObjectId = hitObjectId;
	}

	public String getSuggestTerm() {
		return suggestTerm;
	}

	public void setSuggestTerm(String suggestTerm) {
		this.suggestTerm = suggestTerm;
	}

	public String getHitObjectClass() {
		return hitObjectClass;
	}

	public void setHitObjectClass(String hitObjectClass) {
		this.hitObjectClass = hitObjectClass;
	}

	public String getSuggestObjectTable() {
		return suggestObjectTable;
	}

	public void setSuggestObjectTable(String suggestObjectTable) {
		this.suggestObjectTable = suggestObjectTable;
	}

	public String getHitType() {
		return hitType;
	}

	public void setHitType(String hitType) {
		this.hitType = hitType;
	}

	public String getHitObjectPreferredName() {
		return hitObjectPreferredName;
	}

	public void setHitObjectPreferredName(String hitObjectPreferredName) {
		this.hitObjectPreferredName = hitObjectPreferredName;
	}

	public String getHitObjectLookupTable() {
		return hitObjectLookupTable;
	}

	public void setHitObjectLookupTable(String hitObjectLookupTable) {
		this.hitObjectLookupTable = hitObjectLookupTable;
	}

	public String getHitObjectLookupTableIdField() {
		return hitObjectLookupTableIdField;
	}

	public void setHitObjectLookupTableIdField(String hitObjectLookupTableIdField) {
		this.hitObjectLookupTableIdField = hitObjectLookupTableIdField;
	}

	public String getHitObjectLookupTableClassField() {
		return hitObjectLookupTableClassField;
	}

	public void setHitObjectLookupTableClassField(String hitObjectLookupTableClassField) {
		this.hitObjectLookupTableClassField = hitObjectLookupTableClassField;
	}
	

	

}
