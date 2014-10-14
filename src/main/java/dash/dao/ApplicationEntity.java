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

import dash.pojo.Application;

/**
 * Application entity
 * 
 * @author plindner
 *
 */
@Entity
@Table(name = "applications")
public class ApplicationEntity implements Serializable {

	/** id of the object */
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Long id;

	/** path to stored documents for this object */
	@Column(name = "document_folder")
	private String document_folder;

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
	private String citizen;

	@Column(name = "permanent_resident")
	private String permanent_resident;

	@Column(name = "texas_resident")
	private String texas_resident;

	@Column(name = "permanent_resident_card")
	private String permanent_resident_card;

	@Column(name = "birthplace")
	private String birthplace;

	@Column(name = "ethnic_background")
	private String ethnic_background;

	@Column(name = "anticipated_major")
	private String anticipated_major;

	@Column(name = "highschool_name")
	private String highschool_name;

	@Column(name = "highschool_city")
	private String highschool_city;

	@Column(name = "highschool_councelor")
	private String highschool_councelor;

	@Column(name = "highschool_phone")
	private String highschool_phone;

	@Column(name = "highschool_councelor_email")
	private String highschool_councelor_email;

	@Column(name = "highschool_gpa")
	private Float highschool_gpa;

	@Column(name = "highschool_scale")
	private Float highschool_scale;

	@Column(name = "highschool_graduation_date")
	private Date highschool_graduation_date;

	@Column(name = "highschool_rank")
	private Integer highschool_rank;

	@Column(name = "highschool_rank_out")
	private Integer highschool_rank_out;

	@Column(name = "highschool_rank_tied")
	private Integer highschool_rank_tied;

	@Column(name = "psat_verbal")
	private Float psat_verbal;

	@Column(name = "psat_math")
	private Float psat_math;

	@Column(name = "psat_writing")
	private Float psat_writing;

	@Column(name = "psat_selection")
	private Float psat_selection;

	@Column(name = "psat_date")
	private Date psat_date;

	@Column(name = "sat_reading")
	private Float sat_reading;

	@Column(name = "sat_math")
	private Float sat_math;

	@Column(name = "sat_writing")
	private Float sat_writing;

	@Column(name = "sat_composite")
	private Float sat_composite;

	@Column(name = "sat_date")
	private Date sat_date;

	@Column(name = "act_composite")
	private Float act_composite;

	@Column(name = "act_date")
	private Date act_date;

	@Column(name = "national_merit")
	private String national_merit;

	@Column(name = "national_merit_date")
	private Date national_merit_date;

	@Column(name = "national_achievement")
	private String national_achievement;

	@Column(name = "national_achievement_date")
	private Date national_achievement_date;

	@Column(name = "national_hispanic")
	private String national_hispanic;

	@Column(name = "national_hispanic_date")
	private Date national_hispanic_date;

	@Column(name = "first_graduate")
	private String first_graduate;

	@Column(name = "why_apply")
	private String why_apply;

	@Column(name = "why_major")
	private String why_major;

	@Column(name = "educational_plans")
	private String educational_plans;

	@Column(name = "life_goals")
	private String life_goals;

	@Column(name = "marital_status")
	private String marital_status;

	@Column(name = "marital_status_parents")
	private String marital_status_parents;

	@Column(name = "total_annual_income")
	private Integer total_annual_income;

	@Column(name = "present_partner")
	private String present_partner;

	@Column(name = "father_occupation")
	private String father_occupation;

	@Column(name = "stepparent_occupation")
	private String stepparent_occupation;

	@Column(name = "father_employer")
	private String father_employer;

	@Column(name = "stepparent_employer")
	private String stepparent_employer;

	@Column(name = "father_total_income")
	private Integer father_total_income;

	@Column(name = "stepparent_total_income")
	private Integer stepparent_total_income;

	@Column(name = "father_age")
	private Integer father_age;

	@Column(name = "stepparent_age")
	private Integer stepparent_age;

	@Column(name = "father_level_education")
	private String father_level_education;

	@Column(name = "stepparent_level_education")
	private String stepparent_level_education;

