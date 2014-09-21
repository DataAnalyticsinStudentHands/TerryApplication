package dash.dao;

import java.util.List;

import dash.pojo.Scholarship;

/**
 *
 *
 * @see <a
 *      href="http://www.codingpedia.org/ama/spring-mybatis-integration-example/">http://www.codingpedia.org/ama/spring-mybatis-integration-example/</a>
 */
public interface ScholarshipDao {

	public List<ScholarshipEntity> getScholarship(String orderByInsertionDate);

	/**
	 * Returns a scholarship given its id
	 *
	 * @param id
	 * @return
	 */
	public ScholarshipEntity getScholarshipById(Long id);
	
	public void deleteScholarship(Scholarship scholarship);

	public Long createScholarship(ScholarshipEntity scholarship);

	public void updateScholarship(ScholarshipEntity scholarship);

	/** removes all scholarship */
	public void deleteScholarships();	

}
