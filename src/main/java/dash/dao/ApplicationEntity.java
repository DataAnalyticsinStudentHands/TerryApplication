package dash.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlElement;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.BeanUtilsBean;

import dash.helpers.NullAwareBeanUtilsBean;
import dash.pojo.Application;

/**
 * Application entity
 * @author plindner
 *
 */
@Entity
@Table(name="applications")
public class ApplicationEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name="id")
	private Long id;
	
	/** path to stored documents for this object */
	@Column(name = "document_folder")
	private String document_folder;

	/** description of the object */
	@Column(name = "name")
	private String name;

	/** insertion date in the database */
	@Column(name = "creation_timestamp")
	private Date creation_timestamp;
	
	@Column(name = "uh_id")
	private Long uh_id;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;
	
	@Column(name = "middle_name")
	private String middle_name;
	
	@Column(name = "preferred_name")
	private String preferred_name;
	
	@Column(name = "ssn")
	private String ssn;
	
	@Column(name = "permanent_address")
	private String permanent_address;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "state")
	private String state;
	
	@Column(name = "dob")
	private Date dob;
	
	@Column(name = "zip_code")
	private Long zip_code;
	
	@Column(name = "county")
	private String county;
	
	@Column(name = "home_phone")
	private String home_phone;
	
	@Column(name = "alt_cell_phone")
	private String alt_cell_phone;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "citizen")
	private Boolean citizen;
	
	@Column(name = "permanent_resident")
	private Boolean permanent_resident;
	
	@Column(name = "texas_resident")
	private String texas_resident;
	
	@Column(name = "permenent_resident_card")
	private String permenent_resident_card;
	
	@Column(name = "birthplace")
	private String birthplace;
	
	@Column(name = "ethnic_background")
	private String ethnic_background;
	
	@Column(name = "anticapted_major")
	private String anticapted_major;

	public ApplicationEntity(){}

	public ApplicationEntity(String document_folder, String name, Date creation_timestamp, Long uh_id, String first_name, String last_name,
			String middle_name, String preferred_name, String ssn, String permanent_address, String city, String state, Date dob,
			Long zip_code, String county, String home_phone, String alt_cell_phone, String gender, String email, Boolean citizen,
			Boolean permanent_resident, String texas_resident, String permenent_resident_card, String birthplace, String ethnic_background,
			String anticapted_major) {
	
		this.document_folder = document_folder;
		this.name = name;
		this.creation_timestamp = creation_timestamp;
		this.uh_id = uh_id;		
		this.first_name = first_name;		
		this.last_name = last_name;		
		this.middle_name = middle_name;		
		this.preferred_name = preferred_name;		
		this.ssn = ssn;		
		this.permanent_address = permanent_address;		
		this.city = city;		
		this.state = state;		
		this.dob = dob;		
		this.zip_code  = zip_code;		
		this.county  = county;		
		this.home_phone = home_phone;		
		this.alt_cell_phone = alt_cell_phone;		
		this.gender = gender;		
		this.email  = email;		
		this.citizen  = citizen;		
		this.permanent_resident = permanent_resident;		
		this.texas_resident = texas_resident;		
		this.permenent_resident_card = permenent_resident_card;		
		this.birthplace = birthplace;		
		this.ethnic_background = ethnic_background;		
		this.anticapted_major = anticapted_major;
	
	}

	public ApplicationEntity(Application application) {
		
		
		try {
			BeanUtils.copyProperties(this, application);
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

	public String getDocument_folder() {
		return document_folder;
	}

	public void setDocument_folder(String document_folder) {
		this.document_folder = document_folder;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreation_timestamp() {
		return creation_timestamp;
	}

	public void setCreation_timestamp(Date creation_timestamp) {
		this.creation_timestamp = creation_timestamp;
	}

	public Long getUh_id() {
		return uh_id;
	}

	public void setUh_id(Long uh_id) {
		this.uh_id = uh_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getMiddle_name() {
		return middle_name;
	}

	public void setMiddle_name(String middle_name) {
		this.middle_name = middle_name;
	}

	public String getPreferred_name() {
		return preferred_name;
	}

	public void setPreferred_name(String preferred_name) {
		this.preferred_name = preferred_name;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getPermanent_address() {
		return permanent_address;
	}

	public void setPermanent_address(String permanent_address) {
		this.permanent_address = permanent_address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Long getZip_code() {
		return zip_code;
	}

	public void setZip_code(Long zip_code) {
		this.zip_code = zip_code;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getHome_phone() {
		return home_phone;
	}

	public void setHome_phone(String home_phone) {
		this.home_phone = home_phone;
	}

	public String getAlt_cell_phone() {
		return alt_cell_phone;
	}

	public void setAlt_cell_phone(String alt_cell_phone) {
		this.alt_cell_phone = alt_cell_phone;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getCitizen() {
		return citizen;
	}

	public void setCitizen(Boolean citizen) {
		this.citizen = citizen;
	}

	public Boolean getPermanent_resident() {
		return permanent_resident;
	}

	public void setPermanent_resident(Boolean permanent_resident) {
		this.permanent_resident = permanent_resident;
	}

	public String getTexas_resident() {
		return texas_resident;
	}

	public void setTexas_resident(String texas_resident) {
		this.texas_resident = texas_resident;
	}

	public String getPermenent_resident_card() {
		return permenent_resident_card;
	}

	public void setPermenent_resident_card(String permenent_resident_card) {
		this.permenent_resident_card = permenent_resident_card;
	}

	public String getBirthplace() {
		return birthplace;
	}

	public void setBirthplace(String birthplace) {
		this.birthplace = birthplace;
	}

	public String getEthnic_background() {
		return ethnic_background;
	}

	public void setEthnic_background(String ethnic_background) {
		this.ethnic_background = ethnic_background;
	}

	public String getAnticapted_major() {
		return anticapted_major;
	}

	public void setAnticapted_major(String anticapted_major) {
		this.anticapted_major = anticapted_major;
	}
}