	@Column(name = "mother_occupation")
	private String mother_occupation;

	@Column(name = "guardian_occupation")
	private String guardian_occupation;

	@Column(name = "mother_employer")
	private String mother_employer;

	@Column(name = "guardian_employer")
	private String guardian_employer;

	@Column(name = "mother_total_income")
	private Integer mother_total_income;

	@Column(name = "guardian_total_income")
	private Integer guardian_total_income;

	@Column(name = "mother_age")
	private Integer mother_age;

	@Column(name = "guardian_age")
	private Integer guardian_age;

	@Column(name = "mother_level_education")
	private String mother_level_education;

	@Column(name = "guardian_level_education")
	private String guardian_level_education;

	@Column(name = "income_same")
	private String income_same;

	@Column(name = "increased")
	private Integer increased;

	@Column(name = "decreased")
	private Integer decreased;

	@Column(name = "family_attending_college")
	private Integer family_attending_college;

	@Column(name = "financial_assistance")
	private String financial_assistance;

	@Column(name = "assistance_type")
	private String assistance_type;

	@Column(name = "assistance_amount")
	private Integer assistance_amount;

	@Column(name = "funds_saved_you")
	private Integer funds_saved_you;

	@Column(name = "funds_saved_others")
	private Integer funds_saved_others;

	@Column(name = "total_savings")
	private Integer total_savings;

	@Column(name = "total_investments")
	private Integer total_investments;

	@Column(name = "net_value")
	private Integer net_value;

	@Column(name = "adjusted_cross_income")
	private Integer adjusted_cross_income;

	@Column(name = "projected_support")
	private Integer projected_support;

	@Column(name = "description_special_circumstances")
	private String description_special_circumstances;

	@Column(name = "texas_tomorrow_fund")
	private String texas_tomorrow_fund;

	@Column(name = "texas_tomorrow_fund_value")
	private String texas_tomorrow_fund_value;

	@Column(name = "sibling_terry")
	private String sibling_terry;

	@Column(name = "department_scholarship")
	private String department_scholarship;

	@Column(name = "status")
	private String status;

	@Column(name = "app_uh_method")
	private String app_uh_method;

	@Column(name = "app_uh_date_sub")
	private Date app_uh_date_sub;

	@Column(name = "app_uh_date_int_sub")
	private Date app_uh_date_int_sub;

	@Column(name = "transcript_method")
	private String transcript_method;

	@Column(name = "transcript_date_sub")
	private Date transcript_date_sub;

	@Column(name = "transcript_date_int_sub")
	private Date transcript_date_int_sub;

	@Column(name = "fafsa_method")
	private String fafsa_method;

	@Column(name = "fafsa_date_sub")
	private Date fafsa_date_sub;

	@Column(name = "fafsa_date_int_sub")
	private Date fafsa_date_int_sub;

	@Column(name = "housing_method")
	private String housing_method;

	@Column(name = "housing_date_sub")
	private Date housing_date_sub;

	@Column(name = "housing_date_int_sub")
	private Date housing_date_int_sub;

	public ApplicationEntity() {
	}

	public ApplicationEntity(String document_folder, Date creation_timestamp) {

		this.document_folder = document_folder;
		this.creation_timestamp = creation_timestamp;
	}

