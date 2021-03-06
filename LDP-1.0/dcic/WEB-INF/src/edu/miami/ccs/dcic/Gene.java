package edu.miami.ccs.dcic;
// default package
// Generated Aug 19, 2018 11:59:41 AM by Hibernate Tools 4.3.1.Final

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * Gene generated by hbm2java
 */
@Entity
@Table(name = "gene", schema = "public", uniqueConstraints = @UniqueConstraint(columnNames = "component_object_id"))
public class Gene implements java.io.Serializable {

	private int entrezGeneId;
	private int componentObjectId;
	private String componentObjectClass;
	private String geneOrganismTaxid;
	private String geneSymbol;

	public Gene() {
	}

	public Gene(int entrezGeneId, int componentObjectId) {
		this.entrezGeneId = entrezGeneId;
		this.componentObjectId = componentObjectId;
	}

	public Gene(int entrezGeneId, int componentObjectId, String componentObjectClass, String geneOrganismTaxid,
			String geneSymbol) {
		this.entrezGeneId = entrezGeneId;
		this.componentObjectId = componentObjectId;
		this.componentObjectClass = componentObjectClass;
		this.geneOrganismTaxid = geneOrganismTaxid;
		this.geneSymbol = geneSymbol;
	}

	@Id

	@Column(name = "entrez_gene_id", unique = true, nullable = false)
	public int getEntrezGeneId() {
		return this.entrezGeneId;
	}

	public void setEntrezGeneId(int entrezGeneId) {
		this.entrezGeneId = entrezGeneId;
	}

	@Column(name = "component_object_id", unique = true, nullable = false)
	public int getComponentObjectId() {
		return this.componentObjectId;
	}

	public void setComponentObjectId(int componentObjectId) {
		this.componentObjectId = componentObjectId;
	}

	@Column(name = "component_object_class", length = 80)
	public String getComponentObjectClass() {
		return this.componentObjectClass;
	}

	public void setComponentObjectClass(String componentObjectClass) {
		this.componentObjectClass = componentObjectClass;
	}

	@Column(name = "gene_organism_taxid")
	public String getGeneOrganismTaxid() {
		return this.geneOrganismTaxid;
	}

	public void setGeneOrganismTaxid(String geneOrganismTaxid) {
		this.geneOrganismTaxid = geneOrganismTaxid;
	}

	@Column(name = "gene_symbol", length = 80)
	public String getGeneSymbol() {
		return this.geneSymbol;
	}

	public void setGeneSymbol(String geneSymbol) {
		this.geneSymbol = geneSymbol;
	}

}
