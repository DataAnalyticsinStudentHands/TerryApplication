package dash.pojo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.beanutils.BeanUtils;

import dash.dao.ChildEntity;
import dash.security.IAclObject;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Child implements  Serializable, IAclObject{

	@XmlElement(name = "id")
	private Long id;
	
	@XmlElement(name = "application_id")
	private Long application_id;

	@XmlElement(name = "name")
	private String name;
	
	@XmlElement(name = "age")
	private Long age;
	
	@XmlElement(name = "relationship")
	private String relationship;
	
	@XmlElement(name = "school")
	private String school;
	
	@XmlElement(name = "year")
	private String year;
	
	@XmlElement(name = "self_supporting")
	private Boolean self_supporting;
	
	public Long getId() {
		return id;
	}	
	
	public Child(){}
	
	public Child(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	public Child(ChildEntity childEntity) {
		try {
			BeanUtils.copyProperties(this, childEntity);			
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}

	public String getRelationship() {
		return relationship;
	}

	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Boolean getSelf_supporting() {
		return self_supporting;
	}

	public void setSelf_supporting(Boolean self_supporting) {
		this.self_supporting = self_supporting;
	}
}
