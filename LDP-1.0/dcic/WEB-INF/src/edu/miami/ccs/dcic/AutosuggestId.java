package edu.miami.ccs.dcic;
// default package
// Generated Aug 17, 2018 6:18:33 PM by Hibernate Tools 4.3.1.Final

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * AutosuggestId generated by hbm2java
 */
@Embeddable
public class AutosuggestId implements java.io.Serializable {

	private Integer hitObjectId;
	private String suggestTerm;
	private String hitObjectClass;
	private String suggestObjectTable;
	private String hitType;
	private String hitObjectPreferredName;
	private String suggestObjectPreferredName;
	private String hitObjectLookupTable;
	private String hitObjectLookupTableIdField;
	private String hitObjectLookupTableClassField;

	public AutosuggestId() {
	}

	public AutosuggestId(Integer hitObjectId, String suggestTerm, String hitObjectClass, String suggestObjectTable,
			String hitType, String hitObjectPreferredName, String suggestObjectPreferredName,
			String hitObjectLookupTable, String hitObjectLookupTableIdField, String hitObjectLookupTableClassField) {
		this.hitObjectId = hitObjectId;
		this.suggestTerm = suggestTerm;
		this.hitObjectClass = hitObjectClass;
		this.suggestObjectTable = suggestObjectTable;
		this.hitType = hitType;
		this.hitObjectPreferredName = hitObjectPreferredName;
		this.suggestObjectPreferredName = suggestObjectPreferredName;
		this.hitObjectLookupTable = hitObjectLookupTable;
		this.hitObjectLookupTableIdField = hitObjectLookupTableIdField;
		this.hitObjectLookupTableClassField = hitObjectLookupTableClassField;
	}

	@Column(name = "hit_object_id")
	public Integer getHitObjectId() {
		return this.hitObjectId;
	}

	public void setHitObjectId(Integer hitObjectId) {
		this.hitObjectId = hitObjectId;
	}

	@Column(name = "suggest_term")
	public String getSuggestTerm() {
		return this.suggestTerm;
	}

	public void setSuggestTerm(String suggestTerm) {
		this.suggestTerm = suggestTerm;
	}

	@Column(name = "hit_object_class", length = 80)
	public String getHitObjectClass() {
		return this.hitObjectClass;
	}

	public void setHitObjectClass(String hitObjectClass) {
		this.hitObjectClass = hitObjectClass;
	}

	@Column(name = "suggest_object_table", length = 80)
	public String getSuggestObjectTable() {
		return this.suggestObjectTable;
	}

	public void setSuggestObjectTable(String suggestObjectTable) {
		this.suggestObjectTable = suggestObjectTable;
	}

	@Column(name = "hit_type", length = 80)
	public String getHitType() {
		return this.hitType;
	}

	public void setHitType(String hitType) {
		this.hitType = hitType;
	}

	@Column(name = "hit_object_preferred_name")
	public String getHitObjectPreferredName() {
		return this.hitObjectPreferredName;
	}

	public void setHitObjectPreferredName(String hitObjectPreferredName) {
		this.hitObjectPreferredName = hitObjectPreferredName;
	}

	@Column(name = "suggest_object_preferred_name")
	public String getSuggestObjectPreferredName() {
		return this.suggestObjectPreferredName;
	}

	public void setSuggestObjectPreferredName(String suggestObjectPreferredName) {
		this.suggestObjectPreferredName = suggestObjectPreferredName;
	}

	@Column(name = "hit_object_lookup_table", length = 180)
	public String getHitObjectLookupTable() {
		return this.hitObjectLookupTable;
	}

	public void setHitObjectLookupTable(String hitObjectLookupTable) {
		this.hitObjectLookupTable = hitObjectLookupTable;
	}

	@Column(name = "hit_object_lookup_table_id_field", length = 80)
	public String getHitObjectLookupTableIdField() {
		return this.hitObjectLookupTableIdField;
	}

	public void setHitObjectLookupTableIdField(String hitObjectLookupTableIdField) {
		this.hitObjectLookupTableIdField = hitObjectLookupTableIdField;
	}

	@Column(name = "hit_object_lookup_table_class_field", length = 80)
	public String getHitObjectLookupTableClassField() {
		return this.hitObjectLookupTableClassField;
	}

