package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.ApplicationEntity;
import dash.security.IAclObject;

import java.io.File;
import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Application implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;	

	@XmlElement(name = "document_folder")
	private String document_folder;
	
	@XmlElement(name = "name")
	private String name;
	
	@XmlElement(name = "creation_timestamp")
	private Date creation_timestamp;
	
	@XmlElement(name = "uh_id")
	private Long uh_id;
	
	@XmlElement(name = "first_name")
	private String first_name;
	
	@XmlElement(name = "last_name")
	private String last_name;
	
	public Long getId() {
		return id;
	}	
	
	public Application(){}
	
//	public Application(Long id, String name, Date creation_timestamp) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.creation_timestamp = creation_timestamp;
//	}
	
	public Application(ApplicationEntity applicationEntity) {
		try {
			BeanUtils.copyProperties(this, applicationEntity);
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
	}

	public void setId(Long id) {
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
