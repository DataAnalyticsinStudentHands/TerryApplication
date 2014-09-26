package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.VolunteerEntity;
import dash.helpers.SimpleDateAdapter;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Volunteer implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	@XmlElement(name = "place")
	private String place;

	@XmlElement(name = "description")
	private String description;

	@XmlElement(name = "hours_week")
	private Long hours_week;
	
	@XmlElement(name = "hours_total")
	private Long hours_total;
	
	@XmlElement(name = "date_from")
	@XmlJavaTypeAdapter(SimpleDateAdapter.class)
	@ApplicationDetailedView
	private Date date_from;
	
	@XmlElement(name = "date_to")
	@XmlJavaTypeAdapter(SimpleDateAdapter.class)
	@ApplicationDetailedView
	private Date date_to;
	
	public Volunteer(){}
	
	public Volunteer(Long id, String place) {
		super();
		this.id = id;
		this.place = place;
	}
	
	public Volunteer(VolunteerEntity volunteerEntity) {
		try {
			BeanUtils.copyProperties(this, volunteerEntity);			
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

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getHours_week() {
		return hours_week;
	}

	public void setHours_week(Long hours_week) {
		this.hours_week = hours_week;
	}

	public Long getHours_total() {
		return hours_total;
	}

	public void setHours_total(Long hours_total) {
		this.hours_total = hours_total;
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