	public ApplicationEntity(Application application) {
		try {
			BeanUtils.copyProperties(this, application);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDocument_folder() {
		return document_folder;
	}

	public void setDocument_folder(String document_folder) {
		this.document_folder = document_folder;
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

	public String getCitizen() {
		return citizen;
	}

	public void setCitizen(String citizen) {
		this.citizen = citizen;
	}

	public String getPermanent_resident() {
		return permanent_resident;
	}

	public void setPermanent_resident(String permanent_resident) {
		this.permanent_resident = permanent_resident;
	}

	public String getTexas_resident() {
		return texas_resident;
	}

	public void setTexas_resident(String texas_resident) {
		this.texas_resident = texas_resident;
	}

	public String getPermanent_resident_card() {
		return permanent_resident_card;
	}

	public void setPermanent_resident_card(String permanent_resident_card) {
		this.permanent_resident_card = permanent_resident_card;
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

	public String getAnticipated_major() {
		return anticipated_major;
	}

	public void setAnticipated_major(String anticipated_major) {
		this.anticipated_major = anticipated_major;
	}

	public String getHighschool_name() {
		return highschool_name;
	}

	public void setHighschool_name(String highschool_name) {
		this.highschool_name = highschool_name;
	}

	public String getHighschool_city() {
		return highschool_city;
	}

	public void setHighschool_city(String highschool_city) {
		this.highschool_city = highschool_city;
	}

	public String getHighschool_councelor() {
		return highschool_councelor;
	}

	public void setHighschool_councelor(String highschool_councelor) {
		this.highschool_councelor = highschool_councelor;
	}

	public String getHighschool_phone() {
		return highschool_phone;
	}

	public void setHighschool_phone(String highschool_phone) {
		this.highschool_phone = highschool_phone;
	}

	public String getHighschool_councelor_email() {
		return highschool_councelor_email;
	}

	public void setHighschool_councelor_email(String highschool_councelor_email) {
		this.highschool_councelor_email = highschool_councelor_email;
	}

	public Float getHighschool_gpa() {
		return highschool_gpa;
	}

	public void setHighschool_gpa(Float highschool_gpa) {
		this.highschool_gpa = highschool_gpa;
	}

	public Float getHighschool_scale() {
		return highschool_scale;
	}

	public void setHighschool_scale(Float highschool_scale) {
		this.highschool_scale = highschool_scale;
	}

	public Date getHighschool_graduation_date() {
		return highschool_graduation_date;
	}

	public void setHighschool_graduation_date(Date highschool_graduation_date) {
		this.highschool_graduation_date = highschool_graduation_date;
	}

	public Integer getHighschool_rank() {
		return highschool_rank;
	}

	public void setHighschool_rank(Integer highschool_rank) {
		this.highschool_rank = highschool_rank;
	}

	public Integer getHighschool_rank_out() {
		return highschool_rank_out;
	}

	public void setHighschool_rank_out(Integer highschool_rank_out) {
		this.highschool_rank_out = highschool_rank_out;
	}

	public Integer getHighschool_rank_tied() {
		return highschool_rank_tied;
	}

	public void setHighschool_rank_tied(Integer highschool_rank_tied) {
		this.highschool_rank_tied = highschool_rank_tied;
	}

	public Float getPsat_verbal() {
		return psat_verbal;
	}

	public void setPsat_verbal(Float psat_verbal) {
		this.psat_verbal = psat_verbal;
	}

	public Float getPsat_math() {
		return psat_math;
	}

	public void setPsat_math(Float psat_math) {
		this.psat_math = psat_math;
	}

	public Float getPsat_writing() {
		return psat_writing;
	}

	public void setPsat_writing(Float psat_writing) {
		this.psat_writing = psat_writing;
	}

	public Float getPsat_selection() {
		return psat_selection;
	}

	public void setPsat_selection(Float psat_selection) {
		this.psat_selection = psat_selection;
	}

	public Date getPsat_date() {
		return psat_date;
	}

	public void setPsat_date(Date psat_date) {
		this.psat_date = psat_date;
	}

	public Float getSat_reading() {
		return sat_reading;
	}

	public void setSat_reading(Float sat_reading) {
		this.sat_reading = sat_reading;
	}

	public Float getSat_math() {
		return sat_math;
	}

	public void setSat_math(Float sat_math) {
		this.sat_math = sat_math;
	}

	public Float getSat_writing() {
		return sat_writing;
	}

	public void setSat_writing(Float sat_writing) {
		this.sat_writing = sat_writing;
	}

	public Float getSat_composite() {
		return sat_composite;
	}

	public void setSat_composite(Float sat_composite) {
		this.sat_composite = sat_composite;
	}

	public Date getSat_date() {
		return sat_date;
	}

	public void setSat_date(Date sat_date) {
		this.sat_date = sat_date;
	}

	public Float getAct_composite() {
		return act_composite;
	}

	public void setAct_composite(Float act_composite) {
		this.act_composite = act_composite;
	}

	public Date getAct_date() {
		return act_date;
	}

	public void setAct_date(Date act_date) {
		this.act_date = act_date;
	}

	public String getNational_merit() {
		return national_merit;
	}

	public void setNational_merit(String national_merit) {
		this.national_merit = national_merit;
	}

	public Date getNational_merit_date() {
		return national_merit_date;
	}

	public void setNational_merit_date(Date national_merit_date) {
		this.national_merit_date = national_merit_date;
	}

	public String getNational_achievement() {
		return national_achievement;
	}

	public void setNational_achievement(String national_achievement) {
		this.national_achievement = national_achievement;
	}

	public Date getNational_achievement_date() {
		return national_achievement_date;
	}

	public void setNational_achievement_date(Date national_achievement_date) {
		this.national_achievement_date = national_achievement_date;
	}

	public String getNational_hispanic() {
		return national_hispanic;
	}

	public void setNational_hispanic(String national_hispanic) {
		this.national_hispanic = national_hispanic;
	}

	public Date getNational_hispanic_date() {
		return national_hispanic_date;
	}

	public void setNational_hispanic_date(Date national_hispanic_date) {
		this.national_hispanic_date = national_hispanic_date;
	}

	public String getFirst_graduate() {
		return first_graduate;
	}

	public void setFirst_graduate(String first_graduate) {
		this.first_graduate = first_graduate;
	}

	public String getWhy_apply() {
		return why_apply;
	}

	public void setWhy_apply(String why_apply) {
		this.why_apply = why_apply;
	}

	public String getWhy_major() {
		return why_major;
	}

	public void setWhy_major(String why_major) {
		this.why_major = why_major;
	}

	public String getEducational_plans() {
		return educational_plans;
	}

	public void setEducational_plans(String educational_plans) {
		this.educational_plans = educational_plans;
	}

	public String getLife_goals() {
		return life_goals;
	}

	public void setLife_goals(String life_goals) {
		this.life_goals = life_goals;
	}

	public String getMarital_status() {
		return marital_status;
	}

	public void setMarital_status(String marital_status) {
		this.marital_status = marital_status;
	}

	public String getMarital_status_parents() {
		return marital_status_parents;
	}

	public void setMarital_status_parents(String marital_status_parents) {
		this.marital_status_parents = marital_status_parents;
	}

	public Integer getTotal_annual_income() {
		return total_annual_income;
	}

	public void setTotal_annual_income(Integer total_annual_income) {
		this.total_annual_income = total_annual_income;
	}

	public String getPresent_partner() {
		return present_partner;
	}

	public void setPresent_partner(String present_partner) {
		this.present_partner = present_partner;
	}

	public String getFather_occupation() {
		return father_occupation;
	}

	public void setFather_occupation(String father_occupation) {
		this.father_occupation = father_occupation;
	}

	public String getStepparent_occupation() {
		return stepparent_occupation;
	}

	public void setStepparent_occupation(String stepparent_occupation) {
		this.stepparent_occupation = stepparent_occupation;
	}

	public String getFather_employer() {
		return father_employer;
	}

	public void setFather_employer(String father_employer) {
		this.father_employer = father_employer;
	}

	public String getStepparent_employer() {
		return stepparent_employer;
	}

	public void setStepparent_employer(String stepparent_employer) {
		this.stepparent_employer = stepparent_employer;
	}

	public Integer getFather_total_income() {
		return father_total_income;
	}

	public void setFather_total_income(Integer father_total_income) {
		this.father_total_income = father_total_income;
	}

	public Integer getStepparent_total_income() {
		return stepparent_total_income;
	}

	public void setStepparent_total_income(Integer stepparent_total_income) {
		this.stepparent_total_income = stepparent_total_income;
	}

	public Integer getFather_age() {
		return father_age;
	}

	public void setFather_age(Integer father_age) {
		this.father_age = father_age;
	}

	public Integer getStepparent_age() {
		return stepparent_age;
	}

	public void setStepparent_age(Integer stepparent_age) {
		this.stepparent_age = stepparent_age;
	}

	public String getFather_level_education() {
		return father_level_education;
	}

	public void setFather_level_education(String father_level_education) {
		this.father_level_education = father_level_education;
	}

	public String getStepparent_level_education() {
		return stepparent_level_education;
	}

	public void setStepparent_level_education(String stepparent_level_education) {
		this.stepparent_level_education = stepparent_level_education;
	}

	public String getMother_occupation() {
		return mother_occupation;
	}

	public void setMother_occupation(String mother_occupation) {
		this.mother_occupation = mother_occupation;
	}

	public String getGuardian_occupation() {
		return guardian_occupation;
	}

	public void setGuardian_occupation(String guardian_occupation) {
		this.guardian_occupation = guardian_occupation;
	}

	public String getMother_employer() {
		return mother_employer;
	}

	public void setMother_employer(String mother_employer) {
		this.mother_employer = mother_employer;
	}

	public String getGuardian_employer() {
		return guardian_employer;
	}

	public void setGuardian_employer(String guardian_employer) {
		this.guardian_employer = guardian_employer;
	}

	public Integer getMother_total_income() {
		return mother_total_income;
	}

	public void setMother_total_income(Integer mother_total_income) {
		this.mother_total_income = mother_total_income;
	}

	public Integer getGuardian_total_income() {
		return guardian_total_income;
	}

	public void setGuardian_total_income(Integer guardian_total_income) {
		this.guardian_total_income = guardian_total_income;
	}

	public Integer getMother_age() {
		return mother_age;
	}

	public void setMother_age(Integer mother_age) {
		this.mother_age = mother_age;
	}

	public Integer getGuardian_age() {
		return guardian_age;
	}

	public void setGuardian_age(Integer guardian_age) {
		this.guardian_age = guardian_age;
	}

	public String getMother_level_education() {
		return mother_level_education;
	}

	public void setMother_level_education(String mother_level_education) {
		this.mother_level_education = mother_level_education;
	}

	public String getGuardian_level_education() {
		return guardian_level_education;
	}

	public void setGuardian_level_education(String guardian_level_education) {
		this.guardian_level_education = guardian_level_education;
	}

	public String getIncome_same() {
		return income_same;
	}

	public void setIncome_same(String income_same) {
		this.income_same = income_same;
	}

	public Integer getIncreased() {
		return increased;
	}

	public void setIncreased(Integer increased) {
		this.increased = increased;
	}

	public Integer getDecreased() {
		return decreased;
	}

	public void setDecreased(Integer decreased) {
		this.decreased = decreased;
	}

	public Integer getFamily_attending_college() {
		return family_attending_college;
	}

	public void setFamily_attending_college(Integer family_attending_college) {
		this.family_attending_college = family_attending_college;
	}

	public String getFinancial_assistance() {
		return financial_assistance;
	}

	public void setFinancial_assistance(String financial_assistance) {
		this.financial_assistance = financial_assistance;
	}

	public String getAssistance_type() {
		return assistance_type;
	}

	public void setAssistance_type(String assistance_type) {
		this.assistance_type = assistance_type;
	}

	public Integer getAssistance_amount() {
		return assistance_amount;
	}

	public void setAssistance_amount(Integer assistance_amount) {
		this.assistance_amount = assistance_amount;
	}

	public Integer getFunds_saved_you() {
		return funds_saved_you;
	}

	public void setFunds_saved_you(Integer funds_saved_you) {
		this.funds_saved_you = funds_saved_you;
	}

	public Integer getFunds_saved_others() {
		return funds_saved_others;
	}

	public void setFunds_saved_others(Integer funds_saved_others) {
		this.funds_saved_others = funds_saved_others;
	}

	public Integer getTotal_savings() {
		return total_savings;
	}

	public void setTotal_savings(Integer total_savings) {
		this.total_savings = total_savings;
	}

	public Integer getTotal_investments() {
		return total_investments;
	}

	public void setTotal_investments(Integer total_investments) {
		this.total_investments = total_investments;
	}

	public Integer getNet_value() {
		return net_value;
	}

	public void setNet_value(Integer net_value) {
		this.net_value = net_value;
	}

	public Integer getAdjusted_cross_income() {
		return adjusted_cross_income;
	}

	public void setAdjusted_cross_income(Integer adjusted_cross_income) {
		this.adjusted_cross_income = adjusted_cross_income;
	}

	public Integer getProjected_support() {
		return projected_support;
	}

	public void setProjected_support(Integer projected_support) {
		this.projected_support = projected_support;
	}

	public String getDescription_special_circumstances() {
		return description_special_circumstances;
	}

	public void setDescription_special_circumstances(
			String description_special_circumstances) {
		this.description_special_circumstances = description_special_circumstances;
	}

	public String getTexas_tomorrow_fund() {
		return texas_tomorrow_fund;
	}

	public void setTexas_tomorrow_fund(String texas_tomorrow_fund) {
		this.texas_tomorrow_fund = texas_tomorrow_fund;
	}

	public String getTexas_tomorrow_fund_value() {
		return texas_tomorrow_fund_value;
	}

	public void setTexas_tomorrow_fund_value(String texas_tomorrow_fund_value) {
		this.texas_tomorrow_fund_value = texas_tomorrow_fund_value;
	}

	public String getSibling_terry() {
		return sibling_terry;
	}

	public void setSibling_terry(String sibling_terry) {
		this.sibling_terry = sibling_terry;
	}

	public String getDepartment_scholarship() {
		return department_scholarship;
	}

	public void setDepartment_scholarship(String department_scholarship) {
		this.department_scholarship = department_scholarship;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApp_uh_method() {
		return app_uh_method;
	}

	public void setApp_uh_method(String app_uh_method) {
		this.app_uh_method = app_uh_method;
	}

	public Date getApp_uh_date_sub() {
		return app_uh_date_sub;
	}

	public void setApp_uh_date_sub(Date app_uh_date_sub) {
		this.app_uh_date_sub = app_uh_date_sub;
	}

	public Date getApp_uh_date_int_sub() {
		return app_uh_date_int_sub;
	}

	public void setApp_uh_date_int_sub(Date app_uh_date_int_sub) {
		this.app_uh_date_int_sub = app_uh_date_int_sub;
	}

	public String getTranscript_method() {
		return transcript_method;
	}

	public void setTranscript_method(String transcript_method) {
		this.transcript_method = transcript_method;
	}

	public Date getTranscript_date_sub() {
		return transcript_date_sub;
	}

	public void setTranscript_date_sub(Date transcript_date_sub) {
		this.transcript_date_sub = transcript_date_sub;
	}

	public Date getTranscript_date_int_sub() {
		return transcript_date_int_sub;
	}

	public void setTranscript_date_int_sub(Date transcript_date_int_sub) {
		this.transcript_date_int_sub = transcript_date_int_sub;
	}

	public String getFafsa_method() {
		return fafsa_method;
	}

	public void setFafsa_method(String fafsa_method) {
		this.fafsa_method = fafsa_method;
	}

	public Date getFafsa_date_sub() {
		return fafsa_date_sub;
	}

	public void setFafsa_date_sub(Date fafsa_date_sub) {
		this.fafsa_date_sub = fafsa_date_sub;
	}

	public Date getFafsa_date_int_sub() {
		return fafsa_date_int_sub;
	}

	public void setFafsa_date_int_sub(Date fafsa_date_int_sub) {
		this.fafsa_date_int_sub = fafsa_date_int_sub;
	}

	public String getHousing_method() {
		return housing_method;
	}

	public void setHousing_method(String housing_method) {
		this.housing_method = housing_method;
	}

	public Date getHousing_date_sub() {
		return housing_date_sub;
	}

	public void setHousing_date_sub(Date housing_date_sub) {
		this.housing_date_sub = housing_date_sub;
	}

	public Date getHousing_date_int_sub() {
		return housing_date_int_sub;
	}

	public void setHousing_date_int_sub(Date housing_date_int_sub) {
		this.housing_date_int_sub = housing_date_int_sub;
	}
}
