package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.EmploymentEntity;
import dash.helpers.SimpleDateAdapter;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Employment implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	@XmlElement(name = "position")
	private String position;

	@XmlElement(name = "employer")
	private String employer;	
	
	@XmlElement(name = "hours")
	private Long hours;
	
	@XmlElement(name = "date_from")
	@XmlJavaTypeAdapter(SimpleDateAdapter.class)
	@ApplicationDetailedView
	private Date date_from;
	
	@XmlElement(name = "date_to")
	@XmlJavaTypeAdapter(SimpleDateAdapter.class)
	@ApplicationDetailedView
	private Date date_to;
	
	public Employment(){}
	
	public Employment(Long id, String position) {
		super();
		this.id = id;
		this.position = position;
	}
	
	public Employment(EmploymentEntity employmentEntity) {
		try {
			BeanUtils.copyProperties(this, employmentEntity);			
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}

	public Long getApplication_id() {
		return application_id;
	}

	public void setApplication_id(Long application_id) {
		this.application_id = application_id;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getEmployer() {
		return employer;
	}

	public void setEmployer(String employer) {
		this.employer = employer;
	}

	public Long getHours() {
		return hours;
	}

	public void setHours(Long hours) {
		this.hours = hours;
	}

	public Date getDate_from() {
		return date_from;
	}

	public void setDate_from(Date date_from) {
		this.date_from = date_from;
	}

	public Date getDate_to() {
		return date_to;
	}

	public void setDate_to(Date date_to) {
		this.date_to = date_to;
	}

}