	public void setHitObjectLookupTableClassField(String hitObjectLookupTableClassField) {
		this.hitObjectLookupTableClassField = hitObjectLookupTableClassField;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof AutosuggestId))
			return false;
		AutosuggestId castOther = (AutosuggestId) other;

		return ((this.getHitObjectId() == castOther.getHitObjectId()) || (this.getHitObjectId() != null
				&& castOther.getHitObjectId() != null && this.getHitObjectId().equals(castOther.getHitObjectId())))
				&& ((this.getSuggestTerm() == castOther.getSuggestTerm())
						|| (this.getSuggestTerm() != null && castOther.getSuggestTerm() != null
								&& this.getSuggestTerm().equals(castOther.getSuggestTerm())))
				&& ((this.getHitObjectClass() == castOther.getHitObjectClass())
						|| (this.getHitObjectClass() != null && castOther.getHitObjectClass() != null
								&& this.getHitObjectClass().equals(castOther.getHitObjectClass())))
				&& ((this.getSuggestObjectTable() == castOther.getSuggestObjectTable())
						|| (this.getSuggestObjectTable() != null && castOther.getSuggestObjectTable() != null
								&& this.getSuggestObjectTable().equals(castOther.getSuggestObjectTable())))
				&& ((this.getHitType() == castOther.getHitType()) || (this.getHitType() != null
						&& castOther.getHitType() != null && this.getHitType().equals(castOther.getHitType())))
				&& ((this.getHitObjectPreferredName() == castOther.getHitObjectPreferredName())
						|| (this.getHitObjectPreferredName() != null && castOther.getHitObjectPreferredName() != null
								&& this.getHitObjectPreferredName().equals(castOther.getHitObjectPreferredName())))
				&& ((this.getSuggestObjectPreferredName() == castOther.getSuggestObjectPreferredName())
						|| (this.getSuggestObjectPreferredName() != null
								&& castOther.getSuggestObjectPreferredName() != null
								&& this.getSuggestObjectPreferredName()
										.equals(castOther.getSuggestObjectPreferredName())))
				&& ((this.getHitObjectLookupTable() == castOther.getHitObjectLookupTable())
						|| (this.getHitObjectLookupTable() != null && castOther.getHitObjectLookupTable() != null
								&& this.getHitObjectLookupTable().equals(castOther.getHitObjectLookupTable())))
				&& ((this.getHitObjectLookupTableIdField() == castOther.getHitObjectLookupTableIdField())
						|| (this.getHitObjectLookupTableIdField() != null
								&& castOther.getHitObjectLookupTableIdField() != null
								&& this.getHitObjectLookupTableIdField()
										.equals(castOther.getHitObjectLookupTableIdField())))
				&& ((this.getHitObjectLookupTableClassField() == castOther.getHitObjectLookupTableClassField())
						|| (this.getHitObjectLookupTableClassField() != null
								&& castOther.getHitObjectLookupTableClassField() != null
								&& this.getHitObjectLookupTableClassField()
										.equals(castOther.getHitObjectLookupTableClassField())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getHitObjectId() == null ? 0 : this.getHitObjectId().hashCode());
		result = 37 * result + (getSuggestTerm() == null ? 0 : this.getSuggestTerm().hashCode());
		result = 37 * result + (getHitObjectClass() == null ? 0 : this.getHitObjectClass().hashCode());
		result = 37 * result + (getSuggestObjectTable() == null ? 0 : this.getSuggestObjectTable().hashCode());
		result = 37 * result + (getHitType() == null ? 0 : this.getHitType().hashCode());
		result = 37 * result + (getHitObjectPreferredName() == null ? 0 : this.getHitObjectPreferredName().hashCode());
		result = 37 * result
				+ (getSuggestObjectPreferredName() == null ? 0 : this.getSuggestObjectPreferredName().hashCode());
		result = 37 * result + (getHitObjectLookupTable() == null ? 0 : this.getHitObjectLookupTable().hashCode());
		result = 37 * result
				+ (getHitObjectLookupTableIdField() == null ? 0 : this.getHitObjectLookupTableIdField().hashCode());
		result = 37 * result + (getHitObjectLookupTableClassField() == null ? 0
				: this.getHitObjectLookupTableClassField().hashCode());
		return result;
	}

}