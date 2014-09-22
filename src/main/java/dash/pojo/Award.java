package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.AwardEntity;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Award implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "application_id")
	private Long application_id;
	
	@XmlElement(name = "award")
	private String award;

	@XmlElement(name = "description")
	private String description;
	
	@XmlElement(name = "level")
	private String level;
	
	@XmlElement(name = "year")
	private String year;
	
	public Long getId() {
		return id;
	}	
	
	public Award(){}
	
	public Award(Long id, String description) {
		super();
		this.id = id;
		this.description = description;
	}
	
	public Award(AwardEntity awardEntity) {
		try {
			BeanUtils.copyProperties(this, awardEntity);			
		} catch ( IllegalAccessException e) {

			e.printStackTrace();
		} catch ( InvocationTargetException e) {

			e.printStackTrace();
		}
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

	public String getAward() {
		return award;
	}

	public void setAward(String award) {
		this.award = award;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

}
