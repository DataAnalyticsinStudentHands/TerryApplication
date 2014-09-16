package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.CourseworkEntity;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Coursework implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "level")
	private String level;

	@XmlElement(name = "name")
	private String name;
	
	@XmlElement(name = "type")
	private String type;
	
	@XmlElement(name = "credit_hours")
	private Long credit_hours;
	
	@XmlElement(name = "final_grade")
	private String final_grade;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	
	public Long getId() {
		return id;
	}	
	
	public Coursework(){}
	
	public Coursework(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Coursework(CourseworkEntity courseworkEntity) {
		try {
			BeanUtils.copyProperties(this, courseworkEntity);			
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
	}

	public void setId(Long id) {
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
