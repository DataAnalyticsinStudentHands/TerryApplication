package dash.dao;

import java.util.List;

import dash.pojo.Employment;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface EmploymentDao {

	public List<EmploymentEntity> getEmployment(String orderByInsertionDate);

	/**
	 * Returns a employment given its id
	 *
	 * @param id
	 * @return
	 */
	public EmploymentEntity getEmploymentById(Long id);
	
	public void deleteEmployment(Employment employment);

	public Long createEmployment(EmploymentEntity employment);

	public void updateEmployment(EmploymentEntity employment);

	/** removes all employment */
	public void deleteEmployments();	

}
