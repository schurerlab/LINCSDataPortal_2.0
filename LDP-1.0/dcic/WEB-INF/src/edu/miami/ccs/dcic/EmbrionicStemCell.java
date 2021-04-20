package edu.miami.ccs.dcic;
// default package
// Generated Aug 19, 2018 10:25:58 PM by Hibernate Tools 4.3.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * EmbrionicStemCell generated by hbm2java
 */
@Entity
@Table(name = "embrionic_stem_cell", schema = "public")
public class EmbrionicStemCell implements java.io.Serializable {

	private int modelSystemId;
	private String modelSystemClass;
	private Integer embrionicStemCellId;
	private String embrionicStemCellName;
	private String embrionicStemCellSpecies;

	public EmbrionicStemCell() {
	}

	public EmbrionicStemCell(int modelSystemId, String modelSystemClass) {
		this.modelSystemId = modelSystemId;
		this.modelSystemClass = modelSystemClass;
	}

	public EmbrionicStemCell(int modelSystemId, String modelSystemClass, Integer embrionicStemCellId,
			String embrionicStemCellName, String embrionicStemCellSpecies) {
		this.modelSystemId = modelSystemId;
		this.modelSystemClass = modelSystemClass;
		this.embrionicStemCellId = embrionicStemCellId;
		this.embrionicStemCellName = embrionicStemCellName;
		this.embrionicStemCellSpecies = embrionicStemCellSpecies;
	}

	@Id

	@Column(name = "model_system_id", unique = true, nullable = false)
	public int getModelSystemId() {
		return this.modelSystemId;
	}

	public void setModelSystemId(int modelSystemId) {
		this.modelSystemId = modelSystemId;
	}

	@Column(name = "model_system_class", nullable = false, length = 80)
	public String getModelSystemClass() {
		return this.modelSystemClass;
	}

	public void setModelSystemClass(String modelSystemClass) {
		this.modelSystemClass = modelSystemClass;
	}

	@Column(name = "embrionic_stem_cell_id")
	public Integer getEmbrionicStemCellId() {
		return this.embrionicStemCellId;
	}

	public void setEmbrionicStemCellId(Integer embrionicStemCellId) {
		this.embrionicStemCellId = embrionicStemCellId;
	}

	@Column(name = "embrionic_stem_cell_name")
	public String getEmbrionicStemCellName() {
		return this.embrionicStemCellName;
	}

	public void setEmbrionicStemCellName(String embrionicStemCellName) {
		this.embrionicStemCellName = embrionicStemCellName;
	}

	@Column(name = "embrionic_stem_cell_species", length = 80)
	public String getEmbrionicStemCellSpecies() {
		return this.embrionicStemCellSpecies;
	}

	public void setEmbrionicStemCellSpecies(String embrionicStemCellSpecies) {
		this.embrionicStemCellSpecies = embrionicStemCellSpecies;
	}

}
