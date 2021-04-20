package edu.miami.ccs.dcic;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name = "autosuggest_temp", schema = "public")
public class AutosuggestTemp implements java.io.Serializable {



	public AutosuggestTemp() {
	}

	
	
	@Id
	@Column(name="id")
	private Integer id;
	
	@Column(name = "hit_object_id")
	private String hitObjectId;
	
	@Column(name = "suggest_term")
	private String suggestTerm;
	
	@Column(name = "hit_object_class")
	private String hitObjectClass;
	

	@Column(name = "suggest_object_table")
	private String suggestObjectTable;


	@Column(name = "suggest_object_class")
	private String suggestObjectClass;
	
	@Column(name = "hit_object_preferred_name")
	private String hitObjectPreferredName;

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

	public String getSuggestObjectClass() {
		return suggestObjectClass;
	}

	public void setSuggestObjectClass(String suggestObjectClass) {
		this.suggestObjectClass = suggestObjectClass;
	}

	public String getHitObjectPreferredName() {
		return hitObjectPreferredName;
	}

	public void setHitObjectPreferredName(String hitObjectPreferredName) {
		this.hitObjectPreferredName = hitObjectPreferredName;
	}

	



}
