package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.beanutils.BeanUtils;

import dash.pojo.Coursework;

/**
 * Coursework entity
 * @author plindner
 *
 */
@Entity
@Table(name="coursework")
public class CourseworkEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name = "level")
	private String level;
	
	/** description of the object */
	@Column(name = "name")
	private String name;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "credit_hours")
	private Long credit_hours;
	
	@Column(name = "final_grade")
	private String final_grade;
	
	@Column(name = "application_id")
	private Long application_id;
	
	public CourseworkEntity(){}

	public CourseworkEntity(String name) {
		this.name = name;
	}

	public CourseworkEntity(Coursework coursework) {
		try {
			BeanUtils.copyProperties(this, coursework);
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getCredit_hours() {
		return credit_hours;
	}

	public void setCredit_hours(Long credit_hours) {
		this.credit_hours = credit_hours;
	}

	public String getFinal_grade() {
		return final_grade;
	}

	public void setFinal_grade(String final_grade) {
		this.final_grade = final_grade;
	}

	public Long getApplication_id() {
		return application_id;
	}

	public void setApplication_id(Long application_id) {
		this.application_id = application_id;
	}
}
