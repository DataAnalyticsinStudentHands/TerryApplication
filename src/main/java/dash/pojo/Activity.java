package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.ActivityEntity;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Activity implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "activity")
	private String activity;

	@XmlElement(name = "position")
	private String position;
	
	@XmlElement(name = "description")
	private String description;
	
	@XmlElement(name = "year")
	private String year;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	public Long getId() {
		return id;
	}	
	
	public Activity(){}
	
	public Activity(Long id, String activity) {
		super();
		this.id = id;
		this.activity = activity;
	}
	
	public Activity(ActivityEntity activityEntity) {
		try {
			BeanUtils.copyProperties(this, activityEntity);			
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getActivity() {
		return activity;
	}

	public void setActivity(String activity) {
		this.activity = activity;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
	
	public Long getApplication_id() {
		return application_id;
	}

	public void setApplication_id(Long application_id) {
		this.application_id = application_id;
	}

}
