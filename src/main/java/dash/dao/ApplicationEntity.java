package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.pojo.Application;

/**
 * Application entity
 * @author plindner
 *
 */
@Entity
@Table(name="applications")
public class ApplicationEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	/** path to stored documents for this object */
	@Column(name = "document_folder")
	private String document_folder;

	/** description of the object */
	@Column(name = "name")
	private String name;

	/** insertion date in the database */
	@Column(name = "creation_timestamp")
	private Date creation_timestamp;
	
	@Column(name = "uh_id")
	private Long uh_id;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;

	public ApplicationEntity(){}

	public ApplicationEntity(String document_folder, String name) {

		this.document_folder = document_folder;
		this.name = name;
	}

	public ApplicationEntity(Application application) {
		try {
			BeanUtils.copyProperties(this, application);
		} catch ( IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch ( InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Long getId() {
		return id;
	}

	public void setId( Long id) {
		this.id = id;
	}

	public String getDocument_folder() {
		return document_folder;
	}

	public void setDocument_folder(String document_folder) {
		this.document_folder = document_folder;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreation_timestamp() {
		return creation_timestamp;
	}

	public void setCreation_timestamp(Date creation_timestamp) {
		this.creation_timestamp = creation_timestamp;
	}

	public Long getUh_id() {
		return uh_id;
	}

	public void setUh_id(Long uh_id) {
		this.uh_id = uh_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
}
