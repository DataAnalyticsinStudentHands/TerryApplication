package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.ScholarshipEntity;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Scholarship implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	@XmlElement(name = "applied_received")
	private Boolean applied_received;

	@XmlElement(name = "name")
	private String name;
	
	@XmlElement(name = "duration")
	private String duration;
	
	@XmlElement(name = "amount")
	private String amount;
	
	public Scholarship(){}
	
	public Scholarship(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Scholarship(ScholarshipEntity scholarshipEntity) {
		try {
			BeanUtils.copyProperties(this, scholarshipEntity);			
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getApplication_id() {
		return application_id;
	}

	public void setApplication_id(Long application_id) {
		this.application_id = application_id;
	}

	public Boolean getApplied_received() {
		return applied_received;
	}

	public void setApplied_received(Boolean applied_received) {
		this.applied_received = applied_received;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

}
