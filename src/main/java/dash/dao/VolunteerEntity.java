package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.beanutils.BeanUtils;

import dash.pojo.Volunteer;

/**
 * Volunteer entity
 * @author plindner
 *
 */
@Entity
@Table(name="volunteer")
public class VolunteerEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name = "application_id")
	private Long application_id;
	
	@Column(name = "place")
	private String place;

	@Column(name = "description")
	private String description;

	@Column(name = "hours_week")
	private Long hours_week;
	
	@Column(name = "hours_total")
	private Long hours_total;
	
	@Column(name = "date_from")
	private Date date_from;
	
	@Column(name = "date_to")
	private Date date_to;
	
	public VolunteerEntity(){}

	public VolunteerEntity(String place) {
		this.place = place;
	}

	public VolunteerEntity(Volunteer volunteer) {
		try {
			BeanUtils.copyProperties(this, volunteer);
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
