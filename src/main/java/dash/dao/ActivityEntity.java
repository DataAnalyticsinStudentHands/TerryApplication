package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.beanutils.BeanUtils;

import dash.pojo.Activity;

/**
 * Activity entity
 * @author plindner
 *
 */
@Entity
@Table(name="activity")
public class ActivityEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name = "activity")
	private String activity;

	@Column(name = "position")
	private String position;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "year")
	private String year;
	
	@Column(name = "application_id")
	private Long application_id;
	
	public ActivityEntity(){}

	public ActivityEntity(String activity) {
		this.activity = activity;
	}

	public ActivityEntity(Activity activity) {
		try {
			BeanUtils.copyProperties(this, activity);
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
