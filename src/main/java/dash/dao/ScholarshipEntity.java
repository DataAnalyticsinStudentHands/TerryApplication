package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.apache.commons.beanutils.BeanUtils;

import dash.pojo.Scholarship;

/**
 * Scholarship entity
 * @author plindner
 *
 */
@Entity
@Table(name="scholarship")
public class ScholarshipEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	@Column(name = "application_id")
	private Long application_id;
	
	@Column(name = "applied_received")
	private Boolean applied_received;

	@Column(name = "name")
	private String name;
	
	@Column(name = "duration")
	private String duration;
	
	@Column(name = "amount")
	private String amount;
	
	public ScholarshipEntity(){}

	public ScholarshipEntity(String name) {
		this.name = name;
	}

	public ScholarshipEntity(Scholarship scholarship) {
		try {
			BeanUtils.copyProperties(this, scholarship);
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
